"use client";

import { useState } from "react";
import { downloader } from "@/resources";
import {
    Accordion,
    Background,
    Badge,
    Button,
    Column,
    Heading,
    Input,
    Media,
    opacity,
    PasswordInput,
    RevealFx,
    Row,
    SpacingToken,
    Switch,
    Text,
    TiltFx
} from "@once-ui-system/core";

// Define the shape of the data we'll pass up
interface DownloadConfig {
    embedImages: boolean;
    requiresLogin: boolean;
    username?: string;
    password?: string;
}

// The correct props type, accepting the callback and loading state
type DownloaderProps = React.ComponentProps<typeof Column> & {
    storyId: string;
    storyTitle: string;
    coverUrl: string;
    isMature: boolean;
    onDownload: (config: DownloadConfig) => void;
};

export const Downloader: React.FC<DownloaderProps> = ({
    storyId,
    storyTitle,
    coverUrl,
    isMature,
    onDownload,
    ...flex
}) => {
    // State management for the form controls
    const [embedImages, setEmbedImages] = useState<boolean>(true);
    const [requiresLogin, setRequiresLogin] = useState<boolean>(false);
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    // The handler function that gathers state and calls the prop
    const handleDownloadClick = () => {
        onDownload({
            embedImages,
            requiresLogin,
            username,
            password,
        });
    };

    return (
        <Column
            flex={1}
            overflow="hidden"
            fillWidth
            padding="xl"
            radius="l"
            marginBottom="m"
            horizontal="center"
            vertical="center"
            align="center"
            background="surface"
            border="neutral-alpha-weak"
            {...flex}
        >
            {/* The Background and other JSX remains the same... */}
            <Background
                top="0"
                position="absolute"
                mask={{
                    x: downloader.effects.mask.x,
                    y: downloader.effects.mask.y,
                    radius: downloader.effects.mask.radius,
                    cursor: downloader.effects.mask.cursor,
                }}
                gradient={{
                    display: downloader.effects.gradient.display,
                    opacity: downloader.effects.gradient.opacity as opacity,
                    x: downloader.effects.gradient.x,
                    y: downloader.effects.gradient.y,
                    width: downloader.effects.gradient.width,
                    height: downloader.effects.gradient.height,
                    tilt: downloader.effects.gradient.tilt,
                    colorStart: downloader.effects.gradient.colorStart,
                    colorEnd: downloader.effects.gradient.colorEnd,
                }}
                dots={{
                    display: downloader.effects.dots.display,
                    opacity: downloader.effects.dots.opacity as opacity,
                    size: downloader.effects.dots.size as SpacingToken,
                    color: downloader.effects.dots.color,
                }}
                grid={{
                    display: downloader.effects.grid.display,
                    opacity: downloader.effects.grid.opacity as opacity,
                    color: downloader.effects.grid.color,
                    width: downloader.effects.grid.width,
                    height: downloader.effects.grid.height,
                }}
                lines={{
                    display: downloader.effects.lines.display,
                    opacity: downloader.effects.lines.opacity as opacity,
                    size: downloader.effects.lines.size as SpacingToken,
                    thickness: downloader.effects.lines.thickness,
                    angle: downloader.effects.lines.angle,
                    color: downloader.effects.lines.color,
                }}
            />
            <Row
                fillWidth
                maxWidth="l"
                vertical="center"
                horizontal="center"
                gap="48"
                s={{ direction: 'column', gap: '32' }}
            >
                <Column flex={1} horizontal="center" vertical="center" gap="16">
                    <RevealFx horizontal="center">
                        <TiltFx aspectRatio="16/25" radius="m">
                            <Media src={coverUrl}/>
                        </TiltFx>
                    </RevealFx>
                    <RevealFx delay={0.2} horizontal="center">
                        <Badge
                            id="maturity-badge"
                            title={isMature ? "Mature" : "Not Mature"}
                            icon={isMature ? "alert-triangle" : "check-circle"}
                        />
                    </RevealFx>
                </Column>

                <Column flex={2} gap="24" vertical="center">
                    <RevealFx delay={0.1} fillWidth horizontal="center">
                        <Column gap="8" align="center">
                            <Heading variant="display-strong-xs">{storyTitle}</Heading>
                            <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance" align="center">
                                Configure download options for <strong>{storyId}</strong>
                            </Text>
                        </Column>
                    </RevealFx>

                    <RevealFx delay={0.2} fillWidth horizontal="center">
                        <Switch
                            label={embedImages ? "Images will be embedded" : "Embed images in download"}
                            isChecked={embedImages}
                            onToggle={() => setEmbedImages(!embedImages)}
                        />
                    </RevealFx>

                    <RevealFx delay={0.3} fillWidth horizontal="center">
                        <Switch
                            label={requiresLogin ? "Login details required" : "Login before downloading"}
                            isChecked={requiresLogin}
                            onToggle={() => setRequiresLogin(!requiresLogin)}
                        />
                    </RevealFx>
                    {requiresLogin && (
                        <Accordion title="Login Credentials">
                            <Column fillWidth gap="-1" paddingTop="m">
                                <Input
                                    id="username-input"
                                    radius="top"
                                    placeholder="Username or Email"
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                />
                                <PasswordInput
                                    id="password-input"
                                    radius="bottom"
                                    placeholder="Enter your password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </Column>
                        </Accordion>
                    )}
                    <RevealFx delay={0.5} fillWidth horizontal="center">
                        <Row height="48" vertical="center">
                            <Button
                                onClick={handleDownloadClick}
                                size="m"
                                fillWidth
                            >
                                Download
                            </Button>
                        </Row>
                    </RevealFx>
                </Column>
            </Row>
        </Column>
    );
};
