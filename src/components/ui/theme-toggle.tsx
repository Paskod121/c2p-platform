'use client'

import { useState, useEffect } from 'react'
import { Moon, Sun } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light')
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    // Récupérer le thème depuis localStorage ou la préférence système
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark'
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    const currentTheme = savedTheme || systemTheme
    
    setTheme(currentTheme)
    applyTheme(currentTheme)
  }, [])

  const applyTheme = (newTheme: 'light' | 'dark') => {
    const root = document.documentElement
    if (newTheme === 'dark') {
      root.classList.add('dark')
    } else {
      root.classList.remove('dark')
    }
  }

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    applyTheme(newTheme)
    
    // Debug: vérifier que la classe est bien appliquée
    console.log('Thème changé vers:', newTheme)
    console.log('Classes sur html:', document.documentElement.classList.toString())
  }

  // Éviter l'hydratation mismatch
  if (!mounted) {
    return (
      <Button
        variant="ghost"
        size="icon"
        className="relative w-8 h-8 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
        aria-label="Basculer le thème"
      >
        <div className="w-4 h-4 bg-gray-400 rounded animate-pulse" />
      </Button>
    )
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className="relative w-8 h-8 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 transition-all duration-200 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-600"
      aria-label={`Basculer vers le mode ${theme === 'light' ? 'sombre' : 'clair'}`}
    >
      <Sun className="h-4 w-4 rotate-0 scale-100 transition-all duration-200 dark:-rotate-90 dark:scale-0 text-amber-600" />
      <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all duration-200 dark:rotate-0 dark:scale-100 text-blue-600" />
    </Button>
  )
}
