/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    env: {
        NEXT_PUBLIC_API_KEY: process.env.NEXT_PUBLIC_API_KEY,
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTEMAIL_URL: process.env.NEXTEMAIL_URL,
    }
    // experimental: {
    //     serverActions: true,
    // },
    // reactStrictMode: true,
};

export default nextConfig;
