/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    experimental: {
        serverActions: true,
    },
    reactStrictMode: true,
    env: {
        PORT: 3001
    }
};

export default nextConfig;
