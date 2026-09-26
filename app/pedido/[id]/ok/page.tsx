import { prisma } from '@/lib/db'
import { formatPeso } from '@/lib/utils'
import { CheckCircle, MessageCircle } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Reserva confirmada | EcoFiver' }

export const revalidate = 0

type Props = { params: Promise<{ id: string }> }

const WA_LINK = 'https://wa.me/5491135164644?text=' + encodeURIComponent('Hola, acabo de hacer una reserva web y quiero coordinar los detalles.')

export default async function PedidoOkPage({ params }: Props) {
  const { id } = await params
  const pedido = await prisma.pedido.findUnique({ where: { id } })

  const fecha = pedido
    ? new Date(pedido.fechaInstalacion).toLocaleDateString('es-AR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric',
      })
    : ''

  const numero = id.slice(-6).toUpperCase()

  return (
    <div className="min-h-screen bg-eco-bg pt-28 pb-20 flex items-center justify-center px-4">
      <div className="max-w-lg w-full text-center">

        {/* Icono */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-eco-teal/10 border-2 border-eco-teal/30 flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-eco-teal" />
          </div>
        </div>

        <h1 className="text-4xl font-extrabold text-eco-text uppercase mb-3" style={{ fontFamily: 'var(--font-display)' }}>
          ¡Reserva registrada!
        </h1>
        <p className="text-eco-text-muted text-lg mb-8">
          Un asesor te contactará por WhatsApp en las próximas horas para confirmar.
        </p>

        {pedido && (
          <div className="bg-eco-bg-card border border-eco-border rounded-2xl p-6 text-left space-y-3 mb-8">
            <div className="flex justify-between items-center pb-3 border-b border-eco-border">
              <span className="text-xs text-eco-text-muted uppercase tracking-wider">N° de reserva</span>
              <span className="font-mono font-bold text-eco-text">ECO-{numero}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-eco-text-muted">Producto</span>
              <span className="text-sm font-semibold text-eco-text text-right">{pedido.productoNombre}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-eco-text-muted">Precio contado</span>
              <span className="text-sm font-bold text-eco-green">{formatPeso(pedido.precioContado)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-eco-text-muted">Fecha solicitada</span>
              <span className="text-sm font-semibold text-eco-text text-right capitalize">{fecha}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-eco-text-muted">Localidad</span>
              <span className="text-sm font-semibold text-eco-text">{pedido.localidad}</span>
            </div>
          </div>
        )}

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href={WA_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-eco-teal hover:bg-eco-teal-light text-white font-bold px-6 py-4 rounded-xl transition-colors shadow"
          >
            <MessageCircle className="w-5 h-5" />Escribinos por WhatsApp
          </a>
          <Link
            href="/"
            className="flex items-center justify-center gap-2 border border-eco-border text-eco-text font-semibold px-6 py-4 rounded-xl hover:bg-eco-bg-surface transition-colors"
          >
            Volver al inicio
          </Link>
        </div>
      </div>
    </div>
  )
}
