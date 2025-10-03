/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  images: {
    domains: ['localhost'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
  eslint: {
    // Permettre le build même avec des erreurs ESLint
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Permettre le build même avec des erreurs TypeScript
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
