import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAdminAuth } from '@/lib/admin-auth'
import { eliminarImagen } from '@/lib/r2'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdminAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const obra = await prisma.obra.update({
    where: { id },
    data: {
      titulo: body.titulo,
      localidad: body.localidad,
      provincia: body.provincia,
      tipo: body.tipo,
      imagen: body.imagen ?? null,
      descripcion: body.descripcion ?? null,
      activo: body.activo,
    },
  })
  return NextResponse.json(obra)
}

export async function DELETE(req: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!await isAdminAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id } = await params
  const obra = await prisma.obra.findUnique({ where: { id } })
  if (!obra) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })

  if (obra.imagen && obra.imagen.startsWith('https://')) {
    try { await eliminarImagen(obra.imagen) } catch { /* ignore */ }
  }

  await prisma.obra.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
