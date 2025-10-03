'use client'

import { useState } from 'react'

export function ForgeBadge() {
  const [items, setItems] = useState(['<h1>', 'Bonjour', '</h1>'])
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [minted, setMinted] = useState(false)
  const correct = ['<h1>', 'Bonjour', '</h1>']
  
  const onDrop = (to: number) => {
    if (dragIndex === null) return
    const next = [...items]
    const [moved] = next.splice(dragIndex, 1)
    if (moved) {
      next.splice(to, 0, moved)
      setItems(next)
      setDragIndex(null)
      if (JSON.stringify(next) === JSON.stringify(correct)) setMinted(true)
    }
  }
  
  return (
    <section className="relative mx-auto max-w-5xl px-4 mb-16">
      <div className="rounded-3xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-black/30 backdrop-blur-xl p-6 sm:p-10">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">Forge ton 1er badge</h3>
          {minted && <span className="text-xs sm:text-sm text-emerald-600 dark:text-emerald-300 font-semibold">Minté ✓</span>}
        </div>
        <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">Glisse les blocs pour former un titre HTML valide.</p>
        <div className="flex flex-wrap gap-3">
          {items.map((it, i) => (
            <div
              key={i}
              draggable
              onDragStart={() => setDragIndex(i)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => onDrop(i)}
              className="select-none cursor-move rounded-xl px-4 py-2 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 border border-cyan-400/30 dark:border-white/10 text-gray-900 dark:text-white"
              aria-label={`Bloc ${it}`}
            >
              {it}
            </div>
          ))}
        </div>
        <div className="mt-6">
          <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-sm border ${minted ? 'border-emerald-400 text-emerald-700 dark:text-emerald-300' : 'border-gray-300 text-gray-700 dark:text-gray-300'}`}>
            {minted ? 'Badge "Initiation HTML" obtenu' : 'Ordre correct: ouverture • texte • fermeture'}
          </div>
        </div>
      </div>
    </section>
  )
}
