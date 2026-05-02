import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const revalidate = 0

export async function GET() {
  const modulos = await prisma.modulo.findMany({
    where: { activo: true },
    orderBy: { orden: 'asc' },
  })
  return NextResponse.json(modulos)
}
