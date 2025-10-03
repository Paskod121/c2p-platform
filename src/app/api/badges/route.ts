import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    badges: [
      {
        id: 1,
        name: 'Initiation HTML',
        description: 'Premier pas dans le HTML',
        icon: '🏷️',
        rarity: 'common',
        requirements: 'Compléter le premier objectif HTML'
      },
      {
        id: 2,
        name: 'Maître CSS',
        description: 'Expert en styles CSS',
        icon: '🎨',
        rarity: 'rare',
        requirements: 'Compléter 5 objectifs CSS'
      },
      {
        id: 3,
        name: 'Développeur Full-Stack',
        description: 'Maîtrise complète du développement',
        icon: '🚀',
        rarity: 'legendary',
        requirements: 'Compléter tous les parcours'
      }
    ]
  })
}