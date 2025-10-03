'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export function CapsuleInitiation() {
  const [step, setStep] = useState<'niveau' | 'objectif' | 'quiz' | 'resultat'>('niveau')
  const [niveau, setNiveau] = useState<'debutant' | 'autodidacte' | 'reconversion' | null>(null)
  const [objectif, setObjectif] = useState<'job' | 'projet' | 'comprendre' | null>(null)
  const [reponse, setReponse] = useState<string>('')
  const [score, setScore] = useState<number | null>(null)

  const lancerQuiz = () => setStep('quiz')
  const terminer = () => {
    const ok = reponse.trim().toLowerCase() === 'html'
    setScore(ok ? 1 : 0)
    setStep('resultat')
  }

  return (
    <section className="relative mx-auto max-w-5xl mb-10 sm:mb-14 px-4">
      <div className="relative overflow-hidden rounded-3xl border border-gray-200/70 dark:border-white/10 bg-white/80 dark:bg-black/30 backdrop-blur-xl">
        <div className="absolute inset-0 pointer-events-none opacity-40 bg-[conic-gradient(from_120deg_at_50%_50%,#22d3ee33,#a855f733,#ec489933,#22d3ee33)] animate-[spin_10s_linear_infinite]" />
        <div className="relative z-10 p-6 sm:p-10">
          <div className="flex items-center justify-between gap-4 mb-6">
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">Capsule d'Initiation</h3>
            <span className="text-xs sm:text-sm text-cyan-700 dark:text-cyan-300 font-semibold">60 secondes</span>
          </div>

          {step === 'niveau' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'debutant', label: 'Débutant total' },
                { id: 'autodidacte', label: 'Auto-didacte bloqué' },
                { id: 'reconversion', label: 'Reconversion pro' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { setNiveau(opt.id as 'debutant' | 'autodidacte' | 'reconversion'); setStep('objectif') }}
                  className={`rounded-2xl border p-4 text-left transition-all ${niveau === opt.id ? 'border-cyan-400 bg-cyan-50 dark:bg-cyan-900/20' : 'border-gray-200 dark:border-white/10 hover:border-cyan-300'} text-gray-900 dark:text-white`}
                >
                  <span className="text-sm font-semibold">{opt.label}</span>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">On t'oriente en 3 clics</div>
                </button>
              ))}
            </div>
          )}

          {step === 'objectif' && (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {[
                { id: 'job', label: 'Trouver un job' },
                { id: 'projet', label: 'Construire un projet' },
                { id: 'comprendre', label: 'Comprendre les bases' },
              ].map(opt => (
                <button
                  key={opt.id}
                  onClick={() => { setObjectif(opt.id as 'job' | 'projet' | 'comprendre'); lancerQuiz() }}
                  className={`rounded-2xl border p-4 text-left transition-all ${objectif === opt.id ? 'border-purple-400 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-white/10 hover:border-purple-300'} text-gray-900 dark:text-white`}
                >
                  <span className="text-sm font-semibold">{opt.label}</span>
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">On te prépare un parcours</div>
                </button>
              ))}
            </div>
          )}

          {step === 'quiz' && (
            <div className="grid grid-cols-1 gap-4">
              <div className="text-gray-900 dark:text-white font-semibold">Quiz éclair: Quel langage structure le contenu d'une page web ?</div>
              <input
                aria-label="Réponse au quiz"
                value={reponse}
                onChange={(e) => setReponse(e.target.value)}
                placeholder="Tape ta réponse… (indice: 4 lettres)"
                className="rounded-xl px-4 py-3 bg-white/70 dark:bg-white/5 border border-gray-200 dark:border-white/10 text-gray-900 dark:text-white placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <div className="flex justify-end">
                <Button onClick={terminer} className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700">Valider</Button>
              </div>
            </div>
          )}

          {step === 'resultat' && (
            <div className="grid grid-cols-1 gap-4">
              <div className={`text-lg font-black ${score ? 'text-cyan-700 dark:text-cyan-300' : 'text-pink-700 dark:text-pink-300'}`}>
                {score ? 'Yes — bien vu !' : 'Pas grave — on va t\'accompagner.'}
              </div>
              <div className="text-sm text-gray-700 dark:text-gray-300">
                Parcours conseillé: <span className="font-semibold">HTML/CSS 7 jours</span> → <span className="font-semibold">JS 21 jours</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link href="/auth/register">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">Commencer maintenant</Button>
                </Link>
                <Link href="/courses">
                  <Button variant="outline" className="border-purple-300 text-purple-700 dark:border-purple-600 dark:text-purple-300">Explorer les parcours</Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
