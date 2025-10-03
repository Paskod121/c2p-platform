'use client'

import { useState, useEffect } from 'react'

export function TypographieDynamique() {
  const [motActuel, setMotActuel] = useState(0)
  const mots = ['EXPERT', 'INNOVATEUR', 'LÉGENDE', 'MAÎTRE', 'GÉNIE']
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(false)
      setTimeout(() => {
        setMotActuel((prev) => (prev + 1) % mots.length)
        setVisible(true)
      }, 300)
    }, 3000)

    return () => clearInterval(interval)
  }, [mots.length])

  return (
    <span className={`inline-block transition-all duration-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      {mots[motActuel]}
    </span>
  )
}
