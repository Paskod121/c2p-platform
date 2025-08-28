import Link from 'next/link'
import { 
  BookOpen, 
  Code, 
  Users, 
  Trophy, 
  Zap, 
  ArrowRight,
  Play,
  Star,
  Target,
  Heart,
  CheckCircle,
  Clock,
  Award
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-300">
      {/* Header */}
      <header className="relative z-10 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                C2P Platform
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
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
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="relative z-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Devenez un{' '}
              <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                Expert Développeur
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Plateforme d'apprentissage moderne avec formation structurée, communauté active et gamification pour créer une expérience d'apprentissage engageante et efficace.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link href="/auth/register">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-lg px-8 py-4">
                  <Play className="mr-2 h-5 w-5" />
                  Commencer Gratuitement
                </Button>
              </Link>
              <Link href="/courses">
                <Button variant="outline" size="lg" className="text-lg px-8 py-4 border-2 border-purple-300 text-purple-600 dark:border-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                  <Users className="mr-2 h-5 w-5" />
                  Découvrir les Cours
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
              <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">500+</div>
                <div className="text-gray-600 dark:text-gray-400">Cours Disponibles</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">10K+</div>
                <div className="text-gray-600 dark:text-gray-400">Développeurs Actifs</div>
              </div>
              <div className="text-center p-6 rounded-xl bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm border border-gray-200 dark:border-gray-700">
                <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">95%</div>
                <div className="text-gray-600 dark:text-gray-400">Taux de Satisfaction</div>
              </div>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <section className="py-20 bg-white dark:bg-gray-900">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Pourquoi Choisir C2P Platform ?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Une approche unique qui combine formation de qualité, gamification et communauté pour un apprentissage optimal
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icon: <BookOpen className="h-12 w-12 text-purple-600 dark:text-purple-400" />,
                  title: "Formation Structurée",
                  description: "Cours progressifs avec objectifs clairs et suivi de progression détaillé"
                },
                {
                  icon: <Trophy className="h-12 w-12 text-blue-600 dark:text-blue-400" />,
                  title: "Gamification Avancée",
                  description: "Système de badges, niveaux et récompenses pour rester motivé"
                },
                {
                  icon: <Users className="h-12 w-12 text-green-600 dark:text-green-400" />,
                  title: "Communauté Active",
                  description: "Forum par technologie, mentorat et partage de connaissances"
                },
                {
                  icon: <Code className="h-12 w-12 text-orange-600 dark:text-orange-400" />,
                  title: "Projets Pratiques",
                  description: "Portfolio de projets pour appliquer vos connaissances"
                },
                {
                  icon: <Target className="h-12 w-12 text-pink-600 dark:text-pink-400" />,
                  title: "Objectifs Personnalisés",
                  description: "Plan d'apprentissage adapté à vos besoins et objectifs"
                },
                {
                  icon: <Zap className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />,
                  title: "Performance Optimale",
                  description: "Interface moderne et responsive pour tous les appareils"
                }
              ].map((feature, index) => (
                <div
                  key={index}
                  className="text-center p-6 rounded-xl hover:shadow-lg transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700"
                >
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold text-white mb-4">
              Prêt à Transformer Votre Carrière ?
            </h2>
            <p className="text-xl text-purple-100 mb-8 max-w-2xl mx-auto">
              Rejoignez des milliers de développeurs qui ont déjà transformé leur avenir avec C2P Platform
            </p>
            <Link href="/auth/register">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-4">
                Commencer Maintenant
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-black text-white py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 mb-4">
              <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <BookOpen className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-bold">C2P Platform</span>
            </div>
            <p className="text-gray-400 mb-4">
              La plateforme d'apprentissage moderne pour les développeurs de demain
            </p>
            <div className="flex justify-center space-x-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">À propos</a>
              <a href="/courses" className="hover:text-white transition-colors">Cours</a>
              <a href="/forum" className="hover:text-white transition-colors">Communauté</a>
              <a href="#" className="hover:text-white transition-colors">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
