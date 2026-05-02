'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { CheckCircle, Send } from 'lucide-react'
import { trackLead } from '@/lib/analytics'

const schema = z.object({
  nombre: z.string().min(2, 'Nombre muy corto').optional().or(z.literal('')),
  telefono: z.string().min(8, 'Teléfono inválido'),
  email: z.string().email('Email inválido').optional().or(z.literal('')),
  localidad: z.string().min(2, 'Ingresá tu localidad'),
  producto_interes: z.string().min(1, 'Seleccioná un producto'),
  plan_pago: z.string().optional(),
  mensaje: z.string().optional(),
})

type FormData = z.infer<typeof schema>

export default function ContactForm() {
  const [enviado, setEnviado] = useState(false)
  const [error, setError] = useState('')

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setError('')
    try {
      const res = await fetch('/api/leads', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...data, fuente: 'web_formulario' }),
      })
      if (!res.ok) throw new Error()
      trackLead('web_formulario', data.producto_interes, '')
      setEnviado(true)
      reset()
    } catch {
      setError('Hubo un error. Por favor, intentá nuevamente.')
    }
  }

  const inputClass =
    'w-full bg-eco-bg-surface border border-eco-border rounded-lg px-4 py-3 text-eco-text placeholder-eco-text-muted focus:outline-none focus:border-eco-green transition-colors'

  if (enviado) {
    return (
      <div className="flex flex-col items-center justify-center py-16 gap-4 text-center">
        <CheckCircle className="w-16 h-16 text-eco-green" />
        <h3 className="text-2xl font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>
          ¡Consulta enviada!
        </h3>
        <p className="text-eco-text-muted max-w-md">
          Te vamos a contactar a la brevedad por WhatsApp. ¡Gracias por confiar en Eco Módulos & Piscinas!
        </p>
        <button
          onClick={() => setEnviado(false)}
          className="text-eco-green hover:underline text-sm mt-2"
        >
          Enviar otra consulta
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input {...register('nombre')} placeholder="Tu nombre (opcional)" className={inputClass} />
          {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre.message}</p>}
        </div>
        <div>
          <input {...register('telefono')} placeholder="Teléfono / WhatsApp *" className={inputClass} />
          {errors.telefono && <p className="text-red-400 text-xs mt-1">{errors.telefono.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <input {...register('email')} type="email" placeholder="Email (opcional)" className={inputClass} />
          {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
        </div>
        <div>
          <input {...register('localidad')} placeholder="Localidad / Provincia *" className={inputClass} />
          {errors.localidad && <p className="text-red-400 text-xs mt-1">{errors.localidad.message}</p>}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <select {...register('producto_interes')} className={inputClass}>
            <option value="">¿Qué te interesa? *</option>
            <option value="modulo">Módulo habitacional</option>
            <option value="piscina">Piscina de fibra</option>
            <option value="combo">Combo Módulo + Piscina</option>
            <option value="otro">Otro</option>
          </select>
          {errors.producto_interes && <p className="text-red-400 text-xs mt-1">{errors.producto_interes.message}</p>}
        </div>
        <div>
          <select {...register('plan_pago')} className={inputClass}>
            <option value="">Plan de pago (opcional)</option>
            <option value="contado">Contado / liquidación</option>
            <option value="financiado">Financiado hasta 36 cuotas</option>
            <option value="pmi">Plan PMI hasta 120 cuotas</option>
          </select>
        </div>
      </div>

      <textarea
        {...register('mensaje')}
        placeholder="Mensaje o consulta (opcional)"
        rows={4}
        className={inputClass + ' resize-none'}
      />

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex items-center justify-center gap-2 w-full bg-eco-green hover:bg-eco-green-light disabled:opacity-50 text-white font-semibold py-4 rounded-lg transition-colors text-lg"
      >
        <Send className="w-5 h-5" />
        {isSubmitting ? 'Enviando...' : 'Enviar consulta'}
      </button>

      <p className="text-eco-text-muted text-xs text-center">
        * Campos requeridos. No enviamos spam.
      </p>
    </form>
  )
}
