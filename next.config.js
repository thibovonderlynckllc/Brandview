const { withPayload } = require('@payloadcms/next/withPayload');
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-ec4b7a8b18774264a829c7ccb4b218bf.r2.dev',
        port: '',
        pathname: '/**',
      },
    ],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  experimental: {
    reactCompiler: false,
  },
};

module.exports = withPayload(nextConfig);
