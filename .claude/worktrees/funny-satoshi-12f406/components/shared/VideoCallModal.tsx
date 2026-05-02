'use client'

import { useState } from 'react'
import { X, Video, Phone, Mail, User, Clock, MessageSquare, CheckCircle, ExternalLink } from 'lucide-react'
import { cn } from '@/lib/utils'

const PRODUCTOS = [
  { value: 'modulo', label: '🏠 Módulo habitacional / Vivienda modular', sub: 'De 6 a 72 m², tecnología NCE' },
  { value: 'piscina', label: '🏊 Piscina de fibra de vidrio', sub: '16 modelos, instalación en días' },
  { value: 'combo', label: '🏠🏊 Combo módulo + piscina', sub: 'Ahorro del 25% por compra conjunta' },
  { value: 'otro', label: '📋 Evaluación general / tengo dudas', sub: 'Hablemos sin compromiso' },
]

const HORARIOS = [
  { value: 'manana', label: 'Mañana (9:00 – 12:00)' },
  { value: 'tarde', label: 'Tarde (12:00 – 18:00)' },
  { value: 'flexible', label: 'Flexible — cualquier horario' },
]

interface VideoCallModalProps {
  isOpen: boolean
  onClose: () => void
  productoDefault?: string
}

export default function VideoCallModal({ isOpen, onClose, productoDefault }: VideoCallModalProps) {
  const [form, setForm] = useState({
    nombre: '',
    telefono: '',
    email: '',
    producto: productoDefault || '',
    horario: '',
    mensaje: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const googleFormUrl = process.env.NEXT_PUBLIC_GOOGLE_FORM_URL

  if (!isOpen) return null

  function set(k: string, v: string) {
    setForm((f) => ({ ...f, [k]: v }))
    setError('')
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.nombre || !form.telefono || !form.producto) {
      setError('Nombre, teléfono y producto son obligatorios.')
      return
    }

    setLoading(true)
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nombre: form.nombre,
          telefono: form.telefono,
          email: form.email || undefined,
          producto_interes: form.producto,
          mensaje: [
            form.horario ? `Horario preferido: ${HORARIOS.find((h) => h.value === form.horario)?.label}` : '',
            form.mensaje,
          ]
            .filter(Boolean)
            .join(' | '),
          fuente: 'videollamada_web',
        }),
      })
      if (res.ok) {
        setSuccess(true)
      } else {
        setError('Hubo un error. Comunicate por WhatsApp.')
      }
    } catch {
      setError('Hubo un error. Comunicate por WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  const waLink = `https://wa.me/5491144498854?text=${encodeURIComponent('Hola, quiero agendar una videollamada gratuita para evaluar ' + (PRODUCTOS.find((p) => p.value === form.producto)?.label || 'un producto') + '.')}`

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" role="dialog" aria-modal="true">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />

      {/* Modal */}
      <div className="relative bg-eco-bg-card border border-eco-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl">
        {/* Header */}
        <div className="sticky top-0 bg-eco-bg-card border-b border-eco-border px-6 py-4 flex items-center justify-between rounded-t-2xl z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-eco-green/20 rounded-xl flex items-center justify-center">
              <Video className="w-5 h-5 text-eco-green" />
            </div>
            <div>
              <h2 className="font-display text-xl font-bold text-eco-text">Videollamada gratuita</h2>
              <p className="text-xs text-eco-text-muted">Te contactamos para coordinar día y hora</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-eco-text-muted hover:text-eco-text transition-colors p-1"
            aria-label="Cerrar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {success ? (
          /* Success state */
          <div className="p-8 text-center space-y-4">
            <div className="w-16 h-16 bg-eco-green/20 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-eco-green" />
            </div>
            <h3 className="font-display text-2xl font-bold text-eco-text">¡Solicitud recibida!</h3>
            <p className="text-eco-text-muted">
              Uno de nuestros asesores se va a comunicar con vos a la brevedad para coordinar la videollamada.
            </p>
            <div className="bg-eco-bg-surface rounded-xl p-4 text-sm text-eco-text-muted">
              <p>¿Preferís coordinar ahora mismo?</p>
              <a
                href={waLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 mt-2 bg-[#25D366] text-white px-4 py-2 rounded-lg font-semibold hover:bg-[#1ebe5a] transition-colors"
              >
                <Phone className="w-4 h-4" />
                Escribir por WhatsApp
              </a>
            </div>
            <button
              onClick={onClose}
              className="text-eco-text-muted hover:text-eco-text text-sm underline"
            >
              Cerrar
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 space-y-5">
            {/* Google Form alternative */}
            {googleFormUrl && (
              <div className="bg-eco-bg-surface border border-eco-border rounded-xl p-3 flex items-center justify-between gap-3">
                <p className="text-xs text-eco-text-muted">¿Preferís completar el formulario de Google?</p>
                <a
                  href={googleFormUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-xs font-semibold text-eco-teal hover:text-eco-teal-light whitespace-nowrap"
                >
                  Abrir formulario <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}

            {/* Producto */}
            <fieldset>
              <legend className="text-sm font-semibold text-eco-text mb-2">
                ¿Sobre qué querés que te asesoremos? <span className="text-red-400">*</span>
              </legend>
              <div className="space-y-2">
                {PRODUCTOS.map((p) => (
                  <label
                    key={p.value}
                    className={cn(
                      'flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-colors',
                      form.producto === p.value
                        ? 'border-eco-green bg-eco-green/10'
                        : 'border-eco-border bg-eco-bg-surface hover:border-eco-green/50'
                    )}
                  >
                    <input
                      type="radio"
                      name="producto"
                      value={p.value}
                      checked={form.producto === p.value}
                      onChange={(e) => set('producto', e.target.value)}
                      className="mt-0.5 accent-eco-green"
                    />
                    <div>
                      <div className="text-sm font-medium text-eco-text">{p.label}</div>
                      <div className="text-xs text-eco-text-muted">{p.sub}</div>
                    </div>
                  </label>
                ))}
              </div>
            </fieldset>

            {/* Nombre */}
            <div>
              <label className="block text-sm font-semibold text-eco-text mb-1">
                <User className="w-3.5 h-3.5 inline mr-1" />
                Nombre completo <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                value={form.nombre}
                onChange={(e) => set('nombre', e.target.value)}
                placeholder="Juan García"
                className="w-full bg-eco-bg-surface border border-eco-border rounded-xl px-4 py-2.5 text-eco-text placeholder-eco-text-muted focus:outline-none focus:border-eco-green text-sm"
                required
              />
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm font-semibold text-eco-text mb-1">
                <Phone className="w-3.5 h-3.5 inline mr-1" />
                WhatsApp / Teléfono <span className="text-red-400">*</span>
              </label>
              <input
                type="tel"
                value={form.telefono}
                onChange={(e) => set('telefono', e.target.value)}
                placeholder="+54 9 11 1234-5678"
                className="w-full bg-eco-bg-surface border border-eco-border rounded-xl px-4 py-2.5 text-eco-text placeholder-eco-text-muted focus:outline-none focus:border-eco-green text-sm"
                required
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-eco-text mb-1">
                <Mail className="w-3.5 h-3.5 inline mr-1" />
                Email <span className="text-eco-text-muted font-normal">(opcional)</span>
              </label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => set('email', e.target.value)}
                placeholder="juan@email.com"
                className="w-full bg-eco-bg-surface border border-eco-border rounded-xl px-4 py-2.5 text-eco-text placeholder-eco-text-muted focus:outline-none focus:border-eco-green text-sm"
              />
            </div>

            {/* Horario preferido */}
            <div>
              <label className="block text-sm font-semibold text-eco-text mb-1">
                <Clock className="w-3.5 h-3.5 inline mr-1" />
                Horario preferido
              </label>
              <div className="flex flex-wrap gap-2">
                {HORARIOS.map((h) => (
                  <button
                    key={h.value}
                    type="button"
                    onClick={() => set('horario', form.horario === h.value ? '' : h.value)}
                    className={cn(
                      'text-xs px-3 py-1.5 rounded-lg border transition-colors',
                      form.horario === h.value
                        ? 'border-eco-green bg-eco-green/10 text-eco-green'
                        : 'border-eco-border text-eco-text-muted hover:border-eco-green/50'
                    )}
                  >
                    {h.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Mensaje */}
            <div>
              <label className="block text-sm font-semibold text-eco-text mb-1">
                <MessageSquare className="w-3.5 h-3.5 inline mr-1" />
                Contanos tu situación <span className="text-eco-text-muted font-normal">(opcional)</span>
              </label>
              <textarea
                value={form.mensaje}
                onChange={(e) => set('mensaje', e.target.value)}
                placeholder="Ej: Tengo un terreno de 200 m² en Mar del Plata y quiero una vivienda de 2 habitaciones..."
                rows={3}
                className="w-full bg-eco-bg-surface border border-eco-border rounded-xl px-4 py-2.5 text-eco-text placeholder-eco-text-muted focus:outline-none focus:border-eco-green text-sm resize-none"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-eco-green hover:bg-eco-green-light text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 disabled:opacity-60"
            >
              <Video className="w-5 h-5" />
              {loading ? 'Enviando…' : 'Solicitar videollamada gratuita'}
            </button>

            <p className="text-center text-xs text-eco-text-muted">
              Sin compromiso · Te llamamos nosotros · 100% gratuito
            </p>
          </form>
        )}
      </div>
    </div>
  )
}
