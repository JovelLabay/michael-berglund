/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    images: {
        domains: ["beta.digitalfans.se"],
    },
    env: {
        PASSWORD_PROTECT: process.env.APP_ENV === "staging",
    },
    async redirects() {
        return [
            {
                source: "/admin",
                destination: process.env.WP_ADMIN_SITE,
                permanent: true,
            },
            {
                source: "/wp-admin",
                destination: process.env.WP_ADMIN_SITE,
                permanent: true,
            },
        ];
    },
};

module.exports = nextConfig;
