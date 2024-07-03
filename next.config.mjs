/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    experimental: {
        serverActions: true,
    },
    reactStrictMode: true,
};

export default nextConfig;
