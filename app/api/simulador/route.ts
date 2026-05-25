import { NextResponse } from 'next/server'
import { z } from 'zod'
import { simularCuotas } from '@/lib/crm'

const schema = z.object({
  productoId: z.string().optional(),
  tipo: z.enum(['modulo', 'piscina', 'MODULO', 'PISCINA']),
  cuotas: z.number().int().positive().optional(),
  precio: z.number().positive().optional(),
})

const FACTOR: Record<string, number> = { modulo: 2, piscina: 1.5, MODULO: 2, PISCINA: 1.5 }
const PLAZOS = [6, 12, 18, 24, 36, 48]

/** Fórmula local de fallback cuando el CRM no responde. */
function calcularLocal(precio: number, tipo: string, cuotas?: number) {
  const factor = FACTOR[tipo] ?? 2
  if (cuotas) {
    const cuota = precio / (cuotas + factor)
    const ingreso = factor * cuota
    return {
      precioContado: precio,
      cuotas,
      cuota: Math.round(cuota),
      ingreso_inicial: Math.round(ingreso),
      total: Math.round(ingreso + cuota * cuotas),
    }
  }
  const tabla = PLAZOS.map((n) => {
    const c = precio / (n + factor)
    const ing = factor * c
    return { cuotas: n, cuota: Math.round(c), ingreso_inicial: Math.round(ing), total: Math.round(ing + c * n) }
  })
  return { precioContado: precio, tabla }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { tipo, cuotas, precio } = schema.parse(body)

    // Si viene precio directo, usar fórmula del CRM (o fallback local)
    if (precio) {
      const tipoNorm = (tipo.toUpperCase()) as 'MODULO' | 'PISCINA'
      const crmData = await simularCuotas({ tipo: tipoNorm, precio, cuotas })
      if (crmData) return NextResponse.json(crmData)
      // Fallback local si CRM no responde
      return NextResponse.json(calcularLocal(precio, tipo, cuotas))
    }

    // Compatibilidad con el flujo anterior que busca producto por ID en Prisma
    // En caso de que productoId no exista en Prisma (DB vacía o migración), usamos fallback
    try {
      const { prisma } = await import('@/lib/db')
      const { productoId } = body as { productoId?: string }
      if (productoId && cuotas) {
        const producto = await (tipo === 'modulo' || tipo === 'MODULO'
          ? prisma.modulo.findUnique({ where: { id: productoId } })
          : prisma.piscina.findUnique({ where: { id: productoId } }))

        if (producto) {
          const pc = producto.precio_contado
          const pl = producto.precio_lista
          const tipoNorm = (tipo.toUpperCase()) as 'MODULO' | 'PISCINA'
          const crmData = await simularCuotas({ tipo: tipoNorm, precio: pc, cuotas })
          if (crmData) return NextResponse.json({ ...crmData, precioContado: pc, precioLista: pl })
          const local = calcularLocal(pc, tipo, cuotas)
          return NextResponse.json({
            ...local,
            precioContado: pc,
            precioLista: pl,
            coef: 1,
            label: `${cuotas} cuotas`,
          })
        }
      }
    } catch {
      // Prisma no disponible — ok, seguimos con fallback
    }

    // Fallback genérico — nunca retornar 400 al simulador para evitar crash en cliente
    return NextResponse.json({ error: 'Sin datos suficientes para simular' }, { status: 422 })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}

/** GET simple: /api/simulador?tipo=MODULO&precio=5000000&cuotas=24 */
export async function GET(req: Request) {
  const url = new URL(req.url)
  const tipo = url.searchParams.get('tipo') || 'MODULO'
  const precio = parseFloat(url.searchParams.get('precio') || '0')
  const cuotas = url.searchParams.get('cuotas') ? parseInt(url.searchParams.get('cuotas')!) : undefined

  if (!precio) return NextResponse.json({ error: 'precio requerido' }, { status: 400 })

  const tipoNorm = (tipo.toUpperCase()) as 'MODULO' | 'PISCINA'
  const crmData = await simularCuotas({ tipo: tipoNorm, precio, cuotas })
  if (crmData) return NextResponse.json(crmData)
  return NextResponse.json(calcularLocal(precio, tipo, cuotas))
}
