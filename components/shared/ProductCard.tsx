import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, ChevronDown } from 'lucide-react'
import { formatPeso, calcularCuota } from '@/lib/utils'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

interface ProductCardProps {
  id: string
  nombre: string
  medida: string
  descripcion?: string
  usos?: string[]
  precio_contado: number
  precio_lista: number
  imagen?: string | null
  tipo: 'modulo' | 'piscina'
  destacada?: boolean
  coeficiente12?: number
}

export default function ProductCard({
  id,
  nombre,
  medida,
  descripcion,
  usos = [],
  precio_contado,
  precio_lista,
  imagen,
  tipo,
  destacada,
  coeficiente12 = 1.15,
}: ProductCardProps) {
  const cuota12 = calcularCuota(precio_lista, coeficiente12, 12)
  const vendedor = tipo === 'piscina' ? 'hernan' : 'daniel'
  const mensaje = `Hola, me interesa el ${nombre} (${medida}). ¿Podés darme más información?`

  return (
    <div
      className={cn(
        'bg-eco-bg-card border border-eco-border rounded-xl overflow-hidden flex flex-col transition-all hover:border-eco-green/40 hover:shadow-lg hover:shadow-eco-green/5 group',
        destacada && 'border-eco-teal/50'
      )}
    >
      {/* Imagen */}
      <div className="relative h-48 bg-eco-bg-surface overflow-hidden">
        {imagen ? (
          <Image
            src={imagen}
            alt={`${nombre} — ${medida}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-500"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-eco-text-muted text-sm">
            Sin imagen
          </div>
        )}
        {destacada && (
          <span className="absolute top-3 left-3 bg-eco-teal text-white text-xs font-bold px-2 py-1 rounded-full">
            DESTACADA
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div>
          <h3 className="text-lg font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>
            {nombre}
          </h3>
          <p className="text-eco-text-muted text-sm">{medida}</p>
        </div>

        {/* Usos */}
        {usos.length > 0 && (
          <div className="flex flex-wrap gap-1">
            {usos.slice(0, 4).map((uso) => (
              <span key={uso} className="bg-eco-bg-surface text-eco-text-muted text-xs px-2 py-0.5 rounded-full">
                {uso}
              </span>
            ))}
          </div>
        )}

        {/* Precios */}
        <div className="mt-auto">
          <p className="text-xs text-eco-text-muted">Precio contado</p>
          <p className="text-2xl font-extrabold text-eco-green" style={{ fontFamily: 'var(--font-display)' }}>
            {formatPeso(precio_contado)}
          </p>
          <p className="text-eco-text-muted text-xs line-through">{formatPeso(precio_lista)} precio lista</p>
          <p className="text-eco-teal text-sm font-semibold mt-1">
            12 cuotas de {formatPeso(cuota12)}/mes
          </p>
        </div>

        {/* CTA */}
        <a
          href={buildWhatsAppLink(vendedor, mensaje)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-semibold py-2.5 px-4 rounded-lg transition-colors text-sm mt-2"
        >
          <MessageCircle className="w-4 h-4" />
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  )
}
