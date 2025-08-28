import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/hooks/useAuth'

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'C2P Platform - Plateforme d\'Apprentissage Moderne',
  description: 'Plateforme d\'apprentissage moderne avec formation structurée, communauté active et gamification pour créer une expérience d\'apprentissage engageante et efficace.',
  keywords: 'développement, formation, cours, communauté, gamification, apprentissage',
  authors: [{ name: 'C2P Platform Team' }],
  creator: 'C2P Platform',
  publisher: 'C2P Platform',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://c2p-platform.com'),
  openGraph: {
    title: 'C2P Platform - Plateforme d\'Apprentissage Moderne',
    description: 'Plateforme d\'apprentissage moderne avec formation structurée, communauté active et gamification.',
    url: 'https://c2p-platform.com',
    siteName: 'C2P Platform',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'C2P Platform',
      },
    ],
    locale: 'fr_FR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'C2P Platform - Plateforme d\'Apprentissage Moderne',
    description: 'Plateforme d\'apprentissage moderne avec formation structurée, communauté active et gamification.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="antialiased">
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}
