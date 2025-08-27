const { withPayload } = require('@payloadcms/next/withPayload');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ['payload'],
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-f28c86d50e5f425b9db2cb6635b7290c.r2.dev',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'pub-5d9eae249ab74c239b5667c69d5b928e.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  compress: true,
  swcMinify: true,
};

module.exports = withPayload(nextConfig);
