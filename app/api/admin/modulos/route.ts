import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const modulos = await prisma.modulo.findMany({ orderBy: { orden: 'asc' } })
  return NextResponse.json(modulos)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = await req.json()
  const modulo = await prisma.modulo.create({
    data: {
      nombre: body.nombre,
      medida: body.medida,
      descripcion: body.descripcion || '',
      usos: typeof body.usos === 'string' ? body.usos : JSON.stringify(body.usos || []),
      precio_contado: Number(body.precio_contado),
      precio_lista: Number(body.precio_lista) || Math.round(Number(body.precio_contado) * 1.4),
      imagen: body.imagen || null,
      activo: body.activo !== false,
      orden: Number(body.orden) || 0,
    },
  })
  return NextResponse.json(modulo)
}
