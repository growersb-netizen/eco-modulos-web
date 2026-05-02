import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

async function requireAdmin(session: any) {
  if (!session || session.user.rol !== 'admin') {
    return NextResponse.json({ error: 'Solo administradores' }, { status: 403 })
  }
  return null
}

export async function GET() {
  const session = await getServerSession(authOptions)
  const err = await requireAdmin(session)
  if (err) return err

  const usuarios = await prisma.usuario.findMany({
    select: { id: true, email: true, nombre: true, rol: true, activo: true, creadoEn: true },
    orderBy: { creadoEn: 'asc' },
  })
  return NextResponse.json(usuarios)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  const err = await requireAdmin(session)
  if (err) return err

  const body = await req.json()
  const hash = await bcrypt.hash(body.password, 12)

  const usuario = await prisma.usuario.create({
    data: {
      email: body.email,
      password: hash,
      nombre: body.nombre,
      rol: body.rol || 'editor',
      activo: true,
    },
    select: { id: true, email: true, nombre: true, rol: true, activo: true, creadoEn: true },
  })
  return NextResponse.json(usuario)
}
