import type { Metadata } from 'next'
import ComboPageClient from './ComboPageClient'

export const metadata: Metadata = {
  title: 'Combo Módulo + Piscina | Un Solo Plan de Financiación | EcoFiver',
  description: 'Comprá tu módulo habitacional y tu piscina de fibra de vidrio juntos y financiá el valor total en un solo plan. Simulá el combo, elegí tu plazo y financialo hasta 120 cuotas ajustadas por ICC, sin banco ni garante.',
  keywords: [
    'combo módulo piscina',
    'vivienda modular con piscina argentina',
    'módulo y piscina precio',
    'casa modular piscina',
    'combo módulo piscina financiación',
    'financiación módulo piscina',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/combo' },
  openGraph: {
    title: 'Combo Módulo + Piscina | Un Solo Plan de Financiación | EcoFiver',
    description: 'Módulo habitacional + piscina de fibra de vidrio en un solo plan de financiación. Hasta 120 cuotas ajustadas por ICC, sin banco.',
    url: 'https://ecomodulosypiscinas.com.ar/combo',
  },
}

export default function ComboPage() {
  return <ComboPageClient />
}
