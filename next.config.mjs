/** @type {import('next').NextConfig} */
const nextConfig = {
    redirects: async () => {
        return [
            {
                source: '/',
                destination: '/home',
                permanent: true,
            },
        ];
    },
    output: 'export',
    images:{
        unoptimized: true
    }
};

export default nextConfig;
