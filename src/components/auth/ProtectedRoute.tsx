'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Loader2 } from 'lucide-react'

interface ProtectedRouteProps {
  children: React.ReactNode
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    // Simulation de vérification d'authentification
    const checkAuth = async () => {
      try {
        // Ici, vous vérifieriez le token JWT ou la session
        // Pour l'instant, on simule une vérification
        const token = localStorage.getItem('auth-token')
        
        if (!token) {
          // Pas de token, rediriger vers la connexion
          router.push('/auth/login')
          return
        }

        // Vérifier la validité du token (appel API)
        // const response = await fetch('/api/auth/verify', {
        //   headers: { Authorization: `Bearer ${token}` }
        // })
        
        // if (!response.ok) {
        //   localStorage.removeItem('auth-token')
        //   router.push('/auth/login')
        //   return
        // }

        // Token valide
        setIsAuthenticated(true)
      } catch (error) {
        console.error('Erreur de vérification d\'authentification:', error)
        localStorage.removeItem('auth-token')
        router.push('/auth/login')
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [router])

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

  // Si pas authentifié, ne rien afficher (redirection en cours)
  if (!isAuthenticated) {
    return null
  }

  // Si authentifié, afficher le contenu protégé
  return <>{children}</>
}
