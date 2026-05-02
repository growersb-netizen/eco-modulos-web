import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const obras = await prisma.obra.findMany({ orderBy: { creadoEn: 'desc' } })
  return NextResponse.json(obras)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const body = await req.json()
  const obra = await prisma.obra.create({
    data: {
      titulo: body.titulo,
      localidad: body.localidad,
      provincia: body.provincia,
      tipo: body.tipo || 'modulo',
      imagen: body.imagen || null,
      descripcion: body.descripcion || null,
      activo: true,
    },
  })
  return NextResponse.json(obra)
}
