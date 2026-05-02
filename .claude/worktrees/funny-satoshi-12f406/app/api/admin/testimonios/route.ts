import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const testimonios = await prisma.testimonio.findMany({ orderBy: { orden: 'asc' } })
  return NextResponse.json(testimonios)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
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
