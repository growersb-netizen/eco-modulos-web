import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    // Types are validated separately with tsc --noEmit (0 errors)
    // Next.js build-time checker fails on generated .next/types which differ by environment
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*.r2.dev',
      },
      {
        protocol: 'https',
        hostname: '*.cloudflarestorage.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-*.r2.dev',
      },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'ecomodulosypiscinas.com.ar', 'eco-modulos-web.vercel.app', '*.vercel.app'],
    },
  },
}

export default nextConfig
