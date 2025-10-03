'use client'

import { useState, useCallback } from 'react'

interface EditorState {
  html: string
  css: string
  isGoalMet: boolean
  progress: number
  showConfetti: boolean
  focusMode: boolean
}

interface EditorActions {
  setHtml: (html: string) => void
  setCss: (css: string) => void
  setFocusMode: (focus: boolean) => void
  formatHtml: (html: string) => string
  insertSnippet: (type: 'html' | 'css', snippet: string) => void
}

export function useEditor(initialHtml = '<h1>Salut</h1>\n<p>Édite et vois le rendu.</p>', initialCss = 'h1{color:#8b5cf6;font-family:system-ui;} p{color:#374151;}'): EditorState & EditorActions {
  const [html, setHtml] = useState(initialHtml)
  const [css, setCss] = useState(initialCss)
  const [isGoalMet, setIsGoalMet] = useState(false)
  const [progress, setProgress] = useState(0)
  const [showConfetti, setShowConfetti] = useState(false)
  const [focusMode, setFocusMode] = useState(false)

  const goal = {
    title: 'Ajouter un <h2> personnalisé et le colorer en violet',
    check: (doc: string, styles?: string) => {
      const hasH2 = /<h2[^>]*>\s*[^<]+\s*<\/h2>/i.test(doc)
      const hasColor = /h2\s*\{[^}]*color\s*:\s*(#8b5cf6|rgb\(\s*139\s*,\s*92\s*,\s*246\s*\)|purple)/i.test(styles ?? '')
      return hasH2 && hasColor
    }
  }

  const similarityToGoal = (doc: string, styles?: string): number => {
    const hasH2 = /<h2/i.test(doc)
    const hasColor = /h2\s*\{[^}]*color/i.test(styles ?? '')
    if (hasH2 && hasColor) return 100
    if (hasH2 || hasColor) return 50
    return 10
  }

  const formatHtml = useCallback((doc: string): string => {
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
  }, [])

  const insertSnippet = useCallback((type: 'html' | 'css', snippet: string) => {
    if (type === 'html') {
      setHtml(prev => prev ? prev + '\n' + snippet : snippet)
    } else {
      setCss(prev => prev ? prev + '\n' + snippet : snippet)
    }
  }, [])

  const updateProgress = useCallback((newHtml: string, newCss: string) => {
    const ok = goal.check(newHtml, newCss)
    setIsGoalMet(ok)
    setProgress(ok ? 100 : similarityToGoal(newHtml, newCss))
    
    if (ok) {
      setShowConfetti(true)
      setTimeout(() => setShowConfetti(false), 1200)
    }
  }, [goal])

  const handleSetHtml = useCallback((newHtml: string) => {
    setHtml(newHtml)
    updateProgress(newHtml, css)
  }, [css, updateProgress])

  const handleSetCss = useCallback((newCss: string) => {
    setCss(newCss)
    updateProgress(html, newCss)
  }, [html, updateProgress])

  return {
    html,
    css,
    isGoalMet,
    progress,
    showConfetti,
    focusMode,
    setHtml: handleSetHtml,
    setCss: handleSetCss,
    setFocusMode,
    formatHtml,
    insertSnippet
  }
}
