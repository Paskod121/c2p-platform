'use client'

import { 
  Play, 
  CheckCircle, 
  Clock, 
  Target,
  ArrowRight,
  BookOpen,
  Code,
  Database
} from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

interface Course {
  id: string
  title: string
  technology: string
  level: 'BEGINNER' | 'INTERMEDIATE' | 'ADVANCED' | 'EXPERT'
  progress: number
  totalLessons: number
  completedLessons: number
  estimatedTime: number
  imageUrl?: string
  isActive?: boolean
}

const getTechnologyIcon = (technology: string) => {
  switch (technology.toLowerCase()) {
    case 'python':
      return <Code className="h-5 w-5 text-blue-600" />
    case 'javascript':
      return <Code className="h-5 w-5 text-yellow-500" />
    case 'react':
      return <Code className="h-5 w-5 text-blue-500" />
    case 'database':
      return <Database className="h-5 w-5 text-green-600" />
    default:
      return <BookOpen className="h-5 w-5 text-purple-600" />
  }
}

const getLevelColor = (level: string) => {
  switch (level) {
    case 'BEGINNER':
      return 'bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 border-green-200 dark:border-green-700'
    case 'INTERMEDIATE':
      return 'bg-blue-100 dark:bg-blue-900/20 text-blue-800 dark:text-blue-400 border-blue-200 dark:border-blue-700'
    case 'ADVANCED':
      return 'bg-orange-100 dark:bg-orange-900/20 text-orange-800 dark:text-orange-400 border-orange-200 dark:border-orange-700'
    case 'EXPERT':
      return 'bg-purple-100 dark:bg-purple-900/20 text-purple-800 dark:text-purple-400 border-purple-200 dark:border-purple-700'
    default:
      return 'bg-gray-100 dark:bg-gray-800 text-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700'
  }
}

const getLevelText = (level: string) => {
  switch (level) {
    case 'BEGINNER':
      return 'Débutant'
    case 'INTERMEDIATE':
      return 'Intermédiaire'
    case 'ADVANCED':
      return 'Avancé'
    case 'EXPERT':
      return 'Expert'
    default:
      return level
  }
}

export function CourseProgress() {
  const courses: Course[] = [
    {
      id: '1',
      title: 'Maîtrisez Python de A à Z',
      technology: 'Python',
      level: 'INTERMEDIATE',
      progress: 75,
      totalLessons: 24,
      completedLessons: 18,
      estimatedTime: 45,
      isActive: true
    },
    {
      id: '2',
      title: 'React.js Avancé avec TypeScript',
      technology: 'React',
      level: 'ADVANCED',
      progress: 45,
      totalLessons: 18,
      completedLessons: 8,
      estimatedTime: 30,
      isActive: true
    },
    {
      id: '3',
      title: 'Base de Données PostgreSQL',
      technology: 'Database',
      level: 'BEGINNER',
      progress: 100,
      totalLessons: 12,
      completedLessons: 12,
      estimatedTime: 20,
      isActive: false
    },
    {
      id: '4',
      title: 'JavaScript Moderne ES6+',
      technology: 'JavaScript',
      level: 'INTERMEDIATE',
      progress: 20,
      totalLessons: 20,
      completedLessons: 4,
      estimatedTime: 35,
      isActive: false
    }
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Mes Cours en Cours</h2>
          <p className="text-gray-600 dark:text-gray-300 mt-1">Continuez votre apprentissage et progressez vers l'expertise</p>
        </div>
        <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
          Voir Tous les Cours
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {courses.map((course, index) => (
          <div key={course.id} className="animate-fade-in" style={{ animationDelay: `${index * 100}ms` }}>
            <Card className={`hover:shadow-lg dark:hover:shadow-purple-500/10 transition-all duration-300 hover:-translate-y-1 ${
              course.isActive ? 'ring-2 ring-purple-200 dark:ring-purple-700 bg-gradient-to-br from-white to-purple-50 dark:from-gray-800 dark:to-purple-900/20' : ''
            }`}>
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800">
                      {getTechnologyIcon(course.technology)}
                    </div>
                    <div>
                      <CardTitle className="text-lg font-semibold text-gray-900 dark:text-white">
                        {course.title}
                      </CardTitle>
                      <div className="flex items-center space-x-2 mt-1">
                        <Badge variant="outline" className={getLevelColor(course.level)}>
                          {getLevelText(course.level)}
                        </Badge>
                        <Badge variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                          {course.technology}
                        </Badge>
                      </div>
                    </div>
                  </div>
                  {course.isActive && (
                    <div className="animate-pulse">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    </div>
                  )}
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Barre de Progression */}
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-300">Progression</span>
                    <span className="font-medium text-gray-900 dark:text-white">{course.progress}%</span>
                  </div>
                  <div className="relative">
                    <Progress 
                      value={course.progress} 
                      className="h-2 bg-gray-200 dark:bg-gray-700"
                    />
                  </div>
                </div>

                {/* Statistiques */}
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {course.completedLessons}/{course.totalLessons}
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Leçons</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {course.estimatedTime}h
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Restant</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-gray-900 dark:text-white">
                      {Math.round((course.completedLessons / course.totalLessons) * 100)}%
                    </div>
                    <div className="text-xs text-gray-600 dark:text-gray-300">Terminé</div>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  {course.isActive ? (
                    <Button className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      <Play className="mr-2 h-4 w-4" />
                      Continuer
                    </Button>
                  ) : (
                    <Button variant="outline" className="flex-1 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-800">
                      <CheckCircle className="mr-2 h-4 w-4" />
                      Cours Terminé
                    </Button>
                  )}
                  <Button variant="ghost" size="icon" className="text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800">
                    <Target className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </div>
  )
}
