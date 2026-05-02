import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/db'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id } = await params
  const art = await prisma.articuloBlog.findUnique({ where: { id } })
  if (!art) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(art)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const art = await prisma.articuloBlog.update({
    where: { id },
    data: {
      titulo: body.titulo,
      slug: body.slug,
      resumen: body.resumen || body.descripcion || null,
      contenido: body.contenido,
      imagen: body.imagen ?? null,
      categoria: body.categoria,
      publicado: body.publicado,
    },
  })
  return NextResponse.json(art)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id } = await params
  await prisma.articuloBlog.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
