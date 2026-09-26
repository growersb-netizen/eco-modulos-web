'use client'

import { useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { ShieldCheck, Star, CalendarCheck, BadgeDollarSign, ChevronRight, Loader2 } from 'lucide-react'
import { formatPeso } from '@/lib/utils'

interface Props {
  producto: {
    id: string
    nombre: string
    medida: string
    precio_contado: number
    precio_lista: number
    tipo: 'PISCINA' | 'MODULO'
  }
}

const FORMA_PAGO = [
  { value: 'efectivo',               label: 'Efectivo el día de la instalación, en el domicilio' },
  { value: 'transferencia',          label: 'Transferencia bancaria (el día de la instalación)' },
  { value: 'consultar_financiacion', label: 'Quiero consultar financiación en cuotas' },
]

/** Devuelve los próximos N días hábiles (lun-sáb) a partir de mañana */
function proximosDiasHabiles(n = 10): string[] {
  const dias: string[] = []
  const hoy = new Date()
  hoy.setHours(0, 0, 0, 0)
  const cursor = new Date(hoy)
  cursor.setDate(cursor.getDate() + 1)
  while (dias.length < n) {
    const dow = cursor.getDay()
    if (dow !== 0) { // excluir domingos
      dias.push(cursor.toISOString().slice(0, 10))
    }
    cursor.setDate(cursor.getDate() + 1)
  }
  return dias
}

export default function OrderForm({ producto }: Props) {
  const router = useRouter()
  const diasHabiles = useMemo(() => proximosDiasHabiles(10), [])
  const ahorro = producto.precio_lista - producto.precio_contado

  const [form, setForm] = useState({
    clienteNombre:   '',
    clienteTelefono: '',
    clienteEmail:    '',
    clienteDni:      '',
    calle:           '',
    pisoDpto:        '',
    localidad:       '',
    partido:         '',
    codigoPostal:    '',
    fechaInstalacion: '',
    formaPago:       'efectivo',
    notas:           '',
    dejaSeña:        false,
  })
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')

  const set = (k: string, v: string | boolean) => setForm(f => ({ ...f, [k]: v }))

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!form.fechaInstalacion) { setError('Seleccioná una fecha de instalación'); return }
    setError('')
    setLoading(true)
    try {
      const res = await fetch('/api/pedidos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          productoTipo:    producto.tipo,
          productoId:      producto.id,
          productoNombre:  producto.nombre,
          productoMedida:  producto.medida,
          precioContado:   producto.precio_contado,
          precioLista:     producto.precio_lista,
          ...form,
        }),
      })
      const data = await res.json()
      if (!res.ok) { setError(data.error || 'Error al enviar el pedido'); return }
      router.push(`/pedido/${data.id}/ok`)
    } catch {
      setError('Error de conexión. Intentá nuevamente.')
    } finally {
      setLoading(false)
    }
  }

  const inputCls = 'w-full border border-eco-border rounded-xl px-4 py-3 text-eco-text bg-white dark:bg-eco-bg-surface text-sm focus:outline-none focus:ring-2 focus:ring-eco-teal/40 placeholder:text-eco-text-muted/60'
  const labelCls = 'block text-xs font-semibold text-eco-text-muted uppercase tracking-wider mb-1.5'

  return (
    <form onSubmit={handleSubmit} className="space-y-8">

      {/* Resumen del producto */}
      <div className="bg-eco-teal/5 border border-eco-teal/20 rounded-2xl p-5">
        <p className="text-[11px] font-bold uppercase tracking-widest text-eco-teal mb-2">Tu selección</p>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-extrabold text-eco-text text-lg leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {producto.nombre}
            </p>
            <p className="text-eco-text-muted text-sm">{producto.medida}</p>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[11px] text-eco-text-muted line-through">{formatPeso(producto.precio_lista)}</p>
            <p className="text-xl font-extrabold text-eco-green leading-tight" style={{ fontFamily: 'var(--font-display)' }}>
              {formatPeso(producto.precio_contado)}
            </p>
            <p className="text-[11px] text-eco-teal font-semibold">Ahorrás {formatPeso(ahorro)}</p>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mt-4">
          {[
            { icon: BadgeDollarSign, label: 'Pagás el día de la instalación' },
            { icon: ShieldCheck,     label: 'Garantía 10 años' },
            { icon: Star,            label: 'Cert. Premium' },
            { icon: CalendarCheck,   label: 'Instalación en el día' },
          ].map(({ icon: Icon, label }) => (
            <span key={label} className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-eco-teal bg-white dark:bg-eco-bg border border-eco-teal/20 px-2.5 py-1 rounded-full">
              <Icon className="w-3 h-3" />{label}
            </span>
          ))}
        </div>
      </div>

      {/* Bloque 1: Tus datos */}
      <div>
        <h3 className="text-sm font-bold text-eco-text mb-4 uppercase tracking-wider">Tus datos</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelCls}>Nombre completo *</label>
            <input required className={inputCls} placeholder="Juan Pérez" value={form.clienteNombre} onChange={e => set('clienteNombre', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Teléfono (WhatsApp) *</label>
            <input required className={inputCls} type="tel" placeholder="+54 9 11 1234-5678" value={form.clienteTelefono} onChange={e => set('clienteTelefono', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Email *</label>
            <input required className={inputCls} type="email" placeholder="juan@mail.com" value={form.clienteEmail} onChange={e => set('clienteEmail', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>DNI *</label>
            <input required className={inputCls} placeholder="28.123.456" value={form.clienteDni} onChange={e => set('clienteDni', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Bloque 2: Dirección de instalación */}
      <div>
        <h3 className="text-sm font-bold text-eco-text mb-4 uppercase tracking-wider">Dirección de instalación</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="sm:col-span-2">
            <label className={labelCls}>Calle y número *</label>
            <input required className={inputCls} placeholder="Av. San Martín 1234" value={form.calle} onChange={e => set('calle', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Piso / Depto</label>
            <input className={inputCls} placeholder="3° B (opcional)" value={form.pisoDpto} onChange={e => set('pisoDpto', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Localidad *</label>
            <input required className={inputCls} placeholder="Lanús" value={form.localidad} onChange={e => set('localidad', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Partido / Municipio *</label>
            <input required className={inputCls} placeholder="Lanús Este" value={form.partido} onChange={e => set('partido', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>Código Postal *</label>
            <input required className={inputCls} placeholder="1824" value={form.codigoPostal} onChange={e => set('codigoPostal', e.target.value)} />
          </div>
        </div>
      </div>

      {/* Bloque 3: Instalación */}
      <div>
        <h3 className="text-sm font-bold text-eco-text mb-4 uppercase tracking-wider">Fecha de instalación deseada</h3>
        <p className="text-xs text-eco-text-muted mb-3">Elegí una fecha de los próximos 10 días hábiles. Nuestro equipo la confirmará.</p>
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
          {diasHabiles.map(d => {
            const fecha = new Date(d + 'T12:00:00')
            const label = fecha.toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short' })
            const selected = form.fechaInstalacion === d
            return (
              <button
                key={d}
                type="button"
                onClick={() => set('fechaInstalacion', d)}
                className={`rounded-xl border py-3 px-2 text-xs font-semibold transition-all text-center ${
                  selected
                    ? 'bg-eco-teal text-white border-eco-teal shadow'
                    : 'border-eco-border text-eco-text hover:border-eco-teal/50 bg-white dark:bg-eco-bg-surface'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>
        {!form.fechaInstalacion && (
          <p className="text-xs text-eco-text-muted mt-2 opacity-70">* Seleccioná una fecha para continuar</p>
        )}
      </div>

      {/* Bloque 4: Forma de pago */}
      <div>
        <h3 className="text-sm font-bold text-eco-text mb-4 uppercase tracking-wider">Forma de pago</h3>
        <div className="space-y-2">
          {FORMA_PAGO.map(({ value, label }) => (
            <label
              key={value}
              className={`flex items-center gap-3 p-4 rounded-xl border cursor-pointer transition-all ${
                form.formaPago === value
                  ? 'border-eco-teal bg-eco-teal/5'
                  : 'border-eco-border hover:border-eco-teal/40'
              }`}
            >
              <input
                type="radio"
                name="formaPago"
                value={value}
                checked={form.formaPago === value}
                onChange={() => set('formaPago', value)}
                className="accent-eco-teal"
              />
              <span className="text-sm font-medium text-eco-text">{label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Seña opcional */}
      <div className="bg-eco-bg-surface border border-eco-border rounded-xl p-5">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            checked={form.dejaSeña}
            onChange={e => set('dejaSeña', e.target.checked)}
            className="mt-1 accent-eco-teal w-4 h-4"
          />
          <div>
            <p className="text-sm font-semibold text-eco-text">Quiero dejar una seña para asegurar mi fecha <span className="text-eco-text-muted font-normal">(opcional)</span></p>
            <p className="text-xs text-eco-text-muted mt-1">El pago de la seña se realiza por MercadoPago. Un asesor te enviará el link de pago por WhatsApp.</p>
          </div>
        </label>
      </div>

      {/* Notas */}
      <div>
        <label className={labelCls}>Notas adicionales <span className="normal-case font-normal">(opcional)</span></label>
        <textarea
          className={`${inputCls} resize-none`}
          rows={3}
          placeholder="Acceso especial, portón angosto, piso de madera, etc."
          value={form.notas}
          onChange={e => set('notas', e.target.value)}
        />
      </div>

      {error && (
        <p className="text-red-500 text-sm font-medium bg-red-50 border border-red-200 rounded-xl px-4 py-3">{error}</p>
      )}

      <button
        type="submit"
        disabled={loading || !form.fechaInstalacion}
        className="w-full flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-4 rounded-xl transition-all text-base shadow-[0_4px_16px_rgba(11,35,80,0.25)]"
      >
        {loading
          ? <><Loader2 className="w-5 h-5 animate-spin" />Enviando reserva...</>
          : <><ChevronRight className="w-5 h-5" />Confirmar reserva</>
        }
      </button>
      <p className="text-xs text-center text-eco-text-muted">
        Al confirmar, un asesor te contactará por WhatsApp para coordinar los detalles finales.
      </p>
    </form>
  )
}
