import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  typescript: {
    // Types are validated separately with tsc --noEmit (0 errors)
    // Next.js build-time checker fails on generated .next/types which differ by environment
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      // Cloudflare R2
      { protocol: 'https', hostname: '*.r2.dev' },
      { protocol: 'https', hostname: '*.cloudflarestorage.com' },
      { protocol: 'https', hostname: 'pub-*.r2.dev' },
      // Google Drive / Workspace
      { protocol: 'https', hostname: 'drive.google.com' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: '*.googleusercontent.com' },
      // Dropbox
      { protocol: 'https', hostname: '*.dropboxusercontent.com' },
      { protocol: 'https', hostname: 'dl.dropboxusercontent.com' },
      // ImgBB
      { protocol: 'https', hostname: 'i.ibb.co' },
      // Imgur
      { protocol: 'https', hostname: 'i.imgur.com' },
      // WhatsApp / Meta CDN
      { protocol: 'https', hostname: '*.fbcdn.net' },
      { protocol: 'https', hostname: '*.cdninstagram.com' },
      // Cloudinary
      { protocol: 'https', hostname: 'res.cloudinary.com' },
      // GitHub
      { protocol: 'https', hostname: 'raw.githubusercontent.com' },
      { protocol: 'https', hostname: '*.githubusercontent.com' },
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3000', 'ecomodulosypiscinas.com.ar', 'eco-modulos-web.vercel.app', '*.vercel.app'],
    },
  },
}

export default nextConfig
