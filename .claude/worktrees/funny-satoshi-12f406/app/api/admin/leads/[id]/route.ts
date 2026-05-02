import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/db'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const lead = await prisma.lead.update({
    where: { id },
    data: {
      estado: body.estado,
      notas: body.notas,
      vendedor_asignado: body.vendedor_asignado,
    },
  })
  return NextResponse.json(lead)
}
