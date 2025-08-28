'use client'

import { 
  BookOpen, 
  Trophy, 
  Clock, 
  Target,
  TrendingUp,
  Users,
  Star,
  Zap
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface StatCardProps {
  title: string
  value: string | number
  description: string
  icon: React.ReactNode
  trend?: {
    value: number
    isPositive: boolean
  }
  color: 'purple' | 'blue' | 'green' | 'orange' | 'pink'
}

const StatCard = ({ title, value, description, icon, trend, color }: StatCardProps) => {
  const colorClasses = {
    purple: 'from-purple-500 to-purple-600',
    blue: 'from-blue-500 to-blue-600',
    green: 'from-green-500 to-green-600',
    orange: 'from-orange-500 to-orange-600',
    pink: 'from-pink-500 to-pink-600'
  }

  const bgColorClasses = {
    purple: 'bg-purple-50 border-purple-200',
    blue: 'bg-blue-50 border-blue-200',
    green: 'bg-green-50 border-green-200',
    orange: 'bg-orange-50 border-orange-200',
    pink: 'bg-pink-50 border-pink-200'
  }

  return (
    <div className="hover:-translate-y-1 hover:scale-105 transition-all duration-300">
      <Card className={`${bgColorClasses[color]} border-2 hover:shadow-lg transition-all duration-300`}>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-gray-700">{title}</CardTitle>
          <div className={`p-2 rounded-lg bg-gradient-to-br ${colorClasses[color]}`}>
            {icon}
          </div>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-gray-900">{value}</div>
          <p className="text-xs text-gray-600 mt-1">{description}</p>
          {trend && (
            <div className="flex items-center mt-2">
              <TrendingUp 
                className={`h-4 w-4 mr-1 ${trend.isPositive ? 'text-green-500' : 'text-red-500'}`} 
              />
              <span className={`text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                {trend.isPositive ? '+' : ''}{trend.value}%
              </span>
              <Badge variant="secondary" className="ml-2 text-xs">
                {trend.isPositive ? 'En hausse' : 'En baisse'}
              </Badge>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}

export function StatsCards() {
  const stats = [
    {
      title: "Cours Terminés",
      value: "12",
      description: "Sur 25 cours disponibles",
      icon: <BookOpen className="h-4 w-4 text-white" />,
      trend: { value: 15, isPositive: true },
      color: "purple" as const
    },
    {
      title: "Niveau Actuel",
      value: "5",
      description: "Expert en développement",
      icon: <Trophy className="h-4 w-4 text-white" />,
      trend: { value: 8, isPositive: true },
      color: "blue" as const
    },
    {
      title: "Temps d'Apprentissage",
      value: "156h",
      description: "Ce mois-ci",
      icon: <Clock className="h-4 w-4 text-white" />,
      trend: { value: 12, isPositive: true },
      color: "green" as const
    },
    {
      title: "Objectifs Atteints",
      value: "8/10",
      description: "Pour ce trimestre",
      icon: <Target className="h-4 w-4 text-white" />,
      trend: { value: 20, isPositive: true },
      color: "orange" as const
    },
    {
      title: "Badges Obtenus",
      value: "24",
      description: "Dont 3 légendaires",
      icon: <Star className="h-4 w-4 text-white" />,
      trend: { value: 33, isPositive: true },
      color: "pink" as const
    },
    {
      title: "Projets Créés",
      value: "7",
      description: "Portfolio en ligne",
      icon: <Zap className="h-4 w-4 text-white" />,
      trend: { value: 25, isPositive: true },
      color: "purple" as const
    }
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stats.map((stat, index) => (
        <div key={index} style={{ animationDelay: `${index * 100}ms` }} className="animate-fade-in">
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  )
}
