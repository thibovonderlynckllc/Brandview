/** @type {import('next').NextConfig} */
const nextConfig = {
  // Only use static export for production builds, not during development
  ...(process.env.NODE_ENV === 'production' && {
    output: 'export',
    trailingSlash: true,
  }),
  images: {
    unoptimized: true, // Required for static export
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
};

module.exports = nextConfig;
