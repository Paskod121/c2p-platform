'use client'

import { useState } from 'react'
import {
  Bell,
  Search,
  Menu,
  X,
  User,
  Settings,
  LogOut,
  BookOpen,
  Trophy,
  Users
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'

interface DashboardHeaderProps {
  userName?: string
  userEmail?: string
  userAvatar?: string
  notificationsCount?: number
  level?: number
  experience?: number
}

export function DashboardHeader({
  userName = "Développeur",
  userEmail = "dev@c2p-platform.com",
  userAvatar,
  notificationsCount = 3,
  level = 5,
  experience = 1250
}: DashboardHeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo et Navigation */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2 hover:scale-105 transition-transform">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                C2P Platform
              </span>
            </div>

            {/* Navigation Desktop */}
            <nav className="hidden md:flex items-center space-x-6 ml-8">
              <a
                href="/dashboard"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors hover:-translate-y-0.5"
              >
                Dashboard
              </a>
              <a
                href="/courses"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors hover:-translate-y-0.5"
              >
                Cours
              </a>
              <a
                href="/forum"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors hover:-translate-y-0.5"
              >
                Forum
              </a>
              <a
                href="/projects"
                className="text-sm font-medium text-gray-700 hover:text-purple-600 transition-colors hover:-translate-y-0.5"
              >
                Projets
              </a>
            </nav>
          </div>

          {/* Recherche */}
          <div className="hidden lg:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Rechercher des cours, tutoriels..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Actions Utilisateur */}
          <div className="flex items-center space-x-4">
            {/* Notifications */}
            <div className="relative hover:scale-110 transition-transform">
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="h-5 w-5" />
                {notificationsCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs">
                    {notificationsCount}
                  </Badge>
                )}
              </Button>
            </div>

            {/* Niveau et Expérience */}
            <div className="hidden sm:flex items-center space-x-3 bg-gradient-to-r from-purple-50 to-blue-50 px-3 py-2 rounded-lg border">
              <Trophy className="h-4 w-4 text-yellow-500" />
              <span className="text-sm font-medium text-gray-700">Niveau {level}</span>
              <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                  style={{ width: `${Math.min((experience % 1000) / 10, 100)}%` }}
                />
              </div>
            </div>

            {/* Profil Utilisateur */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors hover:scale-105">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={userAvatar} alt={userName} />
                    <AvatarFallback className="bg-gradient-to-br from-purple-500 to-blue-500 text-white">
                      {userName.charAt(0).toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden sm:block text-left">
                    <p className="text-sm font-medium text-gray-700">{userName}</p>
                    <p className="text-xs text-gray-500">{userEmail}</p>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">{userName}</p>
                    <p className="text-xs leading-none text-muted-foreground">{userEmail}</p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <User className="mr-2 h-4 w-4" />
                  <span>Profil</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Paramètres</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Se déconnecter</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Menu Mobile */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {/* Menu Mobile */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t">
            <div className="px-2 pt-2 pb-3 space-y-1">
              <a href="/dashboard" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md">
                Dashboard
              </a>
              <a href="/courses" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md">
                Cours
              </a>
              <a href="/forum" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md">
                Forum
              </a>
              <a href="/projects" className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-purple-600 hover:bg-gray-50 rounded-md">
                Projets
              </a>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
