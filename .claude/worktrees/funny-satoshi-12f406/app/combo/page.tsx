import type { Metadata } from 'next'
import ComboPageClient from './ComboPageClient'

export const metadata: Metadata = {
  title: 'Combo Módulo + Piscina | 25% de Ahorro | Eco Módulos & Piscinas',
  description: 'Comprá tu módulo habitacional y tu piscina de fibra de vidrio juntos y ahorrás un 25%. Simulá el combo, elegí tu plan y financialo hasta 60 cuotas sin banco ni garante.',
  keywords: [
    'combo módulo piscina',
    'vivienda modular con piscina argentina',
    'módulo y piscina precio',
    'casa modular piscina',
    'combo descuento módulo piscina',
    'financiación módulo piscina',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/combo' },
  openGraph: {
    title: 'Combo Módulo + Piscina | 25% OFF | Eco Módulos & Piscinas',
    description: 'Módulo habitacional + piscina de fibra de vidrio con 25% de descuento. Financiación hasta 60 cuotas sin banco.',
    url: 'https://ecomodulosypiscinas.com.ar/combo',
  },
}

export default function ComboPage() {
  return <ComboPageClient />
}
