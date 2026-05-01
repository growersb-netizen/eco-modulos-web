'use client'

declare global {
  interface Window {
    gtag: (...args: any[]) => void
    fbq: (...args: any[]) => void
  }
}

export function trackEvent(
  evento: string,
  params?: Record<string, string | number>
) {
  if (typeof window === 'undefined') return
  if (window.gtag) {
    window.gtag('event', evento, params)
  }
}

export function trackLead(fuente: string, producto: string, vendedor: string) {
  trackEvent('lead_enviado', { fuente, producto, vendedor })
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', 'Lead')
  }
}

export function trackSimulador(
  producto: string,
  cuotas: number,
  precioEstimado: number
) {
  trackEvent('simulador_usado', {
    producto,
    cuotas,
    precio_estimado: precioEstimado,
  })
}

export function trackWhatsApp(producto: string, pagina: string, vendedor: string) {
  trackEvent('whatsapp_click', { producto, pagina, vendedor })
}

export function trackCalendly() {
  trackEvent('calendly_abierto')
}
