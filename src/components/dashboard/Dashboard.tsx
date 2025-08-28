'use client'

import { DashboardHeader } from './DashboardHeader'
import { StatsCards } from './StatsCards'
import { CourseProgress } from './CourseProgress'
import { BadgesSection } from './BadgesSection'

export function Dashboard() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <DashboardHeader />
      
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Message de Bienvenue */}
        <div className="text-center">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
            Bienvenue sur votre Dashboard !
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Continuez votre voyage d&apos;apprentissage et découvrez de nouvelles opportunités de développement
          </p>
        </div>

        {/* Cartes de Statistiques */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Vue d&apos;Ensemble</h2>
            <p className="text-gray-600 dark:text-gray-300">Vos performances et réalisations en un coup d&apos;œil</p>
          </div>
          <StatsCards />
        </div>

        {/* Progression des Cours */}
        <div>
          <CourseProgress />
        </div>

        {/* Section des Badges */}
        <div>
          <BadgesSection />
        </div>

        {/* Call to Action Final */}
        <div className="text-center py-12">
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">
              Prêt pour le Niveau Supérieur ?
            </h3>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Explorez nos cours avancés, participez à la communauté et devenez un expert reconnu dans votre domaine
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Découvrir les Cours
              </button>
              <button className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-purple-600 transition-colors">
                Rejoindre la Communauté
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
