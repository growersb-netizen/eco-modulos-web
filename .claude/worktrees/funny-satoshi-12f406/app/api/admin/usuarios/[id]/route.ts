import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/db'
import bcrypt from 'bcryptjs'

export async function PUT(req: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session || session.user.rol !== 'admin') {
    return NextResponse.json({ error: 'Solo administradores' }, { status: 403 })
  }
  const { id } = await params
  const body = await req.json()
  const data: Record<string, unknown> = {
    nombre: body.nombre,
    email: body.email,
    rol: body.rol,
    activo: body.activo,
  }

  if (body.password) {
    data.password = await bcrypt.hash(body.password, 12)
  }

  const usuario = await prisma.usuario.update({
    where: { id },
    data,
    select: { id: true, email: true, nombre: true, rol: true, activo: true, creadoEn: true },
  })
  return NextResponse.json(usuario)
}
