import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import OrderForm from '@/components/shared/OrderForm'
import LocationModal from '@/components/shared/LocationModal'
import PriceWithFlete from '@/components/shared/PriceWithFlete'
import { getTipoPiscina } from '@/lib/flete'
import type { Metadata } from 'next'
import { formatPeso } from '@/lib/utils'

export const revalidate = 0

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const p = await prisma.piscina.findUnique({ where: { id } })
  if (!p) return {}
  return {
    title: `${p.nombre} — Piscina de Fibra | EcoFiver`,
    description: `Reservá tu ${p.nombre} (${p.medida}). ${formatPeso(p.precio_contado)} al contado. Instalación en el día. Garantía 10 años.`,
  }
}

const INCLUIDOS_PISCINA = [
  'Piscina de fibra de vidrio',
  'Equipo de filtrado completo',
  'Sistema de cañerías',
  'Instalación completa',
  'Garantía total 10 años',
  'Certificado de calidad premium',
]

export default async function PiscinaDetallePage({ params }: Props) {
  const { id } = await params
  const p = await prisma.piscina.findUnique({ where: { id, activo: true } })
  if (!p) notFound()

  const tipoProducto = getTipoPiscina(p.nombre, p.medida)

  return (
    <div className="pt-24 pb-20 min-h-screen bg-eco-bg">
      <LocationModal />
      <div className="max-w-5xl mx-auto px-4">

        {/* Breadcrumb */}
        <Link href="/piscinas" className="inline-flex items-center gap-1.5 text-eco-text-muted hover:text-eco-teal text-sm font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Columna izquierda: imagen + info */}
          <div>
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-eco-bg-surface mb-6 border border-eco-border">
              {p.imagen ? (
                <Image src={p.imagen} alt={p.nombre} fill className="object-contain p-2" sizes="(max-width: 1024px) 100vw, 50vw" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-7xl opacity-20">🏊</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-eco-text uppercase leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  {p.nombre}
                </h1>
                <p className="text-eco-text-muted mt-1">{p.medida}</p>
              </div>

              {p.descripcion && (
                <p className="text-eco-text-muted text-sm leading-relaxed">{p.descripcion}</p>
              )}

              <p className="text-eco-text-muted text-xs">
                <a href="/financiacion" className="text-eco-teal font-semibold hover:underline">
                  También disponible en planes de financiación →
                </a>
              </p>
            </div>
          </div>

          {/* Columna derecha: precio + form */}
          <div>
            <div className="sticky top-28 space-y-6">
              <PriceWithFlete
                precioContado={p.precio_contado}
                tipoProducto={tipoProducto}
                incluidos={INCLUIDOS_PISCINA}
              />
              <div>
                <h2 className="text-lg font-extrabold text-eco-text mb-4 uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                  Reservar instalación
                </h2>
                <OrderForm
                  producto={{
                    id:             p.id,
                    nombre:         p.nombre,
                    medida:         p.medida,
                    precio_contado: p.precio_contado,
                    precio_lista:   p.precio_lista,
                    tipo:           'PISCINA',
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
