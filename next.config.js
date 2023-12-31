/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        //domains: ["tailwindui.com", "res.cloudinary.com"],
        // remotePatterns: ["res.cloudinary.com"],
        remotePatterns: [
            {
                protocol: "https",
                hostname: "res.cloudinary.com",
                pathname: "**",
            },
        ],
    },
};

module.exports = nextConfig;
