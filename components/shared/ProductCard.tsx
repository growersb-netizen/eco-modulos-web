import Image from 'next/image'
import { MessageCircle } from 'lucide-react'
import { formatPeso } from '@/lib/utils'
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
}

// Misma fórmula que landing-financiacion: cuota = precio de lista / (cuotas + 2)
const FACTOR_INGRESO = 2

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
}: ProductCardProps) {
  const cuota12 = Math.round(precio_lista / (12 + FACTOR_INGRESO))
  const vendedor = tipo === 'piscina' ? 'hernan' : 'daniel'
  const mensaje = `Hola, me interesa el ${nombre} (${medida}). ¿Me puede dar más información?`

  return (
    <div
      className={cn(
        'card-premium flex flex-col group overflow-hidden',
        destacada && 'ring-1 ring-eco-teal/30',
      )}
    >
      {/* Image */}
      <div className="relative h-52 bg-eco-bg-surface overflow-hidden">
        {imagen ? (
          <Image
            src={imagen}
            alt={`${nombre} — ${medida}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        ) : (
          /* Premium placeholder — subtle geometric illustration */
          <div className="w-full h-full flex flex-col items-center justify-center bg-gradient-to-br from-eco-bg to-eco-bg-surface relative overflow-hidden">
            {/* Background grid */}
            <div className="absolute inset-0 hero-grid-pattern opacity-30" />
            {tipo === 'modulo' ? (
              <svg viewBox="0 0 140 90" className="w-28 h-20 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="15" y="38" width="110" height="48" rx="3" stroke="#2A5F40" strokeWidth="1.5" fill="#2A5F40" fillOpacity="0.06"/>
                <polygon points="70,8 10,40 130,40" fill="#2A5F40" fillOpacity="0.08" stroke="#2A5F40" strokeWidth="1.5" strokeLinejoin="round"/>
                <rect x="55" y="56" width="30" height="30" rx="1.5" stroke="#2A5F40" strokeWidth="1.2" fill="#2A5F40" fillOpacity="0.08"/>
                <rect x="22" y="52" width="20" height="16" rx="1.5" stroke="#1A6E65" strokeWidth="1.2" fill="#1A6E65" fillOpacity="0.08"/>
                <rect x="98" y="52" width="20" height="16" rx="1.5" stroke="#1A6E65" strokeWidth="1.2" fill="#1A6E65" fillOpacity="0.08"/>
                <line x1="15" y1="86" x2="125" y2="86" stroke="#2A5F40" strokeWidth="1" strokeDasharray="5,4" opacity="0.3"/>
              </svg>
            ) : (
              <svg viewBox="0 0 140 90" className="w-28 h-20 relative z-10" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="70" cy="62" rx="52" ry="24" stroke="#1A6E65" strokeWidth="1.5" fill="#1A6E65" fillOpacity="0.06"/>
                <path d="M18 62 Q26 24 70 20 Q114 24 122 62" stroke="#1A6E65" strokeWidth="1.5" fill="#1A6E65" fillOpacity="0.08"/>
                <ellipse cx="70" cy="62" rx="34" ry="15" stroke="#2A5F40" strokeWidth="1" fill="#2A5F40" fillOpacity="0.06" strokeDasharray="4,3"/>
                <line x1="70" y1="20" x2="70" y2="77" stroke="#1A6E65" strokeWidth="0.8" opacity="0.25" strokeDasharray="4,3"/>
                <line x1="18" y1="62" x2="122" y2="62" stroke="#1A6E65" strokeWidth="0.8" opacity="0.25" strokeDasharray="4,3"/>
              </svg>
            )}
            <p className="text-eco-green text-xs font-semibold uppercase tracking-widest opacity-50 mt-2 relative z-10">
              {tipo === 'modulo' ? 'Módulo Wood Frame' : 'Fibra de vidrio'}
            </p>
          </div>
        )}
        {destacada && (
          <span className="absolute top-3 left-3 bg-eco-teal text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-lg">
            Más popular
          </span>
        )}
        {/* Hover overlay gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col gap-4 flex-1">
        <div>
          <h3
            className="text-xl font-extrabold text-eco-text leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {nombre}
          </h3>
          <p className="text-eco-text-muted text-sm mt-0.5">{medida}</p>
        </div>

        {descripcion && (
          <p className="text-eco-text-muted text-sm leading-relaxed line-clamp-2">{descripcion}</p>
        )}

        {/* Tags */}
        {usos.length > 0 && (
          <div className="flex flex-wrap gap-1.5">
            {usos.slice(0, 4).map((uso) => (
              <span
                key={uso}
                className="bg-eco-bg-surface text-eco-text-muted text-[11px] font-medium px-2.5 py-0.5 rounded-full border border-eco-border"
              >
                {uso}
              </span>
            ))}
          </div>
        )}

        {/* Pricing block */}
        <div className="mt-auto pt-4 border-t border-eco-border">
          <div className="flex items-end justify-between gap-2 mb-1">
            <div>
              <p className="text-[11px] text-eco-text-muted uppercase tracking-wider font-medium mb-0.5">Precio contado</p>
              <p
                className="text-2xl font-extrabold text-eco-green leading-none"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                {formatPeso(precio_contado)}
              </p>
            </div>
            <div className="text-right">
              <p className="text-[11px] text-eco-text-muted line-through">{formatPeso(precio_lista)}</p>
            </div>
          </div>
          <p className="text-eco-teal text-sm font-semibold">
            12 cuotas de {formatPeso(cuota12)}/mes
          </p>
        </div>

        {/* CTA */}
        <a
          href={buildWhatsAppLink(vendedor, mensaje)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-semibold py-3 px-4 rounded-xl transition-all duration-200 text-sm shadow-[0_2px_8px_rgba(42,95,64,0.20)] hover:shadow-[0_4px_16px_rgba(42,95,64,0.30)]"
        >
          <MessageCircle className="w-4 h-4" />
          Consultar por WhatsApp
        </a>
      </div>
    </div>
  )
}
