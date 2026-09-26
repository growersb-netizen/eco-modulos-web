import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import Image from 'next/image'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import OrderForm from '@/components/shared/OrderForm'
import LocationModal from '@/components/shared/LocationModal'
import PriceWithFlete from '@/components/shared/PriceWithFlete'
import { getTipoModulo } from '@/lib/flete'
import type { Metadata } from 'next'
import { formatPeso } from '@/lib/utils'

export const revalidate = 0

type Props = { params: Promise<{ id: string }> }

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params
  const m = await prisma.modulo.findUnique({ where: { id } })
  if (!m) return {}
  return {
    title: `${m.nombre} — Módulo Habitacional | EcoFiver`,
    description: `Reservá tu ${m.nombre} (${m.medida}). ${formatPeso(m.precio_contado)} al contado. Llave en mano con terminaciones.`,
  }
}

const INCLUIDOS_MODULO = [
  'Módulo Wood Frame terminado',
  'Baño completo operativo (incluido desde 12 m²)',
  'Kitchenette con mesada y muebles (incluida desde 18 m²)',
  'Instalación eléctrica y sanitaria interna',
  'Obra Blanca terminada',
  'Instalación en el día (módulos hasta 18 m²)',
]

export default async function ModuloDetallePage({ params }: Props) {
  const { id } = await params
  const m = await prisma.modulo.findUnique({ where: { id, activo: true } })
  if (!m) notFound()

  const tipoProducto = getTipoModulo(m.medida)

  return (
    <div className="pt-24 pb-20 min-h-screen bg-eco-bg">
      <LocationModal />
      <div className="max-w-5xl mx-auto px-4">

        {/* Breadcrumb */}
        <Link href="/modulos" className="inline-flex items-center gap-1.5 text-eco-text-muted hover:text-eco-teal text-sm font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {/* Columna izquierda: imagen + info */}
          <div>
            <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden bg-eco-bg-surface mb-6 border border-eco-border">
              {m.imagen ? (
                <Image src={m.imagen} alt={m.nombre} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-7xl opacity-20">🏠</span>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-eco-text uppercase leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  {m.nombre}
                </h1>
                <p className="text-eco-text-muted mt-1">{m.medida}</p>
              </div>

              {m.descripcion && (
                <p className="text-eco-text-muted text-sm leading-relaxed">{m.descripcion}</p>
              )}

              <p className="text-eco-text-muted text-xs">
                <a href="/financiacion" className="text-eco-teal font-semibold hover:underline">
                  También disponible en planes de financiación hasta 120 cuotas →
                </a>
              </p>
            </div>
          </div>

          {/* Columna derecha: precio + form */}
          <div>
            <div className="sticky top-28 space-y-6">
              <PriceWithFlete
                precioContado={m.precio_contado}
                tipoProducto={tipoProducto}
                incluidos={INCLUIDOS_MODULO}
              />
              <div>
                <h2 className="text-lg font-extrabold text-eco-text mb-4 uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                  Hacer mi reserva
                </h2>
                <OrderForm
                  producto={{
                    id:             m.id,
                    nombre:         m.nombre,
                    medida:         m.medida,
                    precio_contado: m.precio_contado,
                    precio_lista:   m.precio_lista,
                    tipo:           'MODULO',
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
