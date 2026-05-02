import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const coefs = await prisma.coeficienteCuota.findMany({ orderBy: { cuotas: 'asc' } })
  return NextResponse.json(coefs)
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body: Array<{ id: string; cuotas: number; coef: number; label: string; activo: boolean }> =
    await req.json()

  await Promise.all(
    body.map((c) =>
      prisma.coeficienteCuota.update({
        where: { id: c.id },
        data: { cuotas: c.cuotas, coef: c.coef, label: c.label, activo: c.activo },
      })
    )
  )

  return NextResponse.json({ ok: true })
}
