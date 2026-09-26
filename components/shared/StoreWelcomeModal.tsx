'use client'

import { useEffect, useState } from 'react'
import { X, ShieldCheck, Star, CalendarCheck, BadgeDollarSign } from 'lucide-react'

const SESSION_KEY = 'store_welcome_shown'

export default function StoreWelcomeModal() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    try {
      if (!sessionStorage.getItem(SESSION_KEY)) {
        setOpen(true)
        sessionStorage.setItem(SESSION_KEY, '1')
      }
    } catch { /* private window */ }
  }, [])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={() => setOpen(false)}
    >
      <div
        className="relative bg-white dark:bg-eco-bg-card rounded-2xl shadow-2xl max-w-md w-full p-8 border border-eco-border"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={() => setOpen(false)}
          className="absolute top-4 right-4 text-eco-text-muted hover:text-eco-text transition-colors"
          aria-label="Cerrar"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <span className="inline-block text-3xl mb-3">🏊</span>
          <h2
            className="text-2xl font-extrabold text-eco-text uppercase leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Comprá en 3 pasos
          </h2>
          <p className="text-eco-text-muted text-sm mt-2">
            Sin bancos, sin filas, sin trámites. Todo desde acá.
          </p>
        </div>

        {/* Steps */}
        <ol className="space-y-4 mb-6">
          {[
            { n: '1', label: 'Elegí tu modelo y precio' },
            { n: '2', label: 'Completá tus datos y elegí la fecha de instalación' },
            { n: '3', label: 'Te confirmamos en menos de 24 hs' },
          ].map(({ n, label }) => (
            <li key={n} className="flex items-center gap-4">
              <span className="flex-shrink-0 w-9 h-9 rounded-full bg-eco-teal text-white font-extrabold text-base flex items-center justify-center shadow">
                {n}
              </span>
              <span className="text-eco-text font-medium text-sm">{label}</span>
            </li>
          ))}
        </ol>

        {/* Badges */}
        <div className="grid grid-cols-2 gap-3 mb-6">
          {[
            { icon: BadgeDollarSign, label: 'Pagás en el domicilio' },
            { icon: ShieldCheck,     label: 'Garantía 10 años' },
            { icon: Star,            label: 'Cert. Calidad Premium' },
            { icon: CalendarCheck,   label: 'Instalación en el día' },
          ].map(({ icon: Icon, label }) => (
            <div
              key={label}
              className="flex items-center gap-2 bg-eco-teal/8 border border-eco-teal/20 rounded-xl px-3 py-2"
            >
              <Icon className="w-4 h-4 text-eco-teal flex-shrink-0" />
              <span className="text-eco-text text-xs font-semibold">{label}</span>
            </div>
          ))}
        </div>

        <button
          onClick={() => setOpen(false)}
          className="w-full bg-eco-teal hover:bg-eco-teal-light text-white font-bold py-3 rounded-xl transition-colors text-sm shadow"
        >
          Ver productos
        </button>
      </div>
    </div>
  )
}
