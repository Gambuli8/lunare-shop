/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'www.joyerianewmar.com'
            }
        ]
    }
}

export default nextConfig
