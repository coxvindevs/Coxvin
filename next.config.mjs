/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: process.cwd(),
  distDir: process.env.NEXT_BUILD_DIR || '.next',
  async headers() {
    return [
      { source: '/images/optimized/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=3600, stale-while-revalidate=86400' }] },
      { source: '/project-demos/assets/:path*', headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }] },
      { source: '/project-demos/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
      { source: '/portal-field-test/:path*', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
    ];
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.prod.website-files.com',
      },
      {
        protocol: 'https',
        hostname: 'byhuy.b-cdn.net',
      },
    ],
  },
};

export default nextConfig;
