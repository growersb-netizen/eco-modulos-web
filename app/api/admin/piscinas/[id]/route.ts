import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/db'

export async function GET(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id } = await params
  const piscina = await prisma.piscina.findUnique({ where: { id } })
  if (!piscina) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })
  return NextResponse.json(piscina)
}

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id } = await params
  const body = await req.json()
  const piscina = await prisma.piscina.update({
    where: { id },
    data: {
      nombre: body.nombre,
      medida: body.medida,
      descripcion: body.descripcion,
      usos: typeof body.usos === 'string' ? body.usos : JSON.stringify(body.usos || []),
      precio_contado: Number(body.precio_contado),
      precio_lista: Number(body.precio_lista) || Math.round(Number(body.precio_contado) * 1.4),
      imagen: body.imagen ?? null,
      destacada: body.destacada === true,
      activo: body.activo,
      orden: Number(body.orden),
    },
  })
  return NextResponse.json(piscina)
}

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id } = await params
  await prisma.piscina.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
