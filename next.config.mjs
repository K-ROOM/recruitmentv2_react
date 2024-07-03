/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_API_KEY: "http://localhost:3000",
        NEXTAUTH_URL: "http://localhost:3001",
        NEXTAUTH_SECRET: "rms-access-token",
        NEXTEMAIL_URL: "http://172.16.58.231:3002/main"
    },
};

export default nextConfig;
