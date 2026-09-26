import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAdminAuth } from '@/lib/admin-auth'
import { z } from 'zod'

const schema = z.object({
  estado:          z.enum(['PENDIENTE', 'CONFIRMADO', 'EN_FABRICACION', 'ENTREGADO', 'CANCELADO']).optional(),
  notasAdmin:      z.string().optional(),
  señaConfirmada:  z.boolean().optional(),
})

export async function PUT(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdminAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id } = await params
  const raw = await req.json()
  const data = schema.parse(raw)

  const pedido = await prisma.pedido.update({ where: { id }, data })
  return NextResponse.json(pedido)
}
