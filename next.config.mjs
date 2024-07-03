/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    experimental: {
        serverActions: true,
        mutations: true,
    },
    reactStrictMode: true,
};

export default nextConfig;
