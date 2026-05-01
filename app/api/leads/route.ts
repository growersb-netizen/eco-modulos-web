import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { syncLeadCRM } from '@/lib/crm'
import { siguienteVendedor } from '@/lib/utils'
import { z } from 'zod'

const schema = z.object({
  nombre: z.string().optional(),
  telefono: z.string().min(6),
  email: z.string().email().optional().or(z.literal('')),
  localidad: z.string().min(2),
  producto_interes: z.string().min(1),
  plan_pago: z.string().optional(),
  cuotas_simuladas: z.number().int().optional(),
  mensaje: z.string().optional(),
  fuente: z.string().default('web_formulario'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    const vendedor = siguienteVendedor()

    const lead = await prisma.lead.create({
      data: {
        nombre: data.nombre || null,
        telefono: data.telefono,
        email: data.email || null,
        localidad: data.localidad,
        producto_interes: data.producto_interes,
        plan_pago: data.plan_pago || null,
        cuotas_simuladas: data.cuotas_simuladas || null,
        mensaje: data.mensaje || null,
        fuente: data.fuente,
        vendedor_asignado: vendedor,
        estado: 'nuevo',
      },
    })

    // Sync CRM sin bloquear
    syncLeadCRM({
      nombre: data.nombre,
      telefono: data.telefono,
      email: data.email,
      localidad: data.localidad,
      producto_interes: data.producto_interes,
      plan_pago: data.plan_pago,
      mensaje: data.mensaje,
      fuente: data.fuente,
      vendedor_asignado: vendedor,
    })

    return NextResponse.json({ ok: true, id: lead.id })
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 400 })
  }
}
