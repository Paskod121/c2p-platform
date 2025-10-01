'use client'

import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'
import { 
  BookOpen, 
  Flame,
  Crown,
  Brain,
  Rocket,
  Shield,
  Sword,
  ArrowRight,
  Github,
  Linkedin,
  Mail
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LiveStrip } from '@/components/community/LiveStrip'

// Capsule d’Initiation interactive (micro onboarding + quiz éclair)
function CapsuleInitiation() {
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
            <h3 className="text-2xl sm:text-3xl font-black text-gray-900 dark:text-white">Capsule d’Initiation</h3>
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
                  <div className="text-xs text-gray-600 dark:text-gray-300 mt-1">On t’oriente en 3 clics</div>
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
              <div className="text-gray-900 dark:text-white font-semibold">Quiz éclair: Quel langage structure le contenu d’une page web ?</div>
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
                {score ? 'Yes — bien vu !' : 'Pas grave — on va t’accompagner.'}
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

// Anneau de Communauté (avatars en orbite, pulsation douce)
function AnneauCommunaute() {
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
        <p className="text-gray-700 dark:text-gray-300 mb-10">Des membres en orbite autour d’un même objectif.</p>
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
            <Button className="bg-gradient-to-r from-cyan-600 to-purple-600 hover:from-cyan-700 hover:to-purple-700">Entrer dans l’anneau</Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

// Pulse d’activité discret (fond réactif aux événements simulés)
function PulseActivite() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf = 0
    const pulses: Array<{ x: number; y: number; r: number; a: number; hue: number }> = []
    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    const spawn = () => {
      pulses.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: 0,
        a: 0.35,
        hue: 240 + Math.random() * 60
      })
    }
    const tick = () => {
      if (!ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      pulses.forEach((p, i) => {
        p.r += 0.8
        p.a *= 0.985
        if (p.a < 0.02) pulses.splice(i, 1)
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.strokeStyle = `hsla(${p.hue},70%,60%,${p.a})`
        ctx.lineWidth = 1
        ctx.stroke()
      })
      if (Math.random() < 0.06) spawn()
      raf = requestAnimationFrame(tick)
    }
    window.addEventListener('resize', resize)
    tick()
    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(raf)
    }
  }, [])
  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[1] opacity-20 dark:opacity-15" />
}

