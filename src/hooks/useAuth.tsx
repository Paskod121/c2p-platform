'use client'

import { useState, useEffect, createContext, useContext } from 'react'

interface User {
    id: string
    firstName: string
    lastName: string
    email: string
    avatar?: string
    level: number
    experience: number
    joinDate: string
}

interface AuthContextType {
    user: User | null
    isAuthenticated: boolean
    isLoading: boolean
    login: (email: string, password: string) => Promise<boolean>
    register: (userData: RegisterData) => Promise<boolean>
    logout: () => void
    updateUser: (userData: Partial<User>) => void
}

interface RegisterData {
    firstName: string
    lastName: string
    email: string
    password: string
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null)
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        // Vérifier l'authentification au chargement
        checkAuthStatus()
    }, [])

    const checkAuthStatus = async () => {
        try {
            const token = localStorage.getItem('auth-token')

            if (token) {
                // Vérifier la validité du token
                // const response = await fetch('/api/auth/me', {
                //   headers: { Authorization: `Bearer ${token}` }
                // })

                // if (response.ok) {
                //   const userData = await response.json()
                //   setUser(userData)
                //   setIsAuthenticated(true)
                // } else {
                //   localStorage.removeItem('auth-token')
                // }

                // Simulation pour l'instant
                const mockUser: User = {
                    id: '1',
                    firstName: 'PASKOD',
                    lastName: 'Dev',
                    email: 'paskod@c2p-platform.com',
                    level: 7,
                    experience: 1850,
                    joinDate: '2024-01-15'
                }
                setUser(mockUser)
                setIsAuthenticated(true)
            }
        } catch (error) {
            console.error('Erreur lors de la vérification de l\'authentification:', error)
            localStorage.removeItem('auth-token')
        } finally {
            setIsLoading(false)
        }
    }

    const login = async (email: string, password: string): Promise<boolean> => {
        try {
            setIsLoading(true)

            // Simulation d'une connexion
            // const response = await fetch('/api/auth/login', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify({ email, password })
            // })

            // if (response.ok) {
            //   const { token, user: userData } = await response.json()
            //   localStorage.setItem('auth-token', token)
            //   setUser(userData)
            //   setIsAuthenticated(true)
            //   return true
            // }

            // Simulation pour l'instant
            await new Promise(resolve => setTimeout(resolve, 1000))

            const mockUser: User = {
                id: '1',
                firstName: 'Alexandre',
                lastName: 'Dev',
                email: email,
                level: 7,
                experience: 1850,
                joinDate: '2024-01-15'
            }

            const mockToken = 'mock-jwt-token-' + Date.now()
            localStorage.setItem('auth-token', mockToken)
            setUser(mockUser)
            setIsAuthenticated(true)

            return true
        } catch (error) {
            console.error('Erreur de connexion:', error)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    const register = async (userData: RegisterData): Promise<boolean> => {
        try {
            setIsLoading(true)

            // Simulation d'une inscription
            // const response = await fetch('/api/auth/register', {
            //   method: 'POST',
            //   headers: { 'Content-Type': 'application/json' },
            //   body: JSON.stringify(userData)
            // })

            // if (response.ok) {
            //   const { token, user: newUser } = await response.json()
            //   localStorage.setItem('auth-token', token)
            //   setUser(newUser)
            //   setIsAuthenticated(true)
            //   return true
            // }

            // Simulation pour l'instant
            await new Promise(resolve => setTimeout(resolve, 1500))

            const mockUser: User = {
                id: '1',
                firstName: userData.firstName,
                lastName: userData.lastName,
                email: userData.email,
                level: 1,
                experience: 0,
                joinDate: new Date().toISOString().split('T')[0]
            }

            const mockToken = 'mock-jwt-token-' + Date.now()
            localStorage.setItem('auth-token', mockToken)
            setUser(mockUser)
            setIsAuthenticated(true)

            return true
        } catch (error) {
            console.error('Erreur d\'inscription:', error)
            return false
        } finally {
            setIsLoading(false)
        }
    }

    const logout = () => {
        localStorage.removeItem('auth-token')
        setUser(null)
        setIsAuthenticated(false)
    }

    const updateUser = (userData: Partial<User>) => {
        if (user) {
            setUser({ ...user, ...userData })
        }
    }

    const value: AuthContextType = {
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        updateUser
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth(): AuthContextType {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useAuth doit être utilisé dans un AuthProvider')
    }
    return context
}
