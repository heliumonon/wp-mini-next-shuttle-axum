"use client"; // <-- Add this line to the very top

import {notFound, routes} from "@/resources";
import {Background, Button, Column, Heading, opacity, Row, SpacingToken, Text,} from "@once-ui-system/core";
import {router} from "next/client";

// This is a server component that accepts the storyId as a prop.
export const StoryNotFound: React.FC<React.ComponentProps<typeof Column> & { storyId: string }> = ({
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
                    x: notFound.effects.mask.x,
                    y: notFound.effects.mask.y,
                    radius: notFound.effects.mask.radius,
                    cursor: notFound.effects.mask.cursor,
                }}
                gradient={{
                    display: notFound.effects.gradient.display,
                    opacity: notFound.effects.gradient.opacity as opacity,
                    x: notFound.effects.gradient.x,
                    y: notFound.effects.gradient.y,
                    width: notFound.effects.gradient.width,
                    height: notFound.effects.gradient.height,
                    tilt: notFound.effects.gradient.tilt,
                    colorStart: notFound.effects.gradient.colorStart,
                    colorEnd: notFound.effects.gradient.colorEnd,
                }}
                dots={{
                    display: notFound.effects.dots.display,
                    opacity: notFound.effects.dots.opacity as opacity,
                    size: notFound.effects.dots.size as SpacingToken,
                    color: notFound.effects.dots.color,
                }}
                grid={{
                    display: notFound.effects.grid.display,
                    opacity: notFound.effects.grid.opacity as opacity,
                    color: notFound.effects.grid.color,
                    width: notFound.effects.grid.width,
                    height: notFound.effects.grid.height,
                }}
                lines={{
                    display: notFound.effects.lines.display,
                    opacity: notFound.effects.lines.opacity as opacity,
                    size: notFound.effects.lines.size as SpacingToken,
                    thickness: notFound.effects.lines.thickness,
                    angle: notFound.effects.lines.angle,
                    color: notFound.effects.lines.color,
                }}
            />
            <Column
                maxWidth="xs"
                horizontal="center"
                align="center"
                vertical="center" 
                gap="24"
            >
                <Heading marginBottom="l" variant="display-strong-xs">
                    Story Not Found!
                </Heading>
                <Text variant="body-default-l" onBackground="neutral-weak" wrap="balance" align="center">
                    We couldn&apos;t find a story with the story id : <strong>{storyId}</strong>
                </Text>
                <Row height="48" vertical="center">
                    {routes["/"] && (
                        <Button size="m" fillWidth prefixIcon="home" href="/">
                           Return Home
                        </Button>
                    )}
                </Row>
            </Column>
        </Column>
    );
};