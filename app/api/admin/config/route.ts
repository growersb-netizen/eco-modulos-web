import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/db'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const items = await prisma.configSitio.findMany()
  const config: Record<string, string> = {}
  for (const item of items) config[item.clave] = item.valor
  return NextResponse.json(config)
}

export async function PUT(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body: Record<string, string> = await req.json()

  await Promise.all(
    Object.entries(body).map(([clave, valor]) =>
      prisma.configSitio.upsert({
        where: { clave },
        update: { valor: String(valor) },
        create: { clave, valor: String(valor) },
      })
    )
  )

  return NextResponse.json({ ok: true })
}
