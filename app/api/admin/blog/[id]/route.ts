import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAdminAuth } from '@/lib/admin-auth'

export async function GET(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdminAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id } = await params
  const art = await prisma.articuloBlog.findUnique({ where: { id } })
  if (!art) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(art)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdminAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
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

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdminAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id } = await params
  await prisma.articuloBlog.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
