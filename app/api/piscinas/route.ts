import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'

export const revalidate = 0

export async function GET() {
  const piscinas = await prisma.piscina.findMany({
    where: { activo: true },
    orderBy: { orden: 'asc' },
  })
  return NextResponse.json(piscinas)
}
