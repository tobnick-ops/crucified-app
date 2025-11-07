// Performance Optimization Configuration
// Next.js optimiert für Production

import type { NextConfig } from 'next';

const performanceConfig: NextConfig = {
  // Image Optimization
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60 * 60 * 24 * 365, // 1 Jahr
  },

  // Compiler Optimization
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Compression
  compress: true,

  // React Strict Mode
  reactStrictMode: true,

  // Production Source Maps (disabled für Performance)
  productionBrowserSourceMaps: false,

  // SWC Minification
  swcMinify: true,

  // Trailing Slashes
  trailingSlash: false,

  // PoweredByHeader entfernen
  poweredByHeader: false,

  // Headers für Performance
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
      {
        source: '/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },
};

export default performanceConfig;

// USAGE: Merge mit bestehendem next.config.ts
// const config = { ...existingConfig, ...performanceConfig };

