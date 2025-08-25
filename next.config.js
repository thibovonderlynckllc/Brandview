const { withPayload } = require('@payloadcms/next/withPayload');
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-f28c86d50e5f425b9db2cb6635b7290c.r2.dev',
        port: '',
        pathname: '/media/**',
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
