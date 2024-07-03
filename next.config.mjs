/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ['lh3.googleusercontent.com'],
    },
    reactStrictMode: true,
    env: {
        NEXT_PUBLIC_API_KEY: "https://app.nipponexpress-necl.co.th:3000",
        NEXTAUTH_URL: process.env.NEXTAUTH_URL,
        NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
        NEXTEMAIL_URL: process.env.NEXTEMAIL_URL
    },
};

export default nextConfig;
