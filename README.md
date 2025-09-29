<p align="center">
  <img src="logo.png" alt="WattDownload Logo" width="200px">
</p>

<h1 align="center">WP | EPUB | Extra-Mini | WEB [NextJS + Axum]</h1>

<p align="center">
  Extra-Minimal "NextJS + [Shuttle] Axum" Web app to Download Stories from WP in EPUB (version 3) format. <br/>
  Uses <a href="https://crates.io/crates/wp-mini">wp-mini</a> crate to download and <a href="https://crates.io/crates/wp-mini-epub">wp-mini-epub</a> crate to generate epubs.
</p>

---

## What is this?
- A Blazing fast - Extra-Minimal Web app to download any story from WP to epub (version 3) format - even purchased ones, that you can deploy yourself easily.

## Disclaimer
> [!WARNING]
> Using this app may violate Wattpad's [Terms of Service](https://policies.wattpad.com/terms/). These tools are provided for educational and personal backup purposes only. **USE AT YOUR OWN RISK.**

## Features
- Download any story under a minute.
- Download purchaed content (Premium chapter) - with WP credentials.
- Download stories with or without images embedded.
- Clean, Extra-Minimal Frontend.

## Get Started [Deploy]
 0. Create [Netlify](https://netlify.com) (for frontend) & [Shuttle](https://shuttle.dev) (for backend) accounts.
 0. Fork this repository to your GitHub account. (Or [GitLab](https://gitlab.com)/[BitBucket](https://bitbucket.org)/[Azure DevOps](https://azure.microsoft.com)). We'll need this to deploy frontend to netlify.
 0. Clone this repo. We'll need it to deploy backend to [Shuttle](https://shuttle.dev)

    ```bash
    git clone https://github.com/WattDownload/wp-mini-next-shuttle-axum
    ```
    
 2. Create "Migrate an existing project" in [shuttle.dev](https://shuttle.dev). You can access it directly with [https://console.shuttle.dev/templates/migration-to-shuttle](https://console.shuttle.dev/templates/migration-to-shuttle).
 3. Note your Shuttle `Project ID` (Ex: proj_XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX), and `Project URL` (Ex: rotten-banana-h3m2.shuttle.app) in Shuttle Project Overview, we'll need them later.
 4. Create "Import from existing project" in [app.netlify.com/start](https://app.netlify.com/start) and from here, select your forked git repository, and in 3rd step:
  i. Give the Netlify Project a name in `Project name` field.
  ii. In `Build Settings` section, change field `Base directory` to `wp-mini-next` (Note: our frontend is in gitrepo/wp-mini-next dir, that's why.) 
  iii. Verify field `Publish directory` is set to `wp-mini-next/.next` (Automatically sets) & `Build Command` is set to `pnpm run build`.
  iv. In `Environment Variables` section Click `Add environment variables` dropdown menu and select `Add key/value pairs`.
  v. Add a new key/value pair with `NEXT_PUBLIC_API_BASE_PATH` as key and your **shuttle project's `Project URL`** (What we noted in step 3)
 5. Click `Deploy wp-mini-next` to deploy the frontend. But note we'll need to redeploy the frontend.
 6. Note the frontend URL, we'll need this later.
 7. Go back to [Shuttle Console](https://console.shuttle.dev). and select your project, and go to **Settings** tab.
 8. In settings tab, in **Secrets section**, create a new key/value pair with **key: `FRONTEND_ORIGIN`** and **value: your frontend url (Which we noted in step 6)**.
 9. Install Shuttle CLI in your computer:
    - MacOS / Linux
      ```bash
      curl -sSfL https://www.shuttle.dev/install | bash
      ```

    - Windows
      ```pwsh
      iwr https://www.shuttle.dev/install-win | iex
      ```
    or follow: [https://docs.shuttle.dev/getting-started/installation](https://docs.shuttle.dev/getting-started/installation)
  
  10. In your cloned (local clone we created in step 0 (with `git clone https://github.com/WattDownload/wp-mini-next-shuttle-axum`), navigate to `wp-mini-shuttle-axum` dir. (So we're now in `/wp-mini-next-shuttle-axum/wp-mini-shuttle-axum` dir), and create a new folder with name `.shuttle` (Don't miss the `.` in the folder name)
  11. In `.shuttle` folder create a new file with name, `config.toml` and edit it with a text editor and put your **shuttle project `Project ID`** (which we noted in step 3) in it following bellow:
      ```toml
      id = "proj_01K51ZM7G4JZZNAXSXT3PJA53E"
      ```
  12. Save it and go back to `/wp-mini-next-shuttle-axum/wp-mini-shuttle-axum` dir.
  13. Execute following command and follow login instructions to login to your [shuttle.dev](httos://shuttle.dev) account.
      ```bash
      shuttle login
      ```
  14. Deploy Shuttle-Axum Backend, with:
      ```bash
      shuttle deploy
      ```
  15. After succesful deploy, Go back to your netlify project, and in **Project configuration**, select **Continuous deployment** (which's in **Build & deploy** section), and in **Build Setting**, click `Configure` and set **Runtime** to **NextJS**. and Save.
  16. In **Deployments**, Click on **Trigger Deploy** dropdown menu, select **Deploy project without cache** 
  ~~ All Done!

[![Youtube Video](https://github.com/user-attachments/assets/5f98a6d3-ba8c-4aaf-a121-f2619fd1c6f8)](https://youtu.be/Fuhi-x1_ev8)

---

## Get Started (Dev)
- Just reach refer source and figure our yourself - at least for now.

---

## Showcase

https://github.com/user-attachments/assets/0236746f-ee6d-4f66-b81b-fa512cc85707

---

> [!NOTE]
> `Wattpad` is a registered trademark of `Wattpad` & `Webtoon Entertainment Inc.`. This project is not affiliated with, endorsed, or sponsored by Wattpad.

<p align="center">© 2025 WattDownload.</p>
