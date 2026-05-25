import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAdminAuth } from '@/lib/admin-auth'

export async function GET() {
  if (!await isAdminAuth()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const coefs = await prisma.coeficienteCuota.findMany({ orderBy: { cuotas: 'asc' } })
  return NextResponse.json(coefs)
}

export async function PUT(req: Request) {
  if (!await isAdminAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

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
