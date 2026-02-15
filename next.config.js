/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Disabled to prevent Leaflet map double-initialization in dev mode
    images: {
        domains: ['images.unsplash.com', 'source.unsplash.com'],
    },
}

module.exports = nextConfig
