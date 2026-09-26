import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAdminAuth } from '@/lib/admin-auth'

export async function GET(req: NextRequest) {
  if (!await isAdminAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const pedidos = await prisma.pedido.findMany({
    orderBy: { createdAt: 'desc' },
  })
  return NextResponse.json(pedidos)
}
