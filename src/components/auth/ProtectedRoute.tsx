'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'
import { useAuth } from '@/hooks/useAuth'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()
  const { isAuthenticated, user } = useAuth()

  useEffect(() => {
    // Vérification initiale
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('auth-token')
        
        if (!token) {
          router.push('/auth/login')
          return
        }

        // Si on a un token mais que l'état n'est pas encore synchronisé
        if (!isAuthenticated && token) {
          // Attendre un peu que le contexte se synchronise
          await new Promise(resolve => setTimeout(resolve, 100))
        }

        setIsLoading(false)
      } catch (error) {
        console.error('Erreur de vérification d\'authentification:', error)
        localStorage.removeItem('auth-token')
        router.push('/auth/login')
      }
    }

    checkAuth()
  }, [router, isAuthenticated])

  // Redirection immédiate si pas authentifié
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      console.log('Redirection immédiate vers /auth/login')
      router.push('/auth/login')
    }
  }, [isAuthenticated, isLoading, router])

  // Afficher un loader pendant la vérification
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-purple-600 dark:text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Vérification de l'authentification...</p>
        </div>
      </div>
    )
  }

  // Si pas authentifié, afficher un loader de redirection
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 text-purple-600 dark:text-purple-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-600 dark:text-gray-300">Redirection vers la connexion...</p>
        </div>
      </div>
    )
  }

  // Si authentifié, afficher le contenu protégé
  return <>{children}</>
}
