const { withPayload } = require('@payloadcms/next/withPayload');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Removed static export to enable Payload CMS functionality
  images: {
    unoptimized: false, // Enable Next.js image optimization
    formats: ['image/avif', 'image/webp'],
    // Allow SVG files to be handled properly
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Robots-Tag',
            value: 'index,follow',
          },
        ],
      },
    ];
  },
  experimental: {
    reactCompiler: false,
  },
};

// Make sure you wrap your `nextConfig` with the `withPayload` plugin
module.exports = withPayload(nextConfig);
