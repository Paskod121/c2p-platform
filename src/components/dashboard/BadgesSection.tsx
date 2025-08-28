'use client'

import { 
  Star, 
  Trophy, 
  Zap, 
  Heart,
  Target,
  Flame,
  Crown,
  Gem,
  Award,
  Sparkles,
  Code,
  Database
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface BadgeItem {
  id: string
  name: string
  description: string
  icon: React.ReactNode
  rarity: 'COMMON' | 'UNCOMMON' | 'RARE' | 'EPIC' | 'LEGENDARY'
  earnedAt: string
  points: number
  isNew?: boolean
}

const getRarityConfig = (rarity: string) => {
  switch (rarity) {
    case 'COMMON':
      return {
        color: 'from-gray-400 to-gray-500',
        bgColor: 'bg-gray-100',
        borderColor: 'border-gray-200',
        textColor: 'text-gray-700',
        glow: 'shadow-gray-200'
      }
    case 'UNCOMMON':
      return {
        color: 'from-green-400 to-green-500',
        bgColor: 'bg-green-100',
        borderColor: 'border-green-200',
        textColor: 'text-green-700',
        glow: 'shadow-green-200'
      }
    case 'RARE':
      return {
        color: 'from-blue-400 to-blue-500',
        bgColor: 'bg-blue-100',
        borderColor: 'border-blue-200',
        textColor: 'text-blue-700',
        glow: 'shadow-blue-200'
      }
    case 'EPIC':
      return {
        color: 'from-purple-400 to-purple-500',
        bgColor: 'bg-purple-100',
        borderColor: 'border-purple-200',
        textColor: 'text-purple-700',
        glow: 'shadow-purple-200'
      }
    case 'LEGENDARY':
      return {
        color: 'from-yellow-400 to-orange-500',
        bgColor: 'bg-yellow-100',
        borderColor: 'border-yellow-200',
        textColor: 'text-yellow-700',
        glow: 'shadow-yellow-200'
      }
    default:
      return {
        color: 'from-gray-400 to-gray-500',
        bgColor: 'bg-gray-100',
        borderColor: 'border-gray-200',
        textColor: 'text-gray-700',
        glow: 'shadow-gray-200'
      }
  }
}

const getRarityText = (rarity: string) => {
  switch (rarity) {
    case 'COMMON':
      return 'Commun'
    case 'UNCOMMON':
      return 'Peu Commun'
    case 'RARE':
      return 'Rare'
    case 'EPIC':
      return 'Épique'
    case 'LEGENDARY':
      return 'Légendaire'
    default:
      return rarity
  }
}

export function BadgesSection() {
  const badges: BadgeItem[] = [
    {
      id: '1',
      name: 'Premier Pas',
      description: 'A terminé son premier cours',
      icon: <Star className="h-6 w-6" />,
      rarity: 'COMMON',
      earnedAt: '2024-01-15',
      points: 10
    },
    {
      id: '2',
      name: 'Développeur Python',
      description: 'Maîtrise Python niveau intermédiaire',
      icon: <Code className="h-6 w-6" />,
      rarity: 'UNCOMMON',
      earnedAt: '2024-02-20',
      points: 25
    },
    {
      id: '3',
      name: 'React Master',
      description: 'Expert en React.js et TypeScript',
      icon: <Zap className="h-6 w-6" />,
      rarity: 'RARE',
      earnedAt: '2024-03-10',
      points: 50
    },
    {
      id: '4',
      name: 'Architecte de Base',
      description: 'Conception de bases de données complexes',
      icon: <Database className="h-6 w-6" />,
      rarity: 'EPIC',
      earnedAt: '2024-04-05',
      points: 100
    },
    {
      id: '5',
      name: 'Légende du Code',
      description: 'A complété 50+ cours avec excellence',
      icon: <Crown className="h-6 w-6" />,
      rarity: 'LEGENDARY',
      earnedAt: '2024-05-01',
      points: 500,
      isNew: true
    },
    {
      id: '6',
      name: 'Mentor Communautaire',
      description: 'A aidé 100+ développeurs',
      icon: <Heart className="h-6 w-6" />,
      rarity: 'RARE',
      earnedAt: '2024-05-15',
      points: 75
    }
  ]

  const totalPoints = badges.reduce((sum, badge) => sum + badge.points, 0)
  const earnedBadges = badges.length
  const legendaryBadges = badges.filter(b => b.rarity === 'LEGENDARY').length

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-gray-900">Mes Badges & Récompenses</h2>
        <p className="text-gray-600 mt-1">Collectionnez des badges et montez en puissance</p>
      </div>

      {/* Statistiques des Badges */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="text-center bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-purple-600">{totalPoints}</div>
            <p className="text-sm text-gray-600">Points Totaux</p>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-green-600">{earnedBadges}</div>
            <p className="text-sm text-gray-600">Badges Obtenus</p>
          </CardContent>
        </Card>
        <Card className="text-center bg-gradient-to-br from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="pt-6">
            <div className="text-3xl font-bold text-yellow-600">{legendaryBadges}</div>
            <p className="text-sm text-gray-600">Badges Légendaires</p>
          </CardContent>
        </Card>
      </div>

      {/* Grille des Badges */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {badges.map((badge, index) => {
          const rarityConfig = getRarityConfig(badge.rarity)
          
          return (
            <div key={badge.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
              <Card className={`hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${rarityConfig.bgColor} ${rarityConfig.borderColor} border-2 relative overflow-hidden`}>
                {badge.isNew && (
                  <div className="absolute top-2 right-2 z-10 animate-pulse">
                    <Badge className="bg-red-500 text-white text-xs">
                      NOUVEAU
                    </Badge>
                  </div>
                )}
                
                <CardHeader className="text-center pb-3">
                  <div className={`mx-auto p-4 rounded-full bg-gradient-to-br ${rarityConfig.color} text-white shadow-lg hover:scale-110 transition-transform`}>
                    {badge.icon}
                  </div>
                  <CardTitle className={`text-lg font-semibold ${rarityConfig.textColor}`}>
                    {badge.name}
                  </CardTitle>
                  <Badge variant="outline" className={`${rarityConfig.borderColor} ${rarityConfig.textColor}`}>
                    {getRarityText(badge.rarity)}
                  </Badge>
                </CardHeader>
                
                <CardContent className="text-center space-y-3">
                  <p className="text-sm text-gray-600">{badge.description}</p>
                  
                  <div className="flex items-center justify-center space-x-2">
                    <Sparkles className="h-4 w-4 text-yellow-500" />
                    <span className="text-sm font-medium text-gray-700">
                      {badge.points} points
                    </span>
                  </div>
                  
                  <div className="text-xs text-gray-500">
                    Obtenu le {new Date(badge.earnedAt).toLocaleDateString('fr-FR')}
                  </div>
                  
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full border-purple-300 text-purple-600 hover:bg-purple-50"
                  >
                    Voir Détails
                  </Button>
                </CardContent>
              </Card>
            </div>
          )
        })}
      </div>

      {/* Call to Action */}
      <div className="text-center">
        <Card className="bg-gradient-to-r from-purple-50 to-blue-50 border-purple-200">
          <CardContent className="pt-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Débloquez Plus de Badges !
            </h3>
            <p className="text-gray-600 mb-4">
              Continuez votre apprentissage pour débloquer des récompenses exclusives
            </p>
            <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
              Découvrir les Cours
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
