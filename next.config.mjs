/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            { protocol: 'https', hostname: 'images.pokemontcg.io' },
            { protocol: 'https', hostname: 'images.scrydex.com' },
            { protocol: 'https', hostname: 'raw.githubusercontent.com' },
        ],
    },
};
export default nextConfig;
