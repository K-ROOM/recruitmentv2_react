/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    experimental: {
        serverActions: {
            allowedOrigins: ['https://app.nipponexpress-necl.co.th:3000', 'http://app.nipponexpress-necl.co.th:3000', 'https://app.nipponexpress-necl.co.th', 'http://app.nipponexpress-necl.co.th'],
        },
        mutations: true,
    },
    reactStrictMode: true,
};

export default nextConfig;
