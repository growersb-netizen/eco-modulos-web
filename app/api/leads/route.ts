import { NextRequest, NextResponse } from 'next/server'
import { syncLeadCRM } from '@/lib/crm'
import { siguienteVendedor } from '@/lib/utils'
import { z } from 'zod'

const schema = z.object({
  nombre: z.string().optional(),
  telefono: z.string().min(6),
  email: z.string().email().optional().or(z.literal('')),
  localidad: z.string().min(2).optional().or(z.literal('')),
  producto_interes: z.string().min(1),
  plan_pago: z.string().optional(),
  cuotas_simuladas: z.number().int().optional(),
  mensaje: z.string().optional(),
  fuente: z.string().default('web_formulario'),
  // UTM desde el cliente (si el front los envía)
  utm_source: z.string().optional(),
  utm_medium: z.string().optional(),
  utm_campaign: z.string().optional(),
})

/** Extrae UTM de cookies o del body. Prioriza los del body (el front los puede enviar). */
function extractUtm(req: NextRequest, body: Record<string, unknown>) {
  const fromBody = {
    utm_source: body.utm_source as string | undefined,
    utm_medium: body.utm_medium as string | undefined,
    utm_campaign: body.utm_campaign as string | undefined,
  }
  // Si el front no envió UTMs, intentar leerlos de cookies (guardados por el front en la primera visita)
  if (!fromBody.utm_source) {
    fromBody.utm_source = req.cookies.get('utm_source')?.value
    fromBody.utm_medium = req.cookies.get('utm_medium')?.value
    fromBody.utm_campaign = req.cookies.get('utm_campaign')?.value
  }
  // Fallback: inferir source del referer
  if (!fromBody.utm_source) {
    const referer = req.headers.get('referer') || ''
    if (referer.includes('google')) fromBody.utm_source = 'google'
    else if (referer.includes('facebook') || referer.includes('fb.com')) fromBody.utm_source = 'facebook'
    else if (referer.includes('instagram')) fromBody.utm_source = 'instagram'
    else if (referer) fromBody.utm_source = 'referral'
    else fromBody.utm_source = 'direct'
    fromBody.utm_medium = fromBody.utm_medium || 'organic'
  }
  return fromBody
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.json()
    const data = schema.parse(rawBody)
    const vendedor = siguienteVendedor()
    const utm = extractUtm(req, rawBody)

    // Único destino: CRM. Turso no almacena datos de clientes.
    await syncLeadCRM({
      nombre: data.nombre,
      telefono: data.telefono,
      email: data.email,
      localidad: data.localidad || undefined,
      producto_interes: data.producto_interes,
      plan_pago: data.plan_pago,
      mensaje: data.mensaje,
      fuente: data.fuente,
      vendedor_asignado: vendedor,
      utm_source: utm.utm_source,
      utm_medium: utm.utm_medium,
      utm_campaign: utm.utm_campaign,
    })

    return NextResponse.json({ ok: true })
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : 'Error desconocido'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
