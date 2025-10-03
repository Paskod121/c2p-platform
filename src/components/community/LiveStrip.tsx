'use client'

import { useEffect, useRef, useState } from 'react'
import { ArrowRight, MessageSquare, PlayCircle, Award } from 'lucide-react'

type TypeEvenement = 'forum' | 'replay' | 'badge'

interface EvenementFlux {
  type: TypeEvenement
  id: string
  titre?: string
  auteur?: string
  categorie?: string
  technologie?: string
  badge?: string
  membre?: string
  rarete?: string
  date: string
}

// Composant d'affichage minimal d'un élément de flux
function ElementFlux({ e }: { e: EvenementFlux }) {
  const icone = e.type === 'forum' ? <MessageSquare className="h-4 w-4" />
    : e.type === 'replay' ? <PlayCircle className="h-4 w-4" />
    : <Award className="h-4 w-4" />

  return (
    <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-800/60 border border-gray-200 dark:border-gray-700 shadow-sm">
      <span className="text-purple-600 dark:text-purple-400">{icone}</span>
      {e.type === 'forum' && (
        <span className="text-sm text-gray-800 dark:text-gray-200 truncate">
          <strong>{e.auteur}</strong> a créé « {e.titre} » <span className="text-gray-500">· {e.categorie}</span>
        </span>
      )}
      {e.type === 'replay' && (
        <span className="text-sm text-gray-800 dark:text-gray-200 truncate">
          Nouveau replay « {e.titre} » <span className="text-gray-500">· {e.technologie}</span>
        </span>
      )}
      {e.type === 'badge' && (
        <span className="text-sm text-gray-800 dark:text-gray-200 truncate">
          <strong>{e.membre}</strong> a obtenu « {e.badge} » <span className="text-gray-500">· {e.rarete}</span>
        </span>
      )}
    </div>
  )
}

// Barre "Communauté en direct" pour la home
export function LiveStrip() {
  const [flux, setFlux] = useState<EvenementFlux[]>([])
  const [chargement, setChargement] = useState<boolean>(true)
  // Barre de progression de scroll horizontale
  const conteneurRef = useRef<HTMLDivElement | null>(null)
  const [progression, setProgression] = useState<number>(0)
  const [afficherBarre, setAfficherBarre] = useState<boolean>(false)
  const temporisationRef = useRef<number | null>(null)

  useEffect(() => {
    let actif = true
    async function chargerFlux() {
      try {
        const res = await fetch('/api/community/stream')
        if (!res.ok) throw new Error('Chargement du flux échoué')
        const json = await res.json()
        if (actif) setFlux(json.flux ?? [])
      } catch (e) {
        // Fallback simple en cas d'erreur
        if (actif) setFlux([
          { type: 'forum', id: 'f1', titre: 'Déploiement Next.js 15', auteur: 'Paskod', categorie: 'React', date: new Date().toISOString() },
          { type: 'replay', id: 'r1', titre: 'CI/CD GitHub Actions', technologie: 'DevOps', date: new Date().toISOString() },
          { type: 'badge', id: 'b1', badge: 'React Master', membre: 'Sarah', rarete: 'RARE', date: new Date().toISOString() },
        ])
      } finally {
        if (actif) setChargement(false)
      }
    }
    chargerFlux()
    // Option: rafraîchissement périodique
    const id = setInterval(chargerFlux, 30000)
    return () => { actif = false; clearInterval(id) }
  }, [])

  // Mettre à jour la progression à l'initialisation
  useEffect(() => {
    const el = conteneurRef.current
    if (!el) return
    const maj = () => {
      const total = el.scrollWidth - el.clientWidth
      const pct = total > 0 ? (el.scrollLeft / total) * 100 : 0
      setProgression(pct)
    }
    maj()
    return () => {
      if (temporisationRef.current) window.clearTimeout(temporisationRef.current)
    }
  }, [])

  // Gestion du scroll: afficher la barre et la cacher après 5s d'inactivité
  const gererScroll = () => {
    const el = conteneurRef.current
    if (!el) return
    const total = el.scrollWidth - el.clientWidth
    const pct = total > 0 ? (el.scrollLeft / total) * 100 : 0
    setProgression(pct)
    setAfficherBarre(true)
    if (temporisationRef.current) window.clearTimeout(temporisationRef.current)
    temporisationRef.current = window.setTimeout(() => setAfficherBarre(false), 5000)
  }

  if (chargement && flux.length === 0) {
    return (
      <div className="w-full py-3 border-y border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-sm text-gray-600 dark:text-gray-300">
          Chargement de l'activité de la communauté...
        </div>
      </div>
    )
  }

  return (
    <div className="w-full py-3 border-y border-gray-200 dark:border-gray-700 bg-white/50 dark:bg-gray-900/50 relative">
      <div
        ref={conteneurRef}
        onScroll={gererScroll}
        className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center gap-3 overflow-x-auto c2p-no-scrollbar"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-purple-700 dark:text-purple-300 whitespace-nowrap">
          Communauté en direct
        </span>
        <ArrowRight className="h-4 w-4 text-gray-400" />
        <div className="flex items-center gap-3">
          {flux.map((e) => (
            <ElementFlux key={`${e.type}-${e.id}`} e={e} />
          ))}
        </div>
      </div>
      {/* Barre de progression de scroll (auto-masquée après 5s) */}
      <div className={`absolute left-0 right-0 bottom-0 h-1 bg-transparent pointer-events-none`}>
        <div
          className={`h-full bg-purple-600/70 dark:bg-purple-400/70 rounded-full transition-opacity duration-500`}
          style={{ width: `${progression}%`, opacity: afficherBarre ? 1 : 0 }}
        />
      </div>
      <style jsx>{`
        .c2p-no-scrollbar { scrollbar-width: none; -ms-overflow-style: none; }
        .c2p-no-scrollbar::-webkit-scrollbar { display: none; }
      `}</style>
    </div>
  )
}


