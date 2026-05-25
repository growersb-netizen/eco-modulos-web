import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAdminAuth } from '@/lib/admin-auth'

export async function GET() {
  if (!await isAdminAuth()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const testimonios = await prisma.testimonio.findMany({ orderBy: { orden: 'asc' } })
  return NextResponse.json(testimonios)
}

export async function POST(req: Request) {
  if (!await isAdminAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const body = await req.json()
  const t = await prisma.testimonio.create({
    data: {
      nombre: body.nombre,
      localidad: body.localidad,
      producto: body.producto,
      texto: body.texto,
      estrellas: Number(body.estrellas) || 5,
      imagen: body.imagen || null,
      activo: body.activo !== false,
      orden: Number(body.orden) || 0,
    },
  })
  return NextResponse.json(t)
}
