'use client'

import { useState } from 'react'
import VideoCallModal from '@/components/shared/VideoCallModal'
import { Video, CheckCircle } from 'lucide-react'

const BENEFICIOS = [
  'Asesoramiento personalizado sin costo',
  'Cotización a medida de tu proyecto',
  'Respondemos todas tus dudas técnicas',
  'Sin presión de venta — vos decidís',
]

export default function VideoCallPageClient() {
  const [open, setOpen] = useState(false)

  return (
    <main className="min-h-screen bg-eco-bg flex items-center justify-center py-16 px-4">
      <div className="max-w-lg w-full text-center space-y-8">
        <div className="w-20 h-20 bg-eco-green/20 rounded-2xl flex items-center justify-center mx-auto">
          <Video className="w-10 h-10 text-eco-green" />
        </div>

        <div className="space-y-3">
          <h1 className="font-display text-4xl font-bold text-eco-text">Videollamada gratuita</h1>
          <p className="text-eco-text-muted text-lg">
            Hablá cara a cara con uno de nuestros asesores. Te ayudamos a encontrar la solución ideal para tu proyecto.
          </p>
        </div>

        <ul className="space-y-2 text-left bg-eco-bg-card border border-eco-border rounded-2xl p-5">
          {BENEFICIOS.map((b) => (
            <li key={b} className="flex items-center gap-3 text-eco-text text-sm">
              <CheckCircle className="w-5 h-5 text-eco-green flex-shrink-0" />
              {b}
            </li>
          ))}
        </ul>

        <button
          onClick={() => setOpen(true)}
          className="w-full bg-eco-green hover:bg-eco-green-light text-white font-bold py-4 px-6 rounded-xl text-lg transition-colors flex items-center justify-center gap-3"
        >
          <Video className="w-6 h-6" />
          Solicitar videollamada
        </button>

        <p className="text-xs text-eco-text-muted">
          Lunes a viernes de 9 a 18 h · Sábados de 9 a 13 h · Te contactamos en menos de 2 horas
        </p>
      </div>

      <VideoCallModal isOpen={open} onClose={() => setOpen(false)} />
    </main>
  )
}
