import mdx from "@next/mdx";

const withMDX = mdx({
    extension: /\.mdx?$/,
    options: {},
});

/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    pageExtensions: ["ts", "tsx", "md", "mdx"],
    transpilePackages: ["next-mdx-remote"],
    sassOptions: {
        compiler: "modern",
        silenceDeprecations: ["legacy-js-api"],
    },
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "img.wattpad.com",
                port: '',
                pathname: '/cover/**',
            }
        ]
    },
    async rewrites() {
      return [
        {
          // Source: The path your frontend will call
          source: '/api/generate-epub',
          // Destination: The actual backend API endpoint
          destination: `${process.env.NEXT_PUBLIC_API_BASE_PATH}/generate-epub`,
        },
      ];
    },
};

export default withMDX(nextConfig);
