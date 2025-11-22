/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'media.graphassets.com',
      'avatars.githubusercontent.com',
      'troupebrasil.com.br',
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.graphassets.com',
      },
    ],
  },
};

module.exports = nextConfig;
