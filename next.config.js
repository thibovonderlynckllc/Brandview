const { withPayload } = require('@payloadcms/next/withPayload');

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  serverExternalPackages: ['payload'],
  // Performance optimizations
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-5d9eae249ab74c239b5667c69d5b928e.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
    // Optimize image loading
    formats: ['image/webp', 'image/avif'],
    minimumCacheTTL: 60 * 60 * 24 * 30, // 30 days
  },
  // Enable compression
  compress: true,
  // Optimize bundle size
  swcMinify: true,
};

module.exports = withPayload(nextConfig);
