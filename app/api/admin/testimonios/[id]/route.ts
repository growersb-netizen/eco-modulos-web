import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/db'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const t = await prisma.testimonio.update({
    where: { id },
    data: {
      nombre: body.nombre,
      localidad: body.localidad,
      producto: body.producto,
      texto: body.texto,
      estrellas: Number(body.estrellas),
      imagen: body.imagen ?? null,
      activo: body.activo,
      orden: Number(body.orden),
    },
  })
  return NextResponse.json(t)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id } = await params
  await prisma.testimonio.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
