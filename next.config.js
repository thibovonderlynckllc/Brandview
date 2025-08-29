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
    // Removed optimizeCss as it's causing the critters error
  },
  // Turbopack configuration (moved from experimental.turbo)
  turbopack: {
    rules: {
      '*.svg': {
        loaders: ['@svgr/webpack'],
        as: '*.js',
      },
    },
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
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  // Enable compression
  compress: true,
  // Removed swcMinify as it's not needed in Next.js 15
  // Additional performance optimizations
  poweredByHeader: false,
  generateEtags: false,
  // Optimize static assets
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://brandview.be' : '',
};

module.exports = withPayload(nextConfig);
