/** @type {import('next').NextConfig} */
const nextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: '/courses',
                permanent: true,
            }
        ]
    },
    images: {
        domains: [
            'laquintaemprende.cl',
            'd11cuk1a0j5b57.cloudfront.net',
            's24534.pcdn.co',
            'prod-discovery.edx-cdn.org',
            "i.ytimg.com",
            "i3.ytimg.com",
            'i.blogs.es',
            'i.ytimg.com',
            'img.youtube.com'
        ]
    },

}

module.exports = nextConfig
