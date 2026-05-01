import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const schema = z.object({
  producto: z.string().default('general'),
  vendedor: z.string().default('stefania'),
  pagina: z.string().default('/'),
})

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const data = schema.parse(body)

    await prisma.lead.create({
      data: {
        producto_interes: data.producto,
        fuente: 'web_whatsapp',
        vendedor_asignado: data.vendedor,
        estado: 'nuevo',
      },
    })

    return NextResponse.json({ ok: true })
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 })
  }
}
