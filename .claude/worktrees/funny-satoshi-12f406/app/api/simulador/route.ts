import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  productoId: z.string(),
  tipo: z.enum(['modulo', 'piscina']),
  cuotas: z.number().int().positive(),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { productoId, tipo, cuotas } = schema.parse(body)

    const [producto, coeficiente, multiplicadorConfig] = await Promise.all([
      tipo === 'modulo'
        ? prisma.modulo.findUnique({ where: { id: productoId } })
        : prisma.piscina.findUnique({ where: { id: productoId } }),
      prisma.coeficienteCuota.findFirst({ where: { cuotas, activo: true } }),
      prisma.configSitio.findUnique({ where: { clave: 'precio_lista_multiplicador' } }),
    ])

    if (!producto) return NextResponse.json({ error: 'Producto no encontrado' }, { status: 404 })

    const multiplicador = multiplicadorConfig ? parseFloat(multiplicadorConfig.valor) : 1.4
    const coef = coeficiente?.coef ?? 1.0

    const precioContado = producto.precio_contado
    const precioLista = Math.round(precioContado * multiplicador)
    const total = Math.round(precioLista * coef)
    const cuotaMensual = Math.ceil(total / cuotas)

    return NextResponse.json({
      precioContado,
      precioLista,
      coef,
      total,
      cuota: cuotaMensual,
      label: coeficiente?.label ?? `${cuotas} cuotas`,
    })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
