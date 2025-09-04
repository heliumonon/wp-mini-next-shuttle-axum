"use client";

import { useState } from "react";
import { Downloader, Downloading } from "@/components";
import { RevealFx } from "@once-ui-system/core";

interface StoryData {
    title: string;
    cover: string;
    mature: boolean;
}

interface DownloadConfig {
    embedImages: boolean;
    requiresLogin: boolean;
    username?: string;
    password?: string;
}


interface DownloadManagerProps {
    storyId: string;
    storyData: StoryData;
}

export function DownloadManager({ storyId, storyData }: DownloadManagerProps) {
    const [downloadState, setDownloadState] = useState<'configuring' | 'downloading'>('configuring');
    // We don't need downloadConfig state anymore

    // This function now needs to be async
    const handleStartDownload = async (config: DownloadConfig) => {
        // Switch the UI to "Downloading" immediately
        setDownloadState('downloading');

        try {
            const response = await fetch('/api/generate-epub', { // Use the new rewrite source path
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // Construct the JSON body that matches the Rust struct
                body: JSON.stringify({
                    storyId: Number(storyId), // Ensure storyId is a number
                    isEmbedImages: config.embedImages,
                    username: config.username || null,
                    password: config.password || null,
                }),
            });

            if (!response.ok) {
                // You can add more robust error handling here, e.g., show a toast notification
                const errorData = await response.json();
                console.error("Failed to download:", errorData.error);
                setDownloadState('configuring'); // Reset UI on failure
                alert(`Error: ${errorData.error || 'Could not generate EPUB.'}`);
                return;
            }

            // The request was successful, now trigger the browser download
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `${storyData.title}.epub`); // Set the desired filename
            document.body.appendChild(link);
            link.click();
            link.parentNode?.removeChild(link);
            window.URL.revokeObjectURL(url); // Clean up the object URL

            // Optionally, you can reset the state after a successful download
            // setTimeout(() => setDownloadState('configuring'), 1000);

        } catch (error) {
            console.error("An unexpected error occurred:", error);
            setDownloadState('configuring'); // Reset UI on failure
            alert('An unexpected error occurred. Please check the console.');
        }
    };

    if (downloadState === 'configuring') {
        return (
            <Downloader
                storyId={storyId}
                storyTitle={storyData.title}
                coverUrl={storyData.cover}
                isMature={storyData.mature}
                onDownload={handleStartDownload}
            />
        );
    } else {
        return (
            <RevealFx flex={1}>
                <Downloading
                    storyId={storyId}
                />
            </RevealFx>
        );
    }
}