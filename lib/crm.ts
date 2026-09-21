const CRM_URL = process.env.CRM_API_URL
const CRM_KEY = process.env.CRM_API_KEY

async function _fetchWithRetry(
  url: string,
  init: RequestInit,
  maxAttempts = 2,
): Promise<void> {
  for (let attempt = 1; attempt <= maxAttempts; attempt++) {
    const controller = new AbortController()
    const timeout = setTimeout(() => controller.abort(), 10000)
    try {
      await fetch(url, { ...init, signal: controller.signal })
      clearTimeout(timeout)
      return
    } catch (err) {
      clearTimeout(timeout)
      if (attempt === maxAttempts) throw err
      await new Promise(r => setTimeout(r, 1000 * attempt))
    }
  }
}

export async function syncLeadCRM(lead: {
  nombre?: string | null
  telefono?: string | null
  email?: string | null
  localidad?: string | null
  producto_interes: string
  plan_pago?: string | null
  mensaje?: string | null
  fuente: string
  vendedor_asignado: string
  // UTM tracking
  utm_source?: string | null
  utm_medium?: string | null
  utm_campaign?: string | null
}): Promise<void> {
  if (!CRM_URL || !CRM_KEY) return

  try {
    await _fetchWithRetry(`${CRM_URL}/api/leads`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Api-Key': CRM_KEY,
      },
      body: JSON.stringify({
        nombre: lead.nombre,
        telefono: lead.telefono,
        email: lead.email,
        localidad: lead.localidad,
        producto_interes: lead.producto_interes,
        forma_pago: lead.plan_pago || 'SIN_DEFINIR',
        notas: lead.mensaje,
        origen: 'WEB',
        agente_asignado: lead.vendedor_asignado,
        utm_source: lead.utm_source,
        utm_medium: lead.utm_medium,
        utm_campaign: lead.utm_campaign,
      }),
    })
  } catch (err) {
    console.error('[CRM sync error]', err)
  }
}

/** Simula cuotas usando la fórmula del CRM (sin Prisma). */
export async function simularCuotas(params: {
  tipo: 'MODULO' | 'PISCINA'
  precio: number
  cuotas?: number
}): Promise<Record<string, unknown> | null> {
  if (!CRM_URL) return null
  try {
    const url = new URL(`${CRM_URL}/api/simulador/cuotas`)
    url.searchParams.set('tipo', params.tipo)
    url.searchParams.set('precio', String(params.precio))
    if (params.cuotas) url.searchParams.set('cuotas', String(params.cuotas))

    const r = await fetch(url.toString(), { next: { revalidate: 300 } })
    if (!r.ok) return null
    return r.json()
  } catch {
    return null
  }
}
