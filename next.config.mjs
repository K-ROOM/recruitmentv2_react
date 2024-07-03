/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    experimental: {
        serverActions: true,
        mutations: true,
    },
    serverRuntimeConfig: {
        allowedOrigins: ['https://10.0.0.7:3000', 'http://10.0.0.7:3000', 'https://10.0.0.7', 'http://10.0.0.7'],
    },
    reactStrictMode: true,
};

export default nextConfig;