// Sandbox HTML/CSS live (inline, ultra-light)
function SandboxLive() {
  const [html, setHtml] = useState('<h1>Salut</h1>\n<p>Édite et vois le rendu.</p>')
  const [css, setCss] = useState('h1{color:#8b5cf6;font-family:system-ui;} p{color:#374151;}')
  const htmlAreaRef = useRef<HTMLTextAreaElement>(null)
  const [goal] = useState({
    title: 'Ajouter un <h2> personnalisé et le colorer en violet',
    check: (doc: string, styles?: string) => {
      const hasH2 = /<h2[^>]*>\s*[^<]+\s*<\/h2>/i.test(doc)
      const hasColor = /h2\s*\{[^}]*color\s*:\s*(#8b5cf6|rgb\(\s*139\s*,\s*92\s*,\s*246\s*\)|purple)/i.test(styles ?? '')
      return hasH2 && hasColor
    }
  })
  const [isGoalMet, setIsGoalMet] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [focusMode, setFocusMode] = useState(false)
  const preRef = useRef<HTMLPreElement>(null)
  const [currentTag, setCurrentTag] = useState<string | null>(null)

  const computeCurrentTag = (text: string, caret: number): string | null => {
    if (caret < 0 || caret > text.length) return null
    const start = text.lastIndexOf('<', caret)
    const end = text.indexOf('>', caret)
    if (start === -1 || end === -1 || end < start) return null
    const fragment = text.slice(start + 1, end).trim()
    if (!fragment || fragment.startsWith('!') || fragment.startsWith('?')) return null
    const name = fragment.replace(/^\/?/, '').match(/^([a-zA-Z0-9-]+)/)?.[1]
    return name || null
  }

  const highlightHtml = (code: string, activeTag?: string | null): string => {
    let out = code
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
    // strings
    out = out.replace(/(&quot;.*?&quot;|'.*?')/g, '<span class="text-rose-600 dark:text-rose-400">$1<\/span>')
    // attributes
    out = out.replace(/(\s)([a-zA-Z-:]+)(=)/g, '$1<span class="text-amber-600 dark:text-amber-300">$2<\/span>$3')
    // tags
    out = out.replace(/(&lt;\/?)([a-zA-Z0-9-]+)([^&]*?)(\/?&gt;)/g, (_m, p1, p2, p3, p4) => {
      const tagName = String(p2)
      const isActive = activeTag && tagName.toLowerCase() === activeTag.toLowerCase()
      const tagClass = isActive ? 'text-purple-600 dark:text-purple-300' : 'text-purple-600 dark:text-purple-400'
      return `<span class=\"text-cyan-600 dark:text-cyan-400\">${p1}</span><span class=\"${tagClass}\">${tagName}</span><span>${p3}</span><span class=\"text-cyan-600 dark:text-cyan-400\">${p4}</span>`
    })
    return out
  }

  const onHtmlKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === '>' && htmlAreaRef.current) {
      const el = htmlAreaRef.current
      const { selectionStart, selectionEnd } = el
      const before = html.slice(0, selectionStart)
      const after = html.slice(selectionEnd)
      const m = before.match(/<([a-zA-Z0-9-]+)([^>]*)>$/)
      if (m && !/\/$/.test(m[0]) && !/^<\//.test(m[0])) {
        const tag = m[1]
        const insertion = '></' + tag + '>'
        const next = before + insertion + after
        setHtml(next)
        requestAnimationFrame(() => {
          if (htmlAreaRef.current) {
            const pos = selectionStart + 1 // caret between > and </tag>
            htmlAreaRef.current.selectionStart = pos
            htmlAreaRef.current.selectionEnd = pos
          }
        })
      }
    }
    // Auto-indentation & Tab intelligente
    if (e.key === 'Enter' && htmlAreaRef.current) {
      const el = htmlAreaRef.current
      const { selectionStart, selectionEnd } = el
      const before = html.slice(0, selectionStart)
      const after = html.slice(selectionEnd)
      const prevIsClose = />$/.test(before)
      const nextHasClosing = /^\s*<\//.test(after)
      const shouldSmartIndent = prevIsClose && nextHasClosing
      if (!shouldSmartIndent) {
        // Laisser le comportement natif (nouvelle ligne simple)
        return
      }
      e.preventDefault()
      const lineStart = before.lastIndexOf('\n') + 1
      const currentIndent = before.slice(lineStart).match(/^\s*/)?.[0] ?? ''
      const inserted = `\n${currentIndent}  `
      const closingPad = `\n${currentIndent}`
      const next = before + inserted + closingPad + after
      setHtml(next)
      requestAnimationFrame(() => {
        if (htmlAreaRef.current) {
          const pos = selectionStart + inserted.length
          htmlAreaRef.current.selectionStart = pos
          htmlAreaRef.current.selectionEnd = pos
          syncScroll()
        }
      })
    }
    if (e.key === 'Tab' && htmlAreaRef.current) {
      e.preventDefault()
      const el = htmlAreaRef.current
      const { selectionStart, selectionEnd } = el
      const before = html.slice(0, selectionStart)
      const after = html.slice(selectionEnd)
      const next = before + '  ' + after
      setHtml(next)
      requestAnimationFrame(() => {
        if (htmlAreaRef.current) {
          const pos = selectionStart + 2
          htmlAreaRef.current.selectionStart = pos
          htmlAreaRef.current.selectionEnd = pos
        }
      })
    }
  }

  function similarityToGoal(doc: string, styles?: string): number {
    const hasH2 = /<h2/i.test(doc)
    const hasColor = /h2\s*\{[^}]*color/i.test(styles ?? '')
    if (hasH2 && hasColor) return 100
    if (hasH2 || hasColor) return 50
    return 10
  }

  function formatHtml(doc: string): string {
    try {
      const tokens = doc.replace(/\r/g, '').split(/\n/)
      let indent = 0
      const out = tokens.map(l => {
        const trimmed = l.trim()
        if (/^<\//.test(trimmed)) indent = Math.max(0, indent - 1)
        const line = '  '.repeat(indent) + trimmed
        if (/^<[^!/?][^>]*>$/.test(trimmed) && !/\/\s*>$/.test(trimmed) && !/<(area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)[\s/>]/i.test(trimmed)) {
          if (!/^<.*<\//.test(trimmed)) indent += 1
        }
        return line
      })
      return out.join('\n')
    } catch {
      return doc
    }
  }
  const updateCaretTag = () => {
    if (!htmlAreaRef.current) return
    const pos = htmlAreaRef.current.selectionStart
    setCurrentTag(computeCurrentTag(html, pos))
  }

  const srcDoc = `<!doctype html><html><head><style>${css}</style></head><body>${html}</body></html>`

  const syncScroll = () => {
    const ta = htmlAreaRef.current
    const pre = preRef.current
    if (ta && pre) {
      pre.scrollTop = ta.scrollTop
      pre.scrollLeft = ta.scrollLeft
    }
  }

  useEffect(() => {
    // Assurer la synchro lors des changements de contenu/Select All
    syncScroll()
  }, [html])

  return (
    <section className="relative mx-auto max-w-6xl px-4 mb-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="rounded-2xl border border-gray-200 dark:border-white/10 bg-white/80 dark:bg-white/5 backdrop-blur-xl p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="text-sm font-semibold text-gray-700 dark:text-gray-200">HTML</div>
            <div className="flex items-center gap-2">
              <button onClick={() => setFocusMode(v => !v)} className="text-xs px-2 py-1 rounded-md border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5">{focusMode ? 'Afficher aperçu' : 'Mode focus'}</button>
              <button onClick={() => setHtml(formatHtml(html))} className="text-xs px-2 py-1 rounded-md border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5">Auto‑format</button>
            </div>
          </div>
          <div className="mb-3 rounded-xl bg-gray-50/60 dark:bg-white/5 border border-gray-200 dark:border-white/10 p-3">
            <div className="text-xs font-semibold text-gray-800 dark:text-gray-200">Objectif</div>
            <div className="flex items-center justify-between mt-1">
              <div className="text-xs text-gray-700 dark:text-gray-300">{goal.title}</div>
              <div className="flex items-center gap-2">
                <div className="w-28 h-1.5 rounded-full bg-gray-200 dark:bg-white/10 overflow-hidden"><div className="h-full bg-gradient-to-r from-cyan-500 to-purple-600" style={{ width: `${progress}%` }} /></div>
                <span className={`text-xs ${isGoalMet ? 'text-emerald-600 dark:text-emerald-300' : 'text-gray-500 dark:text-gray-400'}`}>{isGoalMet ? '100%' : `${progress}%`}</span>
              </div>
            </div>
          </div>
          {showConfetti && <div aria-hidden className="pointer-events-none absolute -mt-2 right-4 text-2xl">🎉</div>}
          <div className="relative">
            <pre ref={preRef} aria-hidden className="hidden">
              <code />
            </pre>
            <textarea
              ref={htmlAreaRef}
              aria-label="Éditeur HTML"
              value={html}
              onChange={(e) => { const v = e.target.value; setHtml(v); const ok = goal.check(v, css); setIsGoalMet(ok); setProgress(ok ? 100 : similarityToGoal(v, css)); if (ok) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 1200) } }}
              onKeyDown={onHtmlKeyDown}
              onScroll={undefined as any}
              onFocus={undefined as any}
              onSelect={undefined as any}
              spellCheck={false}
              wrap="off"
              className="relative w-full h-40 rounded-xl bg-white/70 dark:bg-black/30 border border-gray-200 dark:border-white/10 px-3 py-3 text-sm leading-6 text-gray-900 dark:text-white caret-cyan-500 selection:bg-cyan-200/40 dark:selection:bg-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono resize-none"
              style={{ whiteSpace: 'pre', tabSize: 2 as any }}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { label: 'Insérer <h1>', insert: '<h1>Salut</h1>' },
              { label: 'Ajouter <p>', insert: '<p>Paragraphe</p>' },
              { label: 'Image + légende', insert: '<figure>\n  <img src="/window.svg" alt="Exemple"/>\n  <figcaption>Légende</figcaption>\n</figure>' },
            ].map((h) => (
              <button key={h.label} onClick={() => setHtml(prev => (prev ? prev + '\n' + h.insert : h.insert))} className="text-xs px-2 py-1 rounded-md border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5">
                {h.label}
              </button>
            ))}
          </div>
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-4 mb-2">CSS</div>
          <textarea
            aria-label="Éditeur CSS"
            value={css}
            onChange={(e) => { const s = e.target.value; setCss(s); const ok = goal.check(html, s); setIsGoalMet(ok); setProgress(ok ? 100 : similarityToGoal(html, s)); if (ok) { setShowConfetti(true); setTimeout(() => setShowConfetti(false), 1200) } }}
            spellCheck={false}
            className="w-full h-32 rounded-xl bg-white/70 dark:bg-black/30 border border-gray-200 dark:border-white/10 p-3 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-purple-400"
          />
        </div>
        <div className={`rounded-2xl border border-gray-200 dark:border-white/10 bg-white dark:bg-black overflow-hidden ${focusMode ? 'opacity-30 pointer-events-none' : ''}`}>
          <iframe title="Aperçu" className="w-full h-[28rem] bg-white dark:bg-black" srcDoc={srcDoc} />
        </div>
      </div>
    </section>
  )
}

