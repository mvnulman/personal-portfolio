/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'media.graphassets.com',
      'avatars.githubusercontent.com',
      'troupebrasil.com.br',
      'picsum.photos',
      'opengraph.githubassets.com',
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
