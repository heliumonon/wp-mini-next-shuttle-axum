import {Avatar, Badge, Button, Column, Heading, Meta, RevealFx, Row, Schema, Text,} from "@once-ui-system/core";
import {about, baseURL, home, person} from "@/resources";
import {Checkout} from "@/components";

export async function generateMetadata() {
    return Meta.generate({
        title: home.title,
        description: home.description,
        baseURL: baseURL,
        path: home.path,
        image: home.image,
    });
}

export default function Home() {
    return (
        <Column maxWidth="m" gap="xl" paddingY="12" horizontal="center">
            <Schema
                as="webPage"
                baseURL={baseURL}
                path={home.path}
                title={home.title}
                description={home.description}
                image={`/api/og/generate?title=${encodeURIComponent(home.title)}`}
                author={{
                    name: person.name,
                    url: `${baseURL}${about.path}`,
                    image: `${baseURL}${person.avatar}`,
                }}
            />
            <Column fillWidth horizontal="center" gap="m">
                <Column maxWidth="s" horizontal="center" align="center">
                    {home.featured.display && (
                        <RevealFx
                            fillWidth
                            horizontal="center"
                            paddingTop="16"
                            paddingBottom="32"
                            paddingLeft="12"
                        >
                            <Badge
                                background="brand-alpha-weak"
                                paddingX="12"
                                paddingY="4"
                                onBackground="neutral-strong"
                                textVariant="label-default-s"
                                arrow={false}
                                href={home.featured.href}
                            >
                                <Row paddingY="2">{home.featured.title}</Row>
                            </Badge>
                        </RevealFx>
                    )}
                    <RevealFx translateY="4" fillWidth horizontal="center" paddingBottom="16">
                        <Heading wrap="balance" variant="display-strong-l">
                            {home.headline}
                        </Heading>
                    </RevealFx>
                    <RevealFx translateY="8" delay={0.2} fillWidth horizontal="center" paddingBottom="32">
                        <Text wrap="balance" onBackground="neutral-weak" variant="heading-default-xl">
                            {home.subline}
                        </Text>
                    </RevealFx>
                </Column>
            </Column>

            <RevealFx flex={1} paddingTop="12" translateY="4" delay={1.0} fillWidth horizontal="center" paddingBottom="16">
                <Checkout/>
            </RevealFx>
        </Column>
    );
}
