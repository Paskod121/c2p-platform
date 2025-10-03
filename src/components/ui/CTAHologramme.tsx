'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface CTAHologrammeProps {
  children: React.ReactNode
  href: string
  className?: string
}

export function CTAHologramme({ children, href, className = "" }: CTAHologrammeProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <Link href={href} aria-label="Appel à l'action" role="button">
      <div
        className={`relative group cursor-pointer focus:outline-none focus-visible:ring-4 focus-visible:ring-cyan-500/40 rounded-2xl overflow-hidden ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') (e.currentTarget as HTMLDivElement).click() }}
      >
        {/* Glow d'arrière-plan */}
        <div className={`absolute inset-0 bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 rounded-2xl blur-md transition-all duration-500 ${isHovered ? 'opacity-60 scale-102' : 'opacity-35 scale-100'}`} />
        {/* Dégradé subtil clair */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-cyan-50 via-white to-pink-50 dark:opacity-0" />
        <div className={`relative z-10 bg-white/90 dark:bg-black/35 backdrop-blur-xl border border-gray-200 dark:border-white/10 rounded-2xl p-4 sm:p-6 shadow-md transition-all duration-200 ${isHovered ? '-translate-y-0.5 shadow-lg' : 'translate-y-0'}`}>
          {children}
          {/* Flèche animée à droite */}
          <span className={`absolute right-4 top-1/2 -translate-y-1/2 text-cyan-600 dark:text-cyan-300 transition-all duration-200 ${isHovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-1'}`} aria-hidden>
            <ArrowRight className="h-5 w-5" />
          </span>
        </div>
        <div className={`pointer-events-none absolute inset-0 rounded-2xl ring-1 ring-gray-200/80 dark:ring-white/10 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-80'}`} />
      </div>
    </Link>
  )
}
