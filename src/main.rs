use std::sync::Arc;
use axum::extract::State;
use axum::{Json, Router};
use axum::body::Body;
use axum::http::{header, Method, StatusCode};
use axum::response::{IntoResponse, Response};
use axum::routing::post;
use reqwest::Client;
use serde::Deserialize;
use shuttle_runtime::SecretStore;
use tower_http::cors::CorsLayer; // ADDED: For CORS
use tracing::{info, instrument, warn};
use wp_mini_epub::{download_story_to_memory, login, AppError};

// --- (Structs and constants remain the same) ---
const CONCURRENT_CHAPTER_REQUESTS: usize = 10;

#[derive(Clone)]
struct AppState {
    anon_client: Arc<Client>,
}

#[derive(Deserialize)]
#[serde(rename_all = "camelCase")]
struct GenerateEpubRequest {
    story_id: u64,
    is_embed_images: bool,
    username: Option<String>,
    password: Option<String>,
}

struct MyError(AppError);

// --- (main function is completely refactored) ---
#[shuttle_runtime::main]
async fn main(
    #[shuttle_runtime::Secrets] secret_store: SecretStore,
) -> shuttle_axum::ShuttleAxum {

    // Get the frontend origin from secrets for CORS
    let frontend_origin = secret_store
        .get("FRONTEND_ORIGIN")
        .expect("FRONTEND_ORIGIN must be set");

    // Set up a CORS layer to allow requests only from your frontend
    let cors = CorsLayer::new()
        .allow_origin(frontend_origin.parse::<axum::http::HeaderValue>().unwrap())
        .allow_methods([Method::POST]) // Only allow POST for this endpoint
        .allow_headers([header::CONTENT_TYPE]);

    const APP_USER_AGENT: &str = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/139.0.0.0 Safari/537.36";

    let shared_client = Arc::new(
        Client::builder()
            .user_agent(APP_USER_AGENT)
            .cookie_store(true)
            .build()
            .expect("Failed to create reqwest client")
    );

    let app_state = AppState {
        anon_client: shared_client,
    };

    // The router definition is the same, but we add the CORS layer
    let app = Router::new()
        .route("/generate-epub", post(generate_epub))
        .with_state(app_state)
        .layer(cors); // ADDED: Apply the CORS middleware

    // Return the router to Shuttle
    Ok(app.into())
}


// handlers, error mapping, and IntoResponse implementation
fn map_anyhow_error(e: anyhow::Error) -> AppError {
    // ... (this function is unchanged)
    if let Some(app_error) = e.downcast_ref::<AppError>() {
        return match app_error {
            AppError::AuthenticationFailed => AppError::AuthenticationFailed,
            AppError::NotLoggedIn => AppError::NotLoggedIn,
            AppError::LogoutFailed => AppError::LogoutFailed,
            AppError::StoryNotFound(id) => AppError::StoryNotFound(*id),
            AppError::MetadataFetchFailed => AppError::MetadataFetchFailed,
            AppError::DownloadFailed => AppError::DownloadFailed,
            AppError::ChapterProcessingFailed => AppError::ChapterProcessingFailed,
            AppError::EpubGenerationFailed => AppError::EpubGenerationFailed,
            AppError::IoError(_) => AppError::DownloadFailed,
        };
    }
    warn!("Unhandled error type: {:?}", e);
    AppError::DownloadFailed
}

#[instrument(skip(state, payload), fields(story_id = payload.story_id))]
async fn generate_epub(
    State(state): State<AppState>,
    Json(payload): Json<GenerateEpubRequest>,
) -> Result<Response, MyError> {
    // ... (this function is unchanged)
    let epub_bytes_result = match (payload.username, payload.password) {
        (Some(user), Some(pass)) => {
            info!("Handling authenticated request");

            let auth_client = state.anon_client.clone();

            login(&auth_client, &user, &pass).await?;
            download_story_to_memory(
                &auth_client,
                payload.story_id,
                payload.is_embed_images,
                CONCURRENT_CHAPTER_REQUESTS,
            ).await
        },
        _ => {
            info!("Handling anonymous request");
            download_story_to_memory(
                &state.anon_client,
                payload.story_id,
                payload.is_embed_images,
                CONCURRENT_CHAPTER_REQUESTS,
            ).await
        }
    };

    let epub_bytes = epub_bytes_result.map_err(map_anyhow_error)?;

    let filename = format!("story_{}.epub", payload.story_id);

    match Response::builder()
        .status(StatusCode::OK)
        .header(header::CONTENT_TYPE, "application/epub+zip")
        .header(header::CONTENT_DISPOSITION, format!("attachment; filename=\"{}\"", filename))
        .header(header::CONTENT_LENGTH, epub_bytes.len())
        .body(Body::from(epub_bytes))
    {
        Ok(response) => Ok(response),
        Err(_) => Err(MyError(AppError::EpubGenerationFailed)),
    }
}

impl From<AppError> for MyError {
    fn from(error: AppError) -> Self {
        MyError(error)
    }
}

impl IntoResponse for MyError {
    fn into_response(self) -> Response {
        // ... (this implementation is unchanged)
        let error = self.0;
        let (status, error_message) = match error {
            AppError::AuthenticationFailed => (StatusCode::UNAUTHORIZED, error.to_string()),
            AppError::NotLoggedIn => (StatusCode::UNAUTHORIZED, error.to_string()),
            AppError::LogoutFailed => (StatusCode::INTERNAL_SERVER_ERROR, error.to_string()),
            AppError::StoryNotFound(id) => (StatusCode::NOT_FOUND, format!("Story with ID {} could not be found", id)),
            AppError::MetadataFetchFailed => (StatusCode::BAD_GATEWAY, error.to_string()),
            AppError::DownloadFailed => (StatusCode::BAD_GATEWAY, error.to_string()),
            AppError::ChapterProcessingFailed => (StatusCode::INTERNAL_SERVER_ERROR, error.to_string()),
            AppError::EpubGenerationFailed => (StatusCode::INTERNAL_SERVER_ERROR, error.to_string()),
            AppError::IoError(_) => (StatusCode::INTERNAL_SERVER_ERROR, error.to_string()),
        };

        let body = Json(serde_json::json!({ "error": error_message }));
        (status, body).into_response()
    }
}