// Forge de Badge (mini-challenge drag & drop)
function ForgeBadge() {
  const [items, setItems] = useState(['<h1>', 'Bonjour', '</h1>'])
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [minted, setMinted] = useState(false)
  const correct = ['<h1>', 'Bonjour', '</h1>']
  const onDrop = (to: number) => {
    if (dragIndex === null) return
    const next = [...items]
    const [moved] = next.splice(dragIndex, 1)
    next.splice(to, 0, moved)
    setItems(next)
    setDragIndex(null)
    if (JSON.stringify(next) === JSON.stringify(correct)) setMinted(true)
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

// Composant Canvas Interactif avec Particules
function CanvasInteractif() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 })
  const particlesRef = useRef<Array<{
    x: number
    y: number
    vx: number
    vy: number
    size: number
    opacity: number
    color: string
  }>>([])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)

    // Initialiser les particules (densité/opa adaptées au viewport)
    const initParticles = () => {
      particlesRef.current = []
      const total = window.innerWidth < 640 ? 30 : 60
      for (let i = 0; i < total; i++) {
        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          size: Math.random() * 2 + 1,
          opacity: Math.random() * 0.3 + 0.1,
          color: `hsl(${Math.random() * 60 + 240}, 70%, 60%)`
        })
      }
    }

    initParticles()

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particlesRef.current.forEach((particle, index) => {
        // Mise à jour position
        particle.x += particle.vx
        particle.y += particle.vy

        // Rebond sur les bords
        if (particle.x < 0 || particle.x > canvas.width) particle.vx *= -1
        if (particle.y < 0 || particle.y > canvas.height) particle.vy *= -1

        // Attraction vers la souris
        const dx = mousePos.x - particle.x
        const dy = mousePos.y - particle.y
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance < 150) {
          const force = (150 - distance) / 150
          particle.vx += (dx / distance) * force * 0.01
          particle.vy += (dy / distance) * force * 0.01
        }

        // Dessiner la particule
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = particle.color
        ctx.globalAlpha = particle.opacity
        ctx.fill()

        // Lignes de connexion
        particlesRef.current.slice(index + 1).forEach(otherParticle => {
          const dx = particle.x - otherParticle.x
          const dy = particle.y - otherParticle.y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 100) {
            ctx.beginPath()
            ctx.moveTo(particle.x, particle.y)
            ctx.lineTo(otherParticle.x, otherParticle.y)
            ctx.strokeStyle = particle.color
            ctx.globalAlpha = (100 - distance) / 100 * 0.2
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener('resize', resizeCanvas)
    }
  }, [mousePos])

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect()
    if (rect) {
      setMousePos({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      })
    }
  }

  return (
    <canvas
      ref={canvasRef}
      onMouseMove={handleMouseMove}
      className="absolute inset-0 w-full h-full pointer-events-none opacity-20 dark:opacity-15 z-0"
    />
  )
}

