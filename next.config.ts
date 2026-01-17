import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // ========================================
  // 🚀 TWISE OS - PRODUCTION CONFIGURATION
  // Optimized for Three.js + Vercel Hosting
  // ========================================

  // Strict React mode for better development
  reactStrictMode: true,

  // Enable experimental features for performance
  experimental: {
    // Optimize package imports for Three.js ecosystem
    optimizePackageImports: [
      '@react-three/fiber',
      '@react-three/drei',
      '@react-three/postprocessing',
      'three',
      'gsap',
    ],
  },

  // Webpack configuration for Three.js
  webpack: (config, { isServer }) => {
    // Handle GLSL shader files if needed
    config.module.rules.push({
      test: /\.(glsl|vs|fs|vert|frag)$/,
      use: ['raw-loader', 'glslify-loader'],
      exclude: /node_modules/,
    });

    // Fix for Three.js SSR issues
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }

    return config;
  },

  // Security headers for production
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // DNS prefetch for performance
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          // XSS protection
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          // Clickjacking protection
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          // MIME sniffing protection
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          // Referrer policy
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin'
          },
          // Permissions policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()'
          },
        ]
      },
      // Cache static assets aggressively
      {
        source: '/sounds/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      },
      {
        source: '/projects/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ]
      }
    ];
  },

  // Image optimization configuration
  images: {
    // Enable modern formats
    formats: ['image/avif', 'image/webp'],
    // Remote patterns for external images (add if needed)
    remotePatterns: [
      // Example for external images:
      // {
      //   protocol: 'https',
      //   hostname: 'images.example.com',
      // }
    ],
    // Optimize image sizes
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },

  // Compiler optimizations
  compiler: {
    // Remove console.log in production
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Output configuration for Vercel
  output: 'standalone',

  // Powered by header (optional - remove for security)
  poweredByHeader: false,
};

export default nextConfig;
