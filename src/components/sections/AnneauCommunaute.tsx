'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function AnneauCommunaute() {
  const membres = [
    { id: 1, nom: 'Aya', couleur: 'bg-cyan-500' },
    { id: 2, nom: 'Noah', couleur: 'bg-purple-500' },
    { id: 3, nom: 'Lina', couleur: 'bg-pink-500' },
    { id: 4, nom: 'Yanis', couleur: 'bg-emerald-500' },
    { id: 5, nom: 'Mia', couleur: 'bg-amber-500' },
    { id: 6, nom: 'Eli', couleur: 'bg-blue-500' },
  ]

  return (
    <section className="relative py-20">
      <div className="absolute inset-0 -z-10 opacity-60 [mask-image:radial-gradient(60%_60%_at_50%_50%,black,transparent)]">
        <div className="mx-auto max-w-6xl h-[420px] rounded-full bg-[radial-gradient(circle_at_50%_50%,rgba(165,180,252,0.15),transparent_60%)]" />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h3 className="text-3xl sm:text-4xl font-black text-gray-900 dark:text-white mb-8">Anneau de Communauté</h3>
        <p className="text-gray-700 dark:text-gray-300 mb-10">Des membres en orbite autour d'un même objectif.</p>
        <div className="relative mx-auto w-[360px] sm:w-[440px] h-[360px] sm:h-[440px]">
          <div className="absolute inset-0 rounded-full border border-gray-200 dark:border-white/10 animate-[spin_18s_linear_infinite]" />
          <div className="absolute inset-8 rounded-full border border-gray-200/70 dark:border-white/10 animate-[spin_12s_linear_infinite_reverse]" />
          {membres.map((m, i) => (
            <div
              key={m.id}
              className={`absolute w-12 h-12 sm:w-14 sm:h-14 ${m.couleur} rounded-full ring-4 ring-white/70 dark:ring-white/10 text-white flex items-center justify-center font-bold shadow-lg`}
              style={{
                top: '50%',
                left: '50%',
                transform: `rotate(${(360 / membres.length) * i}deg) translate(${i % 2 === 0 ? 150 : 115}px) rotate(-${(360 / membres.length) * i}deg)`
              }}
              aria-label={`Membre ${m.nom}`}
            >
              {m.nom[0]}
            </div>
          ))}
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-28 h-28 sm:w-32 sm:h-32 rounded-3xl bg-gradient-to-br from-cyan-500 to-purple-600 text-white font-black flex items-center justify-center shadow-2xl animate-pulse">
            VIBE
          </div>
        </div>
        <div className="mt-8 flex justify-center gap-4">
          <Link href="/forum">
            <Button variant="outline" className="border-cyan-300 text-cyan-700 dark:border-cyan-600 dark:text-cyan-300">Rejoindre le forum</Button>
          </Link>
          <Link href="/auth/register">
            <Button className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700">Entrer dans l'anneau</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