// Composant Typographie Dynamique
function TypographieDynamique() {
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
  }, [])

  return (
    <span className={`inline-block transition-all duration-300 ${visible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}>
      {mots[motActuel]}
    </span>
  )
}

// Composant CTA Hologramme
function CTAHologramme({ children, href, className = "" }: { children: React.ReactNode, href: string, className?: string }) {
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

export default function Home() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-300 overflow-hidden">
      <CanvasInteractif />
      <PulseActivite />
      {/* Header */}
      <header className="relative z-10 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                C2P Platform
              </span>
            </div>
            
            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center space-x-4">
              <Link href="/dashboard">
                <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                  Dashboard
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                  Cours
                </Button>
              </Link>
              <Link href="/forum">
                <Button variant="ghost" className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400">
                  Forum
                </Button>
              </Link>
              <ThemeToggle />
              <Link href="/auth/login">
                <Button variant="outline" className="border-purple-300 text-purple-600 dark:border-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                  Se connecter
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Commencer
                </Button>
              </Link>
            </div>

            {/* Navigation Mobile */}
            <div className="flex md:hidden items-center space-x-2">
              <ThemeToggle />
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="border-purple-300 text-purple-600 dark:border-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                  Connexion
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Start
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section Révolutionnaire */}
      <main className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-6xl mx-auto">
            {/* Titre Principal avec Typographie Dynamique */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-4">
              Devenez un{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  <TypographieDynamique />
              </span>
            </h1>
              <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
                <div className="h-1 w-12 sm:w-20 bg-gradient-to-r from-cyan-400 to-purple-400"></div>
                <span className="text-purple-600 dark:text-purple-400 font-semibold text-base sm:text-lg animate-pulse">
                  DÉVELOPPEUR
                </span>
                <div className="h-1 w-12 sm:w-20 bg-gradient-to-r from-purple-400 to-pink-400"></div>
              </div>
            </div>

            {/* Sous-titre avec Effet de Révélation */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-4xl mx-auto px-4">
              Rejoignez la <span className="text-cyan-600 dark:text-cyan-400 font-bold">révolution du code</span> où chaque ligne 
              forge ton <span className="text-purple-600 dark:text-purple-400 font-bold">destin numérique</span>. 
              Ici, on ne suit pas de cours, on <span className="text-pink-600 dark:text-pink-400 font-bold">conquiert l\'avenir</span>.
            </p>

            {/* LiveStrip compact */}
            <div className="mx-auto max-w-5xl mb-8 sm:mb-10 px-4">
              <LiveStrip />
            </div>

          {/* Capsule d’Initiation interactive */}
          <CapsuleInitiation />

          {/* Sandbox live */}
          <SandboxLive />
            
            {/* CTA Hologrammes Révolutionnaires */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-14 px-4">
              <CTAHologramme href="/auth/register" className="flex-1 max-w-md">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <Flame className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-500 dark:text-cyan-400 mr-2 sm:mr-3 animate-pulse" />
                    <span className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">REJOINDRE</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-cyan-700 dark:text-cyan-300">LA RÉVOLUTION</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-purple-200 mt-2">Commence ton aventure maintenant</div>
                </div>
              </CTAHologramme>
              
              <CTAHologramme href="/courses" className="flex-1 max-w-md">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 dark:text-purple-400 mr-2 sm:mr-3" />
                    <span className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">EXPLORER</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-purple-700 dark:text-purple-300">LES DÉFIS</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-cyan-200 mt-2">Découvre ton potentiel</div>
                </div>
              </CTAHologramme>
            </div>

            {/* Stats Révolutionnaires avec Animations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500 hover:-translate-y-2">
                <div className="text-5xl font-black text-cyan-600 dark:text-cyan-400 mb-3 group-hover:scale-110 transition-transform">∞</div>
                <div className="text-gray-800 dark:text-gray-200 font-bold text-lg">DÉFIS INFINIS</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-2">Chaque jour, de nouveaux défis apparaissent</div>
              </div>
              <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-400/20 hover:border-purple-400/40 transition-all duration-500 hover:-translate-y-2">
                <div className="text-5xl font-black text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition-transform">⚡</div>
                <div className="text-gray-800 dark:text-gray-200 font-bold text-lg">COMMUNAUTÉ ACTIVE</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-2">Une communauté qui ne dort jamais</div>
              </div>
              <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-pink-500/10 to-cyan-500/10 backdrop-blur-xl border border-pink-400/20 hover:border-pink-400/40 transition-all duration-500 hover:-translate-y-2">
                <div className="text-5xl font-black text-pink-600 dark:text-pink-400 mb-3 group-hover:scale-110 transition-transform">🏆</div>
                <div className="text-gray-800 dark:text-gray-200 font-bold text-lg">MAÎTRISE TOTALE</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-2">De novice à légende du code</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Révolutionnaire "Pouvoirs du Code" */}
        <section className="py-24 bg-gradient-to-b from-white via-purple-50/50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.1)_1px,transparent_1px)] [background-size:60px_60px] opacity-40"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6">
                POUVOIRS DU CODE
              </h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Découvre les <span className="text-cyan-600 dark:text-cyan-400 font-bold">forces cachées</span> qui feront de toi un 
                <span className="text-purple-600 dark:text-purple-400 font-bold"> guerrier du code</span> légendaire
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icone: <Sword className="h-16 w-16 text-cyan-500" />,
                  titre: "L\'Art de la Guerre",
                  description: "Défis tactiques qui forgent ton esprit de stratège. Chaque victoire te rapproche de la maîtrise absolue.",
                  couleur: "from-cyan-500/20 to-blue-500/20",
                  bordure: "border-cyan-400/30",
                  hover: "hover:border-cyan-400/60"
                },
                {
                  icone: <Brain className="h-16 w-16 text-purple-500" />,
                  titre: "L\'Intelligence Collective",
                  description: "La communauté devient ton cerveau étendu. Chaque membre apporte sa sagesse à ta quête.",
                  couleur: "from-purple-500/20 to-pink-500/20",
                  bordure: "border-purple-400/30",
                  hover: "hover:border-purple-400/60"
                },
                {
                  icone: <Crown className="h-16 w-16 text-yellow-500" />,
                  titre: "La Couronne du Maître",
                  description: "Badges légendaires qui témoignent de tes exploits. Chaque récompense raconte ton histoire.",
                  couleur: "from-yellow-500/20 to-orange-500/20",
                  bordure: "border-yellow-400/30",
                  hover: "hover:border-yellow-400/60"
                },
                {
                  icone: <Rocket className="h-16 w-16 text-pink-500" />,
                  titre: "L\'Évolution Continue",
                  description: "Projets qui défient les limites. Chaque création te propulse vers de nouveaux horizons.",
                  couleur: "from-pink-500/20 to-red-500/20",
                  bordure: "border-pink-400/30",
                  hover: "hover:border-pink-400/60"
                },
                {
                  icone: <Shield className="h-16 w-16 text-green-500" />,
                  titre: "La Protection Mentale",
                  description: "Mentorat et entraide qui renforcent ton armure. Aucun obstacle ne résiste à la solidarité.",
                  couleur: "from-green-500/20 to-emerald-500/20",
                  bordure: "border-green-400/30",
                  hover: "hover:border-green-400/60"
                },
                {
                  icone: <Flame className="h-16 w-16 text-red-500" />,
                  titre: "La Passion Éternelle",
                  description: "Interface qui s'adapte à ton rythme. Chaque interaction alimente ta flamme intérieure.",
                  couleur: "from-red-500/20 to-pink-500/20",
                  bordure: "border-red-400/30",
                  hover: "hover:border-red-400/60"
                }
              ].map((pouvoir, index) => (
                <div
                  key={pouvoir.titre}
                  className={`group text-center p-8 rounded-3xl bg-gradient-to-br ${pouvoir.couleur} backdrop-blur-xl border ${pouvoir.bordure} ${pouvoir.hover} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/25`}
                >
                  <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {pouvoir.icone}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {pouvoir.titre}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {pouvoir.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Anneau de Communauté */}
        <AnneauCommunaute />

        {/* Forge de Badge */}
        <ForgeBadge />

        {/* CTA Final Révolutionnaire */}
        <section className="py-24 bg-gradient-to-br from-white via-purple-50 to-white dark:from-black dark:via-purple-900 dark:to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-purple-700 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 mb-8">
              TON DESTIN T\'ATTEND
            </h2>
            <p className="text-2xl text-gray-700 dark:text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              La <span className="text-cyan-700 dark:text-cyan-300 font-bold">révolution du code</span> t\'ouvre ses portes. 
              Choisis ton <span className="text-pink-700 dark:text-pink-300 font-bold">chemin de légende</span> et 
              <span className="text-yellow-700 dark:text-yellow-300 font-bold"> deviens immortel</span> dans l\'univers du code.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <CTAHologramme href="/auth/register" className="max-w-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Crown className="h-10 w-10 text-yellow-500 dark:text-yellow-400 mr-4 animate-spin" />
                    <span className="text-3xl font-black text-gray-900 dark:text-white">DEVENIR</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">LÉGENDAIRE</div>
                  <div className="text-sm text-cyan-700 dark:text-cyan-200 mt-2">Rejoins la révolution maintenant</div>
                </div>
              </CTAHologramme>
            </div>
            <div className="mt-16 text-purple-700 dark:text-purple-300 text-lg">
              <p>💧 <span className="font-bold">Rejoins 10,000+ révolutionnaires du code</span> qui ont déjà choisi leur destin</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Neo-Flux */}
      <footer className="relative overflow-hidden border-t border-gray-200/70 dark:border-purple-500/20 py-16 sm:py-20">
        {/* Fond neural discret */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-purple-50 dark:from-black dark:via-gray-950 dark:to-purple-950" />
        <div className="absolute inset-0 opacity-[0.25] pointer-events-none bg-[radial-gradient(600px_200px_at_20%_0%,rgba(34,211,238,0.15),transparent_60%),radial-gradient(600px_200px_at_80%_0%,rgba(168,85,247,0.15),transparent_60%),radial-gradient(1000px_300px_at_50%_120%,rgba(236,72,153,0.12),transparent_60%)]" />
        {/* Aurora animée */}
        <div className="pointer-events-none absolute -inset-x-20 -bottom-10 h-[240px] [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent_70%)]">
          <div className="aurora" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bandeau marque */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <div className="text-left">
                <span className="text-2xl font-black bg-gradient-to-r from-cyan-600 via-purple-700 to-pink-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400">
                  C2P REVOLUTION
                </span>
                <div className="text-xs text-purple-700 dark:text-purple-300 font-medium">GUERRIERS DU CODE</div>
              </div>
            </div>
            <p className="text-gray-700 dark:text-purple-100 mb-10 max-w-3xl leading-relaxed">
              L\'endroit où les <span className="text-cyan-700 dark:text-cyan-300 font-semibold">révolutionnaires du code</span> forgent leur légende. 
              Rejoins la <span className="text-pink-700 dark:text-pink-300 font-semibold">guilde des immortels</span>.
            </p>
          </div>
          {/* Grille de navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 text-sm">
            <div className="col-span-2 lg:col-span-2">
              <h4 className="text-gray-900 dark:text-white font-semibold mb-3">Plateforme</h4>
              <ul className="space-y-2 text-gray-600 dark:text-purple-200">
                <li><Link href="/" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">La Révolution</Link></li>
                <li><Link href="/courses" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">Défis</Link></li>
                <li><Link href="/forum" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">Communauté</Link></li>
                <li><Link href="/mentorat" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">Mentorat</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-3">Ressources</h4>
              <ul className="space-y-2 text-gray-600 dark:text-purple-200">
                <li><a className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors" href="#">Guides</a></li>
                <li><a className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors" href="#">Replays</a></li>
                <li><a className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors" href="#">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-3">Légal</h4>
              <ul className="space-y-2 text-gray-600 dark:text-purple-200">
                <li><a className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors" href="#">Mentions</a></li>
                <li><a className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors" href="#">Confidentialité</a></li>
                <li><a className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors" href="#">Conditions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-3">Réseaux</h4>
              <div className="flex items-center gap-3">
                <a aria-label="GitHub" href="#" className="group relative p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:-translate-y-0.5 transition-all bg-white/70 dark:bg-white/5 shadow-sm overflow-hidden">
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-cyan-400/20 via-transparent to-transparent" />
                  <Github className="h-5 w-5 text-gray-900 dark:text-white" />
                </a>
                <a aria-label="X" href="#" className="group relative p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:-translate-y-0.5 transition-all bg-white/70 dark:bg-white/5 shadow-sm overflow-hidden">
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-purple-400/20 via-transparent to-transparent" />
                  <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 fill-gray-900 dark:fill-white" xmlns="http://www.w3.org/2000/svg"><path d="M18.146 2H21l-7.5 8.58L22.5 22H15l-5.35-6.43L3.854 22H1l8.03-9.17L1.5 2H9l4.9 5.9L18.146 2Zm-2.63 18h1.66L7.13 4H5.47l10.046 16Z"/></svg>
                </a>
                <a aria-label="LinkedIn" href="#" className="group relative p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:-translate-y-0.5 transition-all bg-white/70 dark:bg-white/5 shadow-sm overflow-hidden">
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-blue-500/20 via-transparent to-transparent" />
                  <Linkedin className="h-5 w-5 text-blue-700" />
                </a>
                <a aria-label="Contact" href="#" className="group relative p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:-translate-y-0.5 transition-all bg-white/70 dark:bg-white/5 shadow-sm overflow-hidden">
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-pink-500/20 via-transparent to-transparent" />
                  <Mail className="h-5 w-5 text-purple-700 dark:text-purple-300" />
                </a>
              </div>
              </div>
            </div>
          {/* Bas de page */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-purple-300">
              © 2024 C2P Revolution — <span className="font-medium text-gray-800 dark:text-white">Maîtres du code</span>
            </p>
            <div className="text-xs text-gray-500 dark:text-purple-300">
              Fait avec <span className="text-pink-600">❤</span> et <span className="text-cyan-600">TypeScript</span>
            </div>
          </div>
        </div>
        <style jsx>{`
          .aurora {
            position: absolute;
            inset: 0;
            background: conic-gradient(from 180deg at 50% 50%, rgba(34,211,238,0.25), rgba(168,85,247,0.2), rgba(236,72,153,0.22), rgba(34,211,238,0.25));
            filter: blur(60px);
            animation: aurora-move 14s linear infinite;
            opacity: 0.7;
          }
          @keyframes aurora-move {
            0% { transform: translateX(-10%) rotate(0deg); }
            50% { transform: translateX(10%) rotate(180deg); }
            100% { transform: translateX(-10%) rotate(360deg); }
          }
          .bg-radial {
            background: radial-gradient(400px 200px at center, var(--tw-gradient-from), transparent 60%);
          }
        `}</style>
      </footer>
    </div>
  )
}
