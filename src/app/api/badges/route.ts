import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')

    if (!userId) {
      return NextResponse.json({ error: 'Missing userId' }, { status: 400 })
    }

    const userBadges = await prisma.userBadge.findMany({
      where: { userId },
      include: { badge: true },
      orderBy: { earnedAt: 'desc' }
    })

    const data = userBadges.map(ub => ({
      id: ub.id,
      name: ub.badge.name,
      description: ub.badge.description,
      rarity: ub.badge.rarity,
      points: ub.badge.points,
      imageUrl: ub.badge.imageUrl,
      earnedAt: ub.earnedAt
    }))

    return NextResponse.json({ badges: data })
  } catch (error) {
    console.error('GET /api/badges error:', error)
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
  }
}


