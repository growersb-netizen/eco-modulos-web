import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/db'
import { eliminarImagen } from '@/lib/r2'

export async function DELETE(_: Request, { params }: { params: Promise<{ id: string }> }) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const { id } = await params
  const obra = await prisma.obra.findUnique({ where: { id } })
  if (!obra) return NextResponse.json({ error: 'No encontrado' }, { status: 404 })

  // Borrar imagen de R2 si existe
  if (obra.imagen && obra.imagen.startsWith('https://')) {
    try {
      await eliminarImagen(obra.imagen)
    } catch {
      // No bloquear si falla el borrado de R2
    }
  }

  await prisma.obra.delete({ where: { id } })
  return NextResponse.json({ ok: true })
}
