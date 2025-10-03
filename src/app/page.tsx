'use client'

import Link from 'next/link'
import { 
  BookOpen, 
  Flame,
  Crown,
  Brain,
  Rocket,
  Shield,
  Sword,
  Github,
  Linkedin,
  Mail
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { ThemeToggle } from '@/components/ui/theme-toggle'
import { LiveStrip } from '@/components/community/LiveStrip'
import { CapsuleInitiation, AnneauCommunaute, SandboxLive, ForgeBadge } from '@/components/sections'
import { CTAHologramme, TypographieDynamique } from '@/components/ui'
import { PulseActivite, CanvasInteractif } from '@/components/canvas'



export default function Home() {
  return (
    <div className="min-h-screen relative bg-gradient-to-br from-gray-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-800 dark:to-purple-900 transition-colors duration-300 overflow-hidden">
      <CanvasInteractif />
      <PulseActivite />
      {/* Header */}
      <header className="relative z-10 border-b border-gray-200 dark:border-gray-700 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm">
        <nav className="container mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="h-8 w-8 sm:h-10 sm:w-10 rounded-xl bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center">
                <BookOpen className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <span className="text-lg sm:text-2xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
                C2P Platform
              </span>
            </div>
            
            {/* Navigation Desktop */}
            <div className="hidden md:flex items-center space-x-4">
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

            {/* Navigation Mobile */}
            <div className="flex md:hidden items-center space-x-2">
              <ThemeToggle />
              <Link href="/auth/login">
                <Button variant="outline" size="sm" className="border-purple-300 text-purple-600 dark:border-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-900/20">
                  Connexion
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Start
                </Button>
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section Révolutionnaire */}
      <main className="relative z-10">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center max-w-6xl mx-auto">
            {/* Titre Principal avec Typographie Dynamique */}
            <div className="mb-6 sm:mb-8">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black text-gray-900 dark:text-white mb-4 sm:mb-6 leading-tight px-4">
              Devenez un{' '}
                <span className="bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                  <TypographieDynamique />
              </span>
            </h1>
              <div className="flex items-center justify-center gap-2 sm:gap-4 mb-6 sm:mb-8">
                <div className="h-1 w-12 sm:w-20 bg-gradient-to-r from-cyan-400 to-purple-400"></div>
                <span className="text-purple-600 dark:text-purple-400 font-semibold text-base sm:text-lg animate-pulse">
                  DÉVELOPPEUR
                </span>
                <div className="h-1 w-12 sm:w-20 bg-gradient-to-r from-purple-400 to-pink-400"></div>
              </div>
            </div>

            {/* Sous-titre avec Effet de Révélation */}
            <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-8 sm:mb-12 leading-relaxed max-w-4xl mx-auto px-4">
              Rejoignez la <span className="text-cyan-600 dark:text-cyan-400 font-bold">révolution du code</span> où chaque ligne 
              forge ton <span className="text-purple-600 dark:text-purple-400 font-bold">destin numérique</span>. 
              Ici, on ne suit pas de cours, on <span className="text-pink-600 dark:text-pink-400 font-bold">conquiert l\'avenir</span>.
            </p>

            {/* LiveStrip compact */}
            <div className="mx-auto max-w-5xl mb-8 sm:mb-10 px-4">
              <LiveStrip />
            </div>

          {/* Capsule d’Initiation interactive */}
          <CapsuleInitiation />

          {/* Sandbox live */}
          <SandboxLive />
            
            {/* CTA Hologrammes Révolutionnaires */}
            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center mb-14 px-4">
              <CTAHologramme href="/auth/register" className="flex-1 max-w-md">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <Flame className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-500 dark:text-cyan-400 mr-2 sm:mr-3 animate-pulse" />
                    <span className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">REJOINDRE</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-cyan-700 dark:text-cyan-300">LA RÉVOLUTION</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-purple-200 mt-2">Commence ton aventure maintenant</div>
                </div>
              </CTAHologramme>
              
              <CTAHologramme href="/courses" className="flex-1 max-w-md">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-3 sm:mb-4">
                    <Brain className="h-6 w-6 sm:h-8 sm:w-8 text-purple-500 dark:text-purple-400 mr-2 sm:mr-3" />
                    <span className="text-xl sm:text-2xl font-black text-gray-900 dark:text-white">EXPLORER</span>
                  </div>
                  <div className="text-base sm:text-lg font-bold text-purple-700 dark:text-purple-300">LES DÉFIS</div>
                  <div className="text-xs sm:text-sm text-gray-600 dark:text-cyan-200 mt-2">Découvre ton potentiel</div>
                </div>
              </CTAHologramme>
            </div>

            {/* Stats Révolutionnaires avec Animations */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-20">
              <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-cyan-500/10 to-purple-500/10 backdrop-blur-xl border border-cyan-400/20 hover:border-cyan-400/40 transition-all duration-500 hover:-translate-y-2">
                <div className="text-5xl font-black text-cyan-600 dark:text-cyan-400 mb-3 group-hover:scale-110 transition-transform">∞</div>
                <div className="text-gray-800 dark:text-gray-200 font-bold text-lg">DÉFIS INFINIS</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-2">Chaque jour, de nouveaux défis apparaissent</div>
              </div>
              <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 backdrop-blur-xl border border-purple-400/20 hover:border-purple-400/40 transition-all duration-500 hover:-translate-y-2">
                <div className="text-5xl font-black text-purple-600 dark:text-purple-400 mb-3 group-hover:scale-110 transition-transform">⚡</div>
                <div className="text-gray-800 dark:text-gray-200 font-bold text-lg">COMMUNAUTÉ ACTIVE</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-2">Une communauté qui ne dort jamais</div>
              </div>
              <div className="group text-center p-8 rounded-3xl bg-gradient-to-br from-pink-500/10 to-cyan-500/10 backdrop-blur-xl border border-pink-400/20 hover:border-pink-400/40 transition-all duration-500 hover:-translate-y-2">
                <div className="text-5xl font-black text-pink-600 dark:text-pink-400 mb-3 group-hover:scale-110 transition-transform">🏆</div>
                <div className="text-gray-800 dark:text-gray-200 font-bold text-lg">MAÎTRISE TOTALE</div>
                <div className="text-gray-600 dark:text-gray-400 text-sm mt-2">De novice à légende du code</div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Révolutionnaire "Pouvoirs du Code" */}
        <section className="py-24 bg-gradient-to-b from-white via-purple-50/50 to-white dark:from-gray-900 dark:via-purple-900/20 dark:to-gray-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(147,51,234,0.1)_1px,transparent_1px)] [background-size:60px_60px] opacity-40"></div>
          
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-500 to-pink-500 mb-6">
                POUVOIRS DU CODE
              </h2>
              <p className="text-2xl text-gray-600 dark:text-gray-300 max-w-4xl mx-auto leading-relaxed">
                Découvre les <span className="text-cyan-600 dark:text-cyan-400 font-bold">forces cachées</span> qui feront de toi un 
                <span className="text-purple-600 dark:text-purple-400 font-bold"> guerrier du code</span> légendaire
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  icone: <Sword className="h-16 w-16 text-cyan-500" />,
                  titre: "L\'Art de la Guerre",
                  description: "Défis tactiques qui forgent ton esprit de stratège. Chaque victoire te rapproche de la maîtrise absolue.",
                  couleur: "from-cyan-500/20 to-blue-500/20",
                  bordure: "border-cyan-400/30",
                  hover: "hover:border-cyan-400/60"
                },
                {
                  icone: <Brain className="h-16 w-16 text-purple-500" />,
                  titre: "L\'Intelligence Collective",
                  description: "La communauté devient ton cerveau étendu. Chaque membre apporte sa sagesse à ta quête.",
                  couleur: "from-purple-500/20 to-pink-500/20",
                  bordure: "border-purple-400/30",
                  hover: "hover:border-purple-400/60"
                },
                {
                  icone: <Crown className="h-16 w-16 text-yellow-500" />,
                  titre: "La Couronne du Maître",
                  description: "Badges légendaires qui témoignent de tes exploits. Chaque récompense raconte ton histoire.",
                  couleur: "from-yellow-500/20 to-orange-500/20",
                  bordure: "border-yellow-400/30",
                  hover: "hover:border-yellow-400/60"
                },
                {
                  icone: <Rocket className="h-16 w-16 text-pink-500" />,
                  titre: "L\'Évolution Continue",
                  description: "Projets qui défient les limites. Chaque création te propulse vers de nouveaux horizons.",
                  couleur: "from-pink-500/20 to-red-500/20",
                  bordure: "border-pink-400/30",
                  hover: "hover:border-pink-400/60"
                },
                {
                  icone: <Shield className="h-16 w-16 text-green-500" />,
                  titre: "La Protection Mentale",
                  description: "Mentorat et entraide qui renforcent ton armure. Aucun obstacle ne résiste à la solidarité.",
                  couleur: "from-green-500/20 to-emerald-500/20",
                  bordure: "border-green-400/30",
                  hover: "hover:border-green-400/60"
                },
                {
                  icone: <Flame className="h-16 w-16 text-red-500" />,
                  titre: "La Passion Éternelle",
                  description: "Interface qui s'adapte à ton rythme. Chaque interaction alimente ta flamme intérieure.",
                  couleur: "from-red-500/20 to-pink-500/20",
                  bordure: "border-red-400/30",
                  hover: "hover:border-red-400/60"
                }
              ].map((pouvoir, index) => (
                <div
                  key={pouvoir.titre}
                  className={`group text-center p-8 rounded-3xl bg-gradient-to-br ${pouvoir.couleur} backdrop-blur-xl border ${pouvoir.bordure} ${pouvoir.hover} transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-purple-500/25`}
                >
                  <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                    {pouvoir.icone}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors">
                    {pouvoir.titre}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed group-hover:text-gray-700 dark:group-hover:text-gray-200 transition-colors">
                    {pouvoir.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Anneau de Communauté */}
        <AnneauCommunaute />

        {/* Forge de Badge */}
        <ForgeBadge />

        {/* CTA Final Révolutionnaire */}
        <section className="py-24 bg-gradient-to-br from-white via-purple-50 to-white dark:from-black dark:via-purple-900 dark:to-black relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/10 via-purple-500/10 to-pink-500/10"></div>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <h2 className="text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-600 via-purple-700 to-pink-600 dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400 mb-8">
              TON DESTIN T\'ATTEND
            </h2>
            <p className="text-2xl text-gray-700 dark:text-purple-100 mb-12 max-w-4xl mx-auto leading-relaxed">
              La <span className="text-cyan-700 dark:text-cyan-300 font-bold">révolution du code</span> t\'ouvre ses portes. 
              Choisis ton <span className="text-pink-700 dark:text-pink-300 font-bold">chemin de légende</span> et 
              <span className="text-yellow-700 dark:text-yellow-300 font-bold"> deviens immortel</span> dans l\'univers du code.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <CTAHologramme href="/auth/register" className="max-w-lg">
                <div className="text-center">
                  <div className="flex items-center justify-center mb-4">
                    <Crown className="h-10 w-10 text-yellow-500 dark:text-yellow-400 mr-4 animate-spin" />
                    <span className="text-3xl font-black text-gray-900 dark:text-white">DEVENIR</span>
                  </div>
                  <div className="text-2xl font-bold text-yellow-700 dark:text-yellow-300">LÉGENDAIRE</div>
                  <div className="text-sm text-cyan-700 dark:text-cyan-200 mt-2">Rejoins la révolution maintenant</div>
                </div>
              </CTAHologramme>
            </div>
            <div className="mt-16 text-purple-700 dark:text-purple-300 text-lg">
              <p>💧 <span className="font-bold">Rejoins 10,000+ révolutionnaires du code</span> qui ont déjà choisi leur destin</p>
            </div>
          </div>
        </section>
      </main>

      {/* Footer Neo-Flux */}
      <footer className="relative overflow-hidden border-t border-gray-200/70 dark:border-purple-500/20 py-16 sm:py-20">
        {/* Fond neural discret */}
        <div className="absolute inset-0 bg-gradient-to-b from-white via-white to-purple-50 dark:from-black dark:via-gray-950 dark:to-purple-950" />
        <div className="absolute inset-0 opacity-[0.25] pointer-events-none bg-[radial-gradient(600px_200px_at_20%_0%,rgba(34,211,238,0.15),transparent_60%),radial-gradient(600px_200px_at_80%_0%,rgba(168,85,247,0.15),transparent_60%),radial-gradient(1000px_300px_at_50%_120%,rgba(236,72,153,0.12),transparent_60%)]" />
        {/* Aurora animée */}
        <div className="pointer-events-none absolute -inset-x-20 -bottom-10 h-[240px] [mask-image:radial-gradient(70%_60%_at_50%_0%,#000,transparent_70%)]">
          <div className="aurora" />
        </div>
        <div className="relative container mx-auto px-4 sm:px-6 lg:px-8">
          {/* Bandeau marque */}
          <div className="flex flex-col items-center text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="h-12 w-12 rounded-2xl bg-gradient-to-br from-cyan-400 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Brain className="h-7 w-7 text-white" />
              </div>
              <div className="text-left">
                <span className="text-2xl font-black bg-gradient-to-r from-cyan-600 via-purple-700 to-pink-600 bg-clip-text text-transparent dark:from-cyan-400 dark:via-purple-400 dark:to-pink-400">
                  C2P REVOLUTION
                </span>
                <div className="text-xs text-purple-700 dark:text-purple-300 font-medium">GUERRIERS DU CODE</div>
              </div>
            </div>
            <p className="text-gray-700 dark:text-purple-100 mb-10 max-w-3xl leading-relaxed">
              L\'endroit où les <span className="text-cyan-700 dark:text-cyan-300 font-semibold">révolutionnaires du code</span> forgent leur légende. 
              Rejoins la <span className="text-pink-700 dark:text-pink-300 font-semibold">guilde des immortels</span>.
            </p>
          </div>
          {/* Grille de navigation */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6 md:gap-8 text-sm">
            <div className="col-span-2 lg:col-span-2">
              <h4 className="text-gray-900 dark:text-white font-semibold mb-3">Plateforme</h4>
              <ul className="space-y-2 text-gray-600 dark:text-purple-200">
                <li><Link href="/" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">La Révolution</Link></li>
                <li><Link href="/courses" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">Défis</Link></li>
                <li><Link href="/forum" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">Communauté</Link></li>
                <li><Link href="/mentorat" className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors">Mentorat</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-3">Ressources</h4>
              <ul className="space-y-2 text-gray-600 dark:text-purple-200">
                <li><a className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors" href="#">Guides</a></li>
                <li><a className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors" href="#">Replays</a></li>
                <li><a className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors" href="#">Roadmap</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-3">Légal</h4>
              <ul className="space-y-2 text-gray-600 dark:text-purple-200">
                <li><a className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors" href="#">Mentions</a></li>
                <li><a className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors" href="#">Confidentialité</a></li>
                <li><a className="hover:text-cyan-600 dark:hover:text-cyan-300 transition-colors" href="#">Conditions</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-gray-900 dark:text-white font-semibold mb-3">Réseaux</h4>
              <div className="flex items-center gap-3">
                <a aria-label="GitHub" href="#" className="group relative p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:-translate-y-0.5 transition-all bg-white/70 dark:bg-white/5 shadow-sm overflow-hidden">
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-cyan-400/20 via-transparent to-transparent" />
                  <Github className="h-5 w-5 text-gray-900 dark:text-white" />
                </a>
                <a aria-label="X" href="#" className="group relative p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:-translate-y-0.5 transition-all bg-white/70 dark:bg-white/5 shadow-sm overflow-hidden">
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-purple-400/20 via-transparent to-transparent" />
                  <svg aria-hidden viewBox="0 0 24 24" className="h-5 w-5 fill-gray-900 dark:fill-white" xmlns="http://www.w3.org/2000/svg"><path d="M18.146 2H21l-7.5 8.58L22.5 22H15l-5.35-6.43L3.854 22H1l8.03-9.17L1.5 2H9l4.9 5.9L18.146 2Zm-2.63 18h1.66L7.13 4H5.47l10.046 16Z"/></svg>
                </a>
                <a aria-label="LinkedIn" href="#" className="group relative p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:-translate-y-0.5 transition-all bg-white/70 dark:bg-white/5 shadow-sm overflow-hidden">
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-blue-500/20 via-transparent to-transparent" />
                  <Linkedin className="h-5 w-5 text-blue-700" />
                </a>
                <a aria-label="Contact" href="#" className="group relative p-2 rounded-xl border border-gray-200 dark:border-white/10 hover:-translate-y-0.5 transition-all bg-white/70 dark:bg-white/5 shadow-sm overflow-hidden">
                  <span className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-radial from-pink-500/20 via-transparent to-transparent" />
                  <Mail className="h-5 w-5 text-purple-700 dark:text-purple-300" />
                </a>
              </div>
              </div>
            </div>
          {/* Bas de page */}
          <div className="mt-12 pt-8 border-t border-gray-200 dark:border-purple-500/20 flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600 dark:text-purple-300">
              © 2024 C2P Revolution — <span className="font-medium text-gray-800 dark:text-white">Maîtres du code</span>
            </p>
            <div className="text-xs text-gray-500 dark:text-purple-300">
              Fait avec <span className="text-pink-600">❤</span> et <span className="text-cyan-600">TypeScript</span>
            </div>
          </div>
        </div>
        <style jsx>{`
          .aurora {
            position: absolute;
            inset: 0;
            background: conic-gradient(from 180deg at 50% 50%, rgba(34,211,238,0.25), rgba(168,85,247,0.2), rgba(236,72,153,0.22), rgba(34,211,238,0.25));
            filter: blur(60px);
            animation: aurora-move 14s linear infinite;
            opacity: 0.7;
          }
          @keyframes aurora-move {
            0% { transform: translateX(-10%) rotate(0deg); }
            50% { transform: translateX(10%) rotate(180deg); }
            100% { transform: translateX(-10%) rotate(360deg); }
          }
          .bg-radial {
            background: radial-gradient(400px 200px at center, var(--tw-gradient-from), transparent 60%);
          }
        `}</style>
      </footer>
    </div>
  )
}
