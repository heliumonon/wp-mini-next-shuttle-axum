import {
    About,
    Blog,
    CheckingOut,
    Checkout,
    Downloader,
    Home,
    Newsletter,
    NotFoundingStory,
    Person,
    Social,
    StoryNotFound, StoryNotFoundConfig
} from "@/types";
import {Line, Row, Text} from "@once-ui-system/core";

const person: Person = {
    firstName: "WattDownload",
    lastName: "Organization",
    name: "WattDownload",
    role: "Organization",
    avatar: "/images/avatar.jpg",
    email: "contact@heaven.com",
    location: "Asia/Colombo", // Expecting the IANA time zone identifier, e.g., 'Europe/Vienna'
    languages: ["English"], // optional: Leave the array empty if you don&apost want to display languages
};

const newsletter: Newsletter = {
    display: true,
    title: <>Subscribe to {person.firstName}&aposs Newsletter</>,
    description: <>My weekly newsletter about creativity and engineering</>,
};

const checkoutStory: Checkout = {
    display: true,
    title: <>Download Your Story</>,
};

const downloaderStory: Downloader = {
    display: true,
    title: <>Downloading Your Story</>,
};

const social: Social = [
    // Links are automatically displayed.
    // Import new icons in /once-ui/icons.ts
    {
        name: "Email",
        icon: "email",
        link: `mailto:${person.email}`,
    },
];

const home: Home = {
    path: "/",
    image: "/images/og/home.jpg",
    label: "Home",
    title: `WattDownload`,
    description: `Freedom to read - guaranteed!`,
    headline: <>WattDownload</>,
    featured: {
        display: true,
        title: (
            <Row gap="12" vertical="center">
                <strong className="ml-4">WattDownload</strong>{" "}
                <Line background="brand-alpha-strong" vert height="20"/>
                <Text marginRight="4" onBackground="brand-medium">
                    Featured work
                </Text>
            </Row>
        ),
        href: "https://wattpad.com",
    },
    subline: (
        <>Freedom to Read - Guaranteed!</>
    ),
};

const about: About = {
    path: "/about",
    label: "About",
    title: `About – ${person.name}`,
    description: `Meet ${person.name}, ${person.role} from ${person.location}`,
    tableOfContent: {
        display: true,
        subItems: false,
    },
    avatar: {
        display: true,
    },
    calendar: {
        display: true,
        link: "https://cal.com",
    },
    intro: {
        display: true,
        title: "Introduction",
        description: (
            <>
                We notices the best stories are keeps disappearing...
                Also currently available options are not so-cool.
                So we came up with this.
            </>
        ),
    },
    studies: {
        display: false, // set to false to hide this section
        title: "Studies",
        institutions: [
            {
                name: "University of Jakarta",
                description: <>Studied software engineering.</>,
            },
            {
                name: "Build the Future",
                description: <>Studied online marketing and personal branding.</>,
            },
        ],
    },
    technical: {
        display: false, // set to false to hide this section
        title: "Technical skills",
        skills: [
            {
                title: "Figma",
                description: (
                    <>Able to prototype in Figma with Once UI with unnatural speed.</>
                ),
                tags: [
                    {
                        name: "Figma",
                        icon: "figma",
                    },
                ],
                // optional: leave the array empty if you don't want to display images
                images: [
                    {
                        src: "/images/projects/project-01/cover-02.jpg",
                        alt: "Project image",
                        width: 16,
                        height: 9,
                    },
                    {
                        src: "/images/projects/project-01/cover-03.jpg",
                        alt: "Project image",
                        width: 16,
                        height: 9,
                    },
                ],
            },
            {
                title: "Next.js",
                description: (
                    <>Building next gen apps with Next.js + Once UI + Supabase.</>
                ),
                tags: [
                    {
                        name: "JavaScript",
                        icon: "javascript",
                    },
                    {
                        name: "Next.js",
                        icon: "nextjs",
                    },
                    {
                        name: "Supabase",
                        icon: "supabase",
                    },
                ],
                // optional: leave the array empty if you don't want to display images
                images: [
                    {
                        src: "/images/projects/project-01/cover-04.jpg",
                        alt: "Project image",
                        width: 16,
                        height: 9,
                    },
                ],
            },
        ],
    },
};

const blog: Blog = {
    path: "/blog",
    label: "Blog",
    title: "WattDownload - Blogs",
    description: `Read what ${person.name} has been up to recently`,
    // Create new blog posts by adding a new .mdx file to app/blog/posts
    // All posts will be listed on the /blog route
};

const checkingOut: CheckingOut = {
    path: "/checkout",
    label: "Checkout",
    title: `Checkout Story`,
    description: `Checkout & Configure Download`,
};

export {
    person,
    social,
    newsletter,
    home,
    about,
    blog,
    checkoutStory,
    checkingOut,
    downloaderStory,
};
