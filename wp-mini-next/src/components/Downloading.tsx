"use client";

import {downloading, routes} from "@/resources";
import {Background, RevealFx, Button, Column, Heading, opacity, Row, SpacingToken, Text,} from "@once-ui-system/core";
import {router} from "next/client";

// This is a server component that accepts the storyId as a prop.
export const Downloading: React.FC<React.ComponentProps<typeof Column> & { storyId: string }> = ({
                                                                                                       storyId,
                                                                                                       ...flex
                                                                                                   }) => {
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
            <Background
                top="0"
                position="absolute"
                mask={{
                    x: downloading.effects.mask.x,
                    y: downloading.effects.mask.y,
                    radius: downloading.effects.mask.radius,
                    cursor: downloading.effects.mask.cursor,
                }}
                gradient={{
                    display: downloading.effects.gradient.display,
                    opacity: downloading.effects.gradient.opacity as opacity,
                    x: downloading.effects.gradient.x,
                    y: downloading.effects.gradient.y,
                    width: downloading.effects.gradient.width,
                    height: downloading.effects.gradient.height,
                    tilt: downloading.effects.gradient.tilt,
                    colorStart: downloading.effects.gradient.colorStart,
                    colorEnd: downloading.effects.gradient.colorEnd,
                }}
                dots={{
                    display: downloading.effects.dots.display,
                    opacity: downloading.effects.dots.opacity as opacity,
                    size: downloading.effects.dots.size as SpacingToken,
                    color: downloading.effects.dots.color,
                }}
                grid={{
                    display: downloading.effects.grid.display,
                    opacity: downloading.effects.grid.opacity as opacity,
                    color: downloading.effects.grid.color,
                    width: downloading.effects.grid.width,
                    height: downloading.effects.grid.height,
                }}
                lines={{
                    display: downloading.effects.lines.display,
                    opacity: downloading.effects.lines.opacity as opacity,
                    size: downloading.effects.lines.size as SpacingToken,
                    thickness: downloading.effects.lines.thickness,
                    angle: downloading.effects.lines.angle,
                    color: downloading.effects.lines.color,
                }}
            />
            <Column
                maxWidth="xs"
                horizontal="center"
                align="center"
                vertical="center" 
                gap="24"
            >
                <RevealFx horizontal="center">
                    <Heading marginBottom="l" variant="display-strong-xs">
                        We got it!
                    </Heading>
                </RevealFx>
                <RevealFx delay={0.2} horizontal="center">
                    <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance" align="center">
                        We are started processing story with the story id : <strong>{storyId}.</strong>
                    </Text>
                </RevealFx>
                <RevealFx delay={0.1} horizontal="center">
                    <Row height="48" vertical="center">
                        {routes["/"] && (
                            <Button size="m" fillWidth prefixIcon="home" href="/">
                               Home (WILL CANCEL ONGOING DOWNLOADS)
                            </Button>
                        )}
                    </Row>
                </RevealFx>
            </Column>
        </Column>
    );
};