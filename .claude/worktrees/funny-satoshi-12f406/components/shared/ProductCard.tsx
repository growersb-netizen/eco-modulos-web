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
          <div className="w-full h-full flex flex-col items-center justify-center gap-3 bg-gradient-to-br from-[#0d1f0d] to-eco-bg-surface">
            {tipo === 'modulo' ? (
              <svg viewBox="0 0 120 80" className="w-24 h-16 opacity-40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="10" y="30" width="100" height="45" rx="2" stroke="#2d9e4f" strokeWidth="2" fill="#2d9e4f" fillOpacity="0.08"/>
                <polygon points="60,5 5,32 115,32" fill="#2d9e4f" fillOpacity="0.15" stroke="#2d9e4f" strokeWidth="2" strokeLinejoin="round"/>
                <rect x="48" y="48" width="24" height="27" rx="1" stroke="#2d9e4f" strokeWidth="1.5" fill="#2d9e4f" fillOpacity="0.1"/>
                <rect x="18" y="42" width="18" height="14" rx="1" stroke="#00b8a9" strokeWidth="1.5" fill="#00b8a9" fillOpacity="0.1"/>
                <rect x="84" y="42" width="18" height="14" rx="1" stroke="#00b8a9" strokeWidth="1.5" fill="#00b8a9" fillOpacity="0.1"/>
                <line x1="10" y1="75" x2="110" y2="75" stroke="#2d9e4f" strokeWidth="1" strokeDasharray="4,3" opacity="0.4"/>
              </svg>
            ) : (
              <svg viewBox="0 0 120 80" className="w-24 h-16 opacity-40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <ellipse cx="60" cy="52" rx="46" ry="22" stroke="#00b8a9" strokeWidth="2" fill="#00b8a9" fillOpacity="0.08"/>
                <path d="M14 52 Q20 20 60 18 Q100 20 106 52" stroke="#00b8a9" strokeWidth="2" fill="#00b8a9" fillOpacity="0.12"/>
                <ellipse cx="60" cy="52" rx="30" ry="14" stroke="#2d9e4f" strokeWidth="1.5" fill="#2d9e4f" fillOpacity="0.08" strokeDasharray="4,3"/>
                <line x1="60" y1="18" x2="60" y2="66" stroke="#00b8a9" strokeWidth="1" opacity="0.3" strokeDasharray="3,3"/>
                <line x1="14" y1="52" x2="106" y2="52" stroke="#00b8a9" strokeWidth="1" opacity="0.3" strokeDasharray="3,3"/>
              </svg>
            )}
            <div className="text-center">
              <p className="text-eco-green text-xs font-semibold uppercase tracking-widest opacity-70">
                {tipo === 'modulo' ? 'Módulo NCE' : 'Piscina Fibra'}
              </p>
              <p className="text-eco-text-muted text-[10px] opacity-50 mt-0.5">{medida}</p>
            </div>
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
