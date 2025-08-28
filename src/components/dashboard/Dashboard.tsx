'use client'

import { DashboardHeader } from './DashboardHeader'
import { StatsCards } from './StatsCards'
import { CourseProgress } from './CourseProgress'
import { BadgesSection } from './BadgesSection'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <DashboardHeader />
      
      {/* Démonstration du Mode Sombre */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg border border-gray-200 dark:border-gray-700 p-6 mb-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Démonstration du Mode Sombre
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                Testez le basculement entre les thèmes clair et sombre
              </p>
            </div>
            <ThemeToggle />
          </div>
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg border border-gray-200 dark:border-gray-600">
              <h4 className="font-medium text-gray-900 dark:text-white mb-2">Mode Clair</h4>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                Fond clair avec texte sombre pour une lecture optimale en journée
              </p>
            </div>
            <div className="bg-gray-800 dark:bg-gray-600 p-4 rounded-lg border border-gray-700 dark:border-gray-500">
              <h4 className="font-medium text-white dark:text-gray-900 mb-2">Mode Sombre</h4>
              <p className="text-sm text-gray-300 dark:text-gray-100">
                Fond sombre avec texte clair pour une expérience confortable la nuit
              </p>
            </div>
            <div className="bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-700">
              <h4 className="font-medium text-purple-900 dark:text-purple-100 mb-2">Accents</h4>
              <p className="text-sm text-purple-700 dark:text-purple-300">
                Couleurs d'accent qui s'adaptent automatiquement au thème
              </p>
            </div>
          </div>
        </div>
      </div>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        <StatsCards />
        <CourseProgress />
        <BadgesSection />
      </main>
    </div>
  )
}
