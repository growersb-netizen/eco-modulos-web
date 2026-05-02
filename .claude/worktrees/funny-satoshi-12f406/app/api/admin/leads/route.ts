import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const estado = searchParams.get('estado')
  const vendedor = searchParams.get('vendedor')
  const producto = searchParams.get('producto')
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')

  const where: any = {}
  if (estado && estado !== 'all') where.estado = estado
  if (vendedor && vendedor !== 'all') where.vendedor_asignado = vendedor
  if (producto && producto !== 'all') {
    where.producto_interes = { contains: producto }
  }

  const [leads, total] = await Promise.all([
    prisma.lead.findMany({
      where,
      orderBy: { creadoEn: 'desc' },
      skip: (page - 1) * limit,
      take: limit,
    }),
    prisma.lead.count({ where }),
  ])

  return NextResponse.json({
    leads,
    total,
    page,
    pages: Math.ceil(total / limit),
  })
}
