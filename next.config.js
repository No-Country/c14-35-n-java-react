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
            'i.blogs.es',
            "i3.ytimg.com",
            "i.ytimg.com"
        ]

    },

}

module.exports = nextConfig
