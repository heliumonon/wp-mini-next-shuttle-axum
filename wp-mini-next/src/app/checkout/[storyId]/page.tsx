import { Column, RevealFx } from "@once-ui-system/core";
import { StoryNotFound, DownloadManager } from "@/components";

// --- Data Fetching and Types (Server-Side) ---

interface StoryData {
    title: string;
    cover: string;
    mature: boolean;
}

interface StoryResult {
    exists: boolean;
    data?: StoryData;
}

async function getStoryData(storyId: string): Promise<StoryResult> {
    const apiUrl = `https://wattpad.com/api/v3/stories/${storyId}?fields=title,cover,mature`;
    console.log(`Fetching data for story: ${storyId} from ${apiUrl}`);

    try {
        const response = await fetch(apiUrl, {
            next: { revalidate: 3600 }, 
        });

        if (response.ok) {
            const data: StoryData = await response.json();
            return { exists: true, data: data };
        } else {
            console.log(`API returned an error: ${response.status}`);
            return { exists: false };
        }
    } catch (error) {
        console.error("Failed to fetch story data:", error);
        return { exists: false };
    }
}

// --- Page Component (Server-Side) ---

type CheckoutStoryPageProps = {
  params: Promise<{
    storyId: string;
  }>;
};

export default async function CheckoutStoryPage({ params }: CheckoutStoryPageProps) {
    const { storyId } = await params;
    const decodedStoryId = decodeURIComponent(storyId);

    const storyResult = await getStoryData(decodedStoryId);

    // Handle the case where the story is not found
    if (!storyResult.exists || !storyResult.data) {
        return (
            <Column flex={1} maxWidth="m">
                <RevealFx flex={1}>
                    <StoryNotFound storyId={decodedStoryId} />
                </RevealFx>
            </Column>
        );
    }

    // If the story exists, render the client component with the fetched data
    return (
        <Column flex={1} maxWidth="m">
            <RevealFx flex={1}>
                <DownloadManager
                    storyId={decodedStoryId}
                    storyData={storyResult.data}
                />
            </RevealFx>
        </Column>
    );
}