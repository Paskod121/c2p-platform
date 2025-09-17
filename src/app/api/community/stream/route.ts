import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// API Communauté: renvoie un flux synthétique d'activité récente
// - Sujets du forum récents
// - Replays récents
// - Badges récemment obtenus
// Cette API est volontairement compacte pour alimenter une barre "en direct" sur l'accueil

export async function GET() {
  try {
    const [sujetsRecents, replaysRecents, badgesRecents] = await Promise.all([
      prisma.forumTopic.findMany({
        take: 8,
        orderBy: { createdAt: 'desc' },
        include: {
          author: true,
          category: true,
        },
      }),
      prisma.replay.findMany({
        take: 6,
        orderBy: { createdAt: 'desc' },
      }),
      prisma.userBadge.findMany({
        take: 6,
        orderBy: { earnedAt: 'desc' },
        include: { user: true, badge: true },
      }),
    ])

    const flux = [
      ...sujetsRecents.map((t) => ({
        type: 'forum',
        id: t.id,
        titre: t.title,
        auteur: t.author?.name ?? 'Membre',
        categorie: t.category?.name ?? 'Général',
        date: t.createdAt,
      })),
      ...replaysRecents.map((r) => ({
        type: 'replay',
        id: r.id,
        titre: r.title,
        technologie: r.technology,
        date: r.createdAt,
      })),
      ...badgesRecents.map((b) => ({
        type: 'badge',
        id: b.id,
        badge: b.badge.name,
        membre: b.user.name ?? 'Membre',
        rarete: b.badge.rarity,
        date: b.earnedAt,
      })),
    ]

    // Tri global par date décroissante et coupe à 14 éléments max pour la barre
    flux.sort((a, b) => new Date(b.date as any).getTime() - new Date(a.date as any).getTime())
    const fluxLimite = flux.slice(0, 14)

    return NextResponse.json({ flux: fluxLimite })
  } catch (erreur) {
    console.error('GET /api/community/stream erreur:', erreur)
    return NextResponse.json({
      flux: [],
      erreur: 'Impossible de charger le flux communauté'
    }, { status: 500 })
  }
}


