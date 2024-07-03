/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['https://10.0.0.7:3000', 'http://10.0.0.7:3000', 'https://10.0.0.7', 'http://10.0.0.7'],
        },
        mutations: true,
    },
    reactStrictMode: true,
    distDir: 'build',
};

export default nextConfig;
