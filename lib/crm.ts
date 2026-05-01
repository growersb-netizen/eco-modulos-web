const CRM_URL = process.env.CRM_API_URL
const CRM_KEY = process.env.CRM_API_KEY

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
}): Promise<void> {
  if (!CRM_URL || !CRM_KEY) return

  const controller = new AbortController()
  const timeout = setTimeout(() => controller.abort(), 3000)

  try {
    await fetch(`${CRM_URL}/api/leads/agent`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${CRM_KEY}`,
      },
      body: JSON.stringify({
        nombre: lead.nombre,
        telefono: lead.telefono,
        email: lead.email,
        localidad: lead.localidad,
        producto_interes: lead.producto_interes,
        plan_pago: lead.plan_pago,
        notas: lead.mensaje,
        fuente: lead.fuente,
        agente_asignado: lead.vendedor_asignado,
      }),
      signal: controller.signal,
    })
  } catch (err) {
    console.error('[CRM sync error]', err)
  } finally {
    clearTimeout(timeout)
  }
}
