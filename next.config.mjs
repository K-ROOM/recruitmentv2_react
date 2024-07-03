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
        allowedOrigins: ['https://app.nipponexpress-necl.co.th:3000', 'http://app.nipponexpress-necl.co.th:3000', 'https://app.nipponexpress-necl.co.th', 'http://app.nipponexpress-necl.co.th'],
    },
    reactStrictMode: true,
};

export default nextConfig;
