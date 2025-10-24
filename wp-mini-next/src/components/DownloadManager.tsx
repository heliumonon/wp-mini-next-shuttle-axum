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

    const handleStartDownload = async (config: DownloadConfig) => {
        // Switch the UI to "Downloading" immediately
        setDownloadState('downloading');

        try {
            const response = await fetch('/api/generate-epub', {
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
                // Should add more robust error handling here, e.g., show a toast notification
                const errorData = await response.json();
                console.error("Failed to download:", errorData.error);
                setDownloadState('configuring'); // Reset UI on failure
                alert(`Error: ${errorData.error || 'Could not generate EPUB.'}`);
                return;
            }

            // The request was successful, now trigger the browser download
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);

            // Try to extract filename from the response header (supports UTF-8 encoding)
            const disposition = response.headers.get('Content-Disposition');
            let filename: string | null = null;

            if (disposition) {
              // Try UTF-8 encoded version first
              const utf8Match = disposition.match(/filename\*\s*=\s*UTF-8''([^;]+)/i);
              if (utf8Match && utf8Match[1]) {
                try {
                  filename = decodeURIComponent(utf8Match[1]);
                } catch {
                  filename = utf8Match[1];
                }
              } else {
                // Fallback to simple filename=
                const match = disposition.match(/filename="?([^"]+)"?/);
                if (match && match[1]) filename = match[1];
              }
            }

            // Default fallback (safe ASCII)
            if (!filename) filename = `story-${storyId}.epub`;

            const link = document.createElement('a');
            link.href = url;
            link.download = filename;
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url); // Clean up the object URL
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