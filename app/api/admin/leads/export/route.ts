import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/db'

export async function GET(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const { searchParams } = new URL(req.url)
  const estado = searchParams.get('estado')
  const vendedor = searchParams.get('vendedor')

  const where: any = {}
  if (estado && estado !== 'all') where.estado = estado
  if (vendedor && vendedor !== 'all') where.vendedor_asignado = vendedor

  const leads = await prisma.lead.findMany({
    where,
    orderBy: { creadoEn: 'desc' },
  })

  const header = [
    'nombre', 'telefono', 'email', 'localidad',
    'producto_interes', 'plan_pago', 'cuotas_simuladas',
    'fuente', 'vendedor_asignado', 'estado', 'notas', 'fecha',
  ].join(',')

  const rows = leads.map((l) =>
    [
      l.nombre || '',
      l.telefono || '',
      l.email || '',
      l.localidad || '',
      l.producto_interes,
      l.plan_pago || '',
      l.cuotas_simuladas || '',
      l.fuente,
      l.vendedor_asignado,
      l.estado,
      (l.notas || '').replace(/,/g, ';').replace(/\n/g, ' '),
      l.creadoEn.toISOString(),
    ].join(',')
  )

  const csv = [header, ...rows].join('\n')

  return new NextResponse(csv, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="leads-${new Date().toISOString().split('T')[0]}.csv"`,
    },
  })
}
