import type { Metadata } from 'next'
import ComboPageClient from './ComboPageClient'

export const metadata: Metadata = {
  title: 'Combos Vivienda + Piscina | Promo Octubre 2026 | EcoFiver',
  description: '4 combos cerrados de vivienda modular + piscina de fibra con precio promocional de octubre. Instalación eléctrica, baños, bordes atérmicos y flete incluidos. Financiación directa hasta 120 cuotas, sin banco ni garante.',
  keywords: [
    'combo vivienda piscina octubre',
    'vivienda modular con piscina argentina',
    'casa modular y piscina precio',
    'combo módulo piscina financiación',
    'piscina y vivienda en cuotas sin banco',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/combo' },
  openGraph: {
    title: 'Combos Vivienda + Piscina | Promo Octubre | EcoFiver',
    description: '4 combos cerrados de vivienda modular + piscina. Instalación eléctrica, baños, bordes atérmicos y flete incluidos. Hasta 120 cuotas sin banco.',
    url: 'https://ecomodulosypiscinas.com.ar/combo',
  },
}

export default function ComboPage() {
  return <ComboPageClient />
}
