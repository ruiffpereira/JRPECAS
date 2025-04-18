/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'api.code-fullstack.com',
      'lh3.googleusercontent.com',
    ],
  },
}

export default nextConfig
