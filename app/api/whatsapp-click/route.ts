import { NextResponse } from 'next/server'
import { syncLeadCRM } from '@/lib/crm'
import { siguienteVendedor } from '@/lib/utils'
import { z } from 'zod'

const schema = z.object({
  producto: z.string().default('general'),
  pagina: z.string().default('/'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = schema.parse(body)
    const vendedor = siguienteVendedor()

    // Registra el click como lead frío en el CRM. Turso no almacena datos de clientes.
    syncLeadCRM({
      producto_interes: data.producto,
      fuente: 'web_whatsapp',
      vendedor_asignado: vendedor,
      mensaje: `Click WhatsApp desde ${data.pagina}`,
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
