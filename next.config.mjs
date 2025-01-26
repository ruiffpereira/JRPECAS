/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '2001',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'api.code-fullstack.com',
      },
    ],
  },
}

export default nextConfig
