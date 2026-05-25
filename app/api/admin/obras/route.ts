import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAdminAuth } from '@/lib/admin-auth'

export async function GET() {
  if (!await isAdminAuth()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const obras = await prisma.obra.findMany({ orderBy: { creadoEn: 'desc' } })
  return NextResponse.json(obras)
}

export async function POST(req: Request) {
  if (!await isAdminAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
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
