const VENDEDORES = {
  stefania: process.env.WA_STEFANIA || '5491168733406',
  hernan: process.env.WA_HERNAN || '5491168733406',
  daniel: process.env.WA_DANIEL || '5491168733406',
}

export function getVendedorPorProducto(producto: string): keyof typeof VENDEDORES {
  const p = producto.toLowerCase()
  if (p.includes('piscin')) return 'hernan'
  if (p.includes('combo')) return 'daniel'
  if (p.includes('modulo') || p.includes('módulo')) return 'daniel'
  return 'stefania'
}

export function buildWhatsAppLink(
  vendedor: keyof typeof VENDEDORES,
  mensaje?: string
): string {
  const numero = VENDEDORES[vendedor]
  const base = `https://wa.me/${numero}`
  if (!mensaje) return base
  return `${base}?text=${encodeURIComponent(mensaje)}`
}

export function buildMensajeSimulador(
  producto: string,
  cuotas: number,
  plan: string,
  cuotaMensual: string
): string {
  return `Hola, simulé ${producto} en ${cuotas} cuotas (${plan}). Me quedan $${cuotaMensual}/mes. Quiero asesorarme.`
}

export { VENDEDORES }
