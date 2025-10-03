'use client'

import { useState, useRef, useEffect } from 'react'
import { useEditor } from '@/hooks/useEditor'

export function SandboxLive() {
  const htmlAreaRef = useRef<HTMLTextAreaElement>(null)
  const preRef = useRef<HTMLPreElement>(null)
  const [currentTag, setCurrentTag] = useState<string | null>(null)
  
  const {
    html,
    css,
    isGoalMet,
    progress,
    showConfetti,
    focusMode,
    setHtml,
    setCss,
    setFocusMode,
    formatHtml,
    insertSnippet
  } = useEditor()

  const goal = {
    title: 'Ajouter un <h2> personnalisé et le colorer en violet',
    check: (doc: string, styles?: string) => {
      const hasH2 = /<h2[^>]*>\s*[^<]+\s*<\/h2>/i.test(doc)
      const hasColor = /h2\s*\{[^}]*color\s*:\s*(#8b5cf6|rgb\(\s*139\s*,\s*92\s*,\s*246\s*\)|purple)/i.test(styles ?? '')
      return hasH2 && hasColor
    }
  }

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

  const updateCaretTag = () => {
    if (!htmlAreaRef.current) return
    const pos = htmlAreaRef.current.selectionStart
    setCurrentTag(computeCurrentTag(html, pos))
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
              <button onClick={() => setFocusMode(!focusMode)} className="text-xs px-2 py-1 rounded-md border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5">{focusMode ? 'Afficher aperçu' : 'Mode focus'}</button>
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
              onChange={(e) => setHtml(e.target.value)}
              onKeyDown={onHtmlKeyDown}
              onScroll={undefined}
              onFocus={undefined}
              onSelect={undefined}
              spellCheck={false}
              wrap="off"
              className="relative w-full h-40 rounded-xl bg-white/70 dark:bg-black/30 border border-gray-200 dark:border-white/10 px-3 py-3 text-sm leading-6 text-gray-900 dark:text-white caret-cyan-500 selection:bg-cyan-200/40 dark:selection:bg-cyan-400/30 focus:outline-none focus:ring-2 focus:ring-cyan-400 font-mono resize-none"
              style={{ whiteSpace: 'pre', tabSize: 2 }}
            />
          </div>
          <div className="mt-3 flex flex-wrap gap-2">
            {[
              { label: 'Insérer <h1>', insert: '<h1>Salut</h1>' },
              { label: 'Ajouter <p>', insert: '<p>Paragraphe</p>' },
              { label: 'Image + légende', insert: '<figure>\n  <img src="/window.svg" alt="Exemple"/>\n  <figcaption>Légende</figcaption>\n</figure>' },
            ].map((h) => (
              <button key={h.label} onClick={() => insertSnippet('html', h.insert)} className="text-xs px-2 py-1 rounded-md border border-gray-200 dark:border-white/10 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-white/5">
                {h.label}
              </button>
            ))}
          </div>
          <div className="text-sm font-semibold text-gray-700 dark:text-gray-200 mt-4 mb-2">CSS</div>
          <textarea
            aria-label="Éditeur CSS"
            value={css}
            onChange={(e) => setCss(e.target.value)}
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
