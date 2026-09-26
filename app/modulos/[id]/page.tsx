import { notFound } from 'next/navigation'
import { prisma } from '@/lib/db'
import Image from 'next/image'
import { formatPeso } from '@/lib/utils'
import { ShieldCheck, Star, CalendarCheck, BadgeDollarSign, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import OrderForm from '@/components/shared/OrderForm'
import type { Metadata } from 'next'

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

export default async function ModuloDetallePage({ params }: Props) {
  const { id } = await params
  const m = await prisma.modulo.findUnique({ where: { id, activo: true } })
  if (!m) notFound()

  const ahorro = m.precio_lista - m.precio_contado
  const cuota12 = Math.round(m.precio_lista / 14)

  return (
    <div className="pt-24 pb-20 min-h-screen bg-eco-bg">
      <div className="max-w-5xl mx-auto px-4">

        {/* Breadcrumb */}
        <Link href="/modulos" className="inline-flex items-center gap-1.5 text-eco-text-muted hover:text-eco-teal text-sm font-medium mb-8 transition-colors">
          <ArrowLeft className="w-4 h-4" />Volver al catálogo
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Columna izquierda */}
          <div>
            <div className="relative h-72 sm:h-96 rounded-2xl overflow-hidden bg-eco-bg-surface mb-6 border border-eco-border">
              {m.imagen ? (
                <Image src={m.imagen} alt={m.nombre} fill className="object-cover" sizes="(max-width: 1024px) 100vw, 50vw" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-7xl opacity-20">🏠</span>
                </div>
              )}
            </div>

            <div className="space-y-4">
              <div>
                <h1 className="text-4xl font-extrabold text-eco-text uppercase leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
                  {m.nombre}
                </h1>
                <p className="text-eco-text-muted mt-1">{m.medida}</p>
              </div>

              <div className="bg-eco-bg-card border border-eco-border rounded-2xl p-5">
                <p className="text-xs text-eco-text-muted uppercase tracking-wider mb-1">Precio lista (tarjeta)</p>
                <p className="text-eco-text-muted line-through text-lg">{formatPeso(m.precio_lista)}</p>
                <div className="flex items-end gap-3 mt-2">
                  <div>
                    <p className="text-xs font-bold text-eco-teal uppercase tracking-wider">Precio contado / transferencia</p>
                    <p className="text-4xl font-extrabold text-eco-green leading-none" style={{ fontFamily: 'var(--font-display)' }}>
                      {formatPeso(m.precio_contado)}
                    </p>
                  </div>
                  <span className="bg-eco-teal/10 text-eco-teal text-xs font-bold px-3 py-1.5 rounded-full border border-eco-teal/20 mb-1">
                    Ahorrás {formatPeso(ahorro)}
                  </span>
                </div>
                <p className="text-eco-text-muted text-sm mt-3">
                  O financiá en <span className="font-semibold text-eco-text">12 cuotas de {formatPeso(cuota12)}/mes</span> sin banco ni garante.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2">
                {[
                  { icon: BadgeDollarSign, label: 'Pagás al recibir' },
                  { icon: ShieldCheck,     label: 'Garantía 10 años' },
                  { icon: Star,            label: 'Cert. Calidad Premium' },
                  { icon: CalendarCheck,   label: 'Entrega en el día' },
                ].map(({ icon: Icon, label }) => (
                  <div key={label} className="flex items-center gap-2 bg-eco-bg-surface border border-eco-border rounded-xl px-3 py-2.5">
                    <Icon className="w-4 h-4 text-eco-teal flex-shrink-0" />
                    <span className="text-xs font-semibold text-eco-text">{label}</span>
                  </div>
                ))}
              </div>

              {m.descripcion && (
                <p className="text-eco-text-muted text-sm leading-relaxed">{m.descripcion}</p>
              )}
            </div>
          </div>

          {/* Columna derecha: formulario */}
          <div>
            <div className="sticky top-28">
              <h2 className="text-xl font-extrabold text-eco-text mb-6 uppercase" style={{ fontFamily: 'var(--font-display)' }}>
                Reservar módulo
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
  )
}
