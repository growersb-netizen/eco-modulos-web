'use client'

import { useState, useEffect } from 'react'
import { formatPeso } from '@/lib/utils'
import { CheckCircle, Clock, Truck, Package, XCircle, ChevronDown } from 'lucide-react'

interface Pedido {
  id: string
  productoTipo: string
  productoNombre: string
  productoMedida: string
  precioContado: number
  clienteNombre: string
  clienteTelefono: string
  clienteEmail: string
  clienteDni: string
  calle: string
  pisoDpto?: string
  localidad: string
  partido: string
  codigoPostal: string
  fechaInstalacion: string
  formaPago: string
  notas?: string
  dejaSeña: boolean
  señaConfirmada: boolean
  estado: string
  notasAdmin?: string
  createdAt: string
}

const ESTADOS: Record<string, { label: string; color: string; icon: React.ReactNode }> = {
  PENDIENTE:      { label: 'Pendiente',       color: 'text-yellow-600 bg-yellow-50 border-yellow-200',   icon: <Clock className="w-3.5 h-3.5" /> },
  CONFIRMADO:     { label: 'Confirmado',      color: 'text-blue-600 bg-blue-50 border-blue-200',         icon: <CheckCircle className="w-3.5 h-3.5" /> },
  EN_FABRICACION: { label: 'En fabricación',  color: 'text-purple-600 bg-purple-50 border-purple-200',   icon: <Package className="w-3.5 h-3.5" /> },
  ENTREGADO:      { label: 'Entregado',       color: 'text-green-600 bg-green-50 border-green-200',      icon: <Truck className="w-3.5 h-3.5" /> },
  CANCELADO:      { label: 'Cancelado',       color: 'text-red-600 bg-red-50 border-red-200',            icon: <XCircle className="w-3.5 h-3.5" /> },
}

const FORMA_PAGO: Record<string, string> = {
  efectivo:               'Efectivo en domicilio',
  transferencia:          'Transferencia bancaria',
  consultar_financiacion: 'Consultar financiación',
}

export default function AdminPedidosPage() {
  const [pedidos, setPedidos]     = useState<Pedido[]>([])
  const [loading, setLoading]     = useState(true)
  const [expanded, setExpanded]   = useState<string | null>(null)
  const [saving, setSaving]       = useState<string | null>(null)
  const [notas, setNotas]         = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/admin/pedidos')
      .then(r => r.json())
      .then(data => { setPedidos(data); setLoading(false) })
      .catch(() => setLoading(false))
  }, [])

  async function updateEstado(id: string, estado: string) {
    setSaving(id)
    await fetch(`/api/admin/pedidos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado }),
    })
    setPedidos(ps => ps.map(p => p.id === id ? { ...p, estado } : p))
    setSaving(null)
  }

  async function guardarNotas(id: string) {
    setSaving(id)
    await fetch(`/api/admin/pedidos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ notasAdmin: notas[id] ?? '' }),
    })
    setPedidos(ps => ps.map(p => p.id === id ? { ...p, notasAdmin: notas[id] } : p))
    setSaving(null)
  }

  async function toggleSeña(id: string, val: boolean) {
    setSaving(id)
    await fetch(`/api/admin/pedidos/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ señaConfirmada: val }),
    })
    setPedidos(ps => ps.map(p => p.id === id ? { ...p, señaConfirmada: val } : p))
    setSaving(null)
  }

  if (loading) return <div className="p-10 text-eco-text-muted">Cargando pedidos...</div>

  return (
    <div className="p-6 max-w-5xl">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-extrabold text-eco-text">Pedidos web</h1>
          <p className="text-eco-text-muted text-sm mt-0.5">{pedidos.length} pedido{pedidos.length !== 1 ? 's' : ''} registrado{pedidos.length !== 1 ? 's' : ''}</p>
        </div>
      </div>

      {pedidos.length === 0 && (
        <div className="text-center py-16 text-eco-text-muted">Todavía no hay pedidos</div>
      )}

      <div className="space-y-3">
        {pedidos.map(p => {
          const estado = ESTADOS[p.estado] ?? ESTADOS.PENDIENTE
          const fecha = new Date(p.fechaInstalacion).toLocaleDateString('es-AR', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
          const creado = new Date(p.createdAt).toLocaleString('es-AR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' })
          const isExpanded = expanded === p.id

          return (
            <div key={p.id} className="border border-eco-border rounded-2xl bg-eco-bg-card overflow-hidden">
              {/* Header */}
              <div
                className="flex flex-wrap items-center justify-between gap-3 p-4 cursor-pointer hover:bg-eco-bg-surface/50 transition-colors"
                onClick={() => setExpanded(isExpanded ? null : p.id)}
              >
                <div className="flex items-center gap-3">
                  <span className={`inline-flex items-center gap-1.5 text-xs font-semibold px-2.5 py-1 rounded-full border ${estado.color}`}>
                    {estado.icon}{estado.label}
                  </span>
                  <span className="text-xs text-eco-text-muted font-mono">ECO-{p.id.slice(-6).toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <p className="font-semibold text-eco-text">{p.clienteNombre}</p>
                    <p className="text-eco-text-muted text-xs">{p.localidad}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <p className="font-extrabold text-eco-green">{formatPeso(p.precioContado)}</p>
                    <p className="text-eco-text-muted text-xs">{p.productoNombre}</p>
                  </div>
                  <div className="text-right hidden md:block">
                    <p className="text-eco-text text-xs font-semibold">📅 {fecha}</p>
                    <p className="text-eco-text-muted text-xs">Creado {creado}</p>
                  </div>
                  <ChevronDown className={`w-4 h-4 text-eco-text-muted transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                </div>
              </div>

              {/* Detalle expandido */}
              {isExpanded && (
                <div className="border-t border-eco-border p-5 space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                    {/* Producto */}
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-eco-text-muted mb-2">Producto</p>
                      <p className="font-bold text-eco-text">{p.productoNombre} <span className="font-normal text-eco-text-muted">({p.productoMedida})</span></p>
                      <p className="text-eco-green font-bold">{formatPeso(p.precioContado)} contado</p>
                      <p className="text-sm text-eco-text-muted">{FORMA_PAGO[p.formaPago] || p.formaPago}</p>
                      {p.dejaSeña && (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-xs text-eco-text-muted">Seña:</span>
                          <button
                            onClick={() => toggleSeña(p.id, !p.señaConfirmada)}
                            disabled={saving === p.id}
                            className={`text-xs font-semibold px-2.5 py-1 rounded-full border transition-colors ${p.señaConfirmada ? 'bg-green-50 text-green-700 border-green-200' : 'bg-yellow-50 text-yellow-700 border-yellow-200'}`}
                          >
                            {p.señaConfirmada ? '✓ Confirmada' : 'Pendiente — confirmar'}
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Cliente */}
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-eco-text-muted mb-2">Cliente</p>
                      <p className="font-semibold text-eco-text">{p.clienteNombre}</p>
                      <p className="text-sm text-eco-text-muted">{p.clienteTelefono} · {p.clienteEmail}</p>
                      <p className="text-sm text-eco-text-muted">DNI: {p.clienteDni}</p>
                      <p className="text-sm text-eco-text-muted mt-1">
                        {p.calle}{p.pisoDpto ? `, ${p.pisoDpto}` : ''}<br />
                        {p.localidad}, {p.partido} CP {p.codigoPostal}
                      </p>
                    </div>
                  </div>

                  {p.notas && (
                    <div>
                      <p className="text-[11px] font-bold uppercase tracking-wider text-eco-text-muted mb-1">Nota del cliente</p>
                      <p className="text-sm text-eco-text bg-eco-bg-surface border border-eco-border rounded-xl px-4 py-2">{p.notas}</p>
                    </div>
                  )}

                  {/* Cambiar estado */}
                  <div className="flex flex-wrap items-center gap-3">
                    <p className="text-[11px] font-bold uppercase tracking-wider text-eco-text-muted">Estado:</p>
                    {Object.entries(ESTADOS).map(([val, { label }]) => (
                      <button
                        key={val}
                        disabled={saving === p.id}
                        onClick={() => updateEstado(p.id, val)}
                        className={`text-xs font-semibold px-3 py-1.5 rounded-full border transition-colors ${p.estado === val ? 'bg-eco-teal text-white border-eco-teal' : 'border-eco-border text-eco-text-muted hover:border-eco-teal/50'}`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>

                  {/* Notas admin */}
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-wider text-eco-text-muted mb-1.5">Notas internas</p>
                    <div className="flex gap-2">
                      <textarea
                        rows={2}
                        className="flex-1 border border-eco-border rounded-xl px-3 py-2 text-sm text-eco-text bg-white dark:bg-eco-bg-surface resize-none focus:outline-none focus:ring-2 focus:ring-eco-teal/40"
                        placeholder="Notas internas del equipo..."
                        defaultValue={p.notasAdmin || ''}
                        onChange={e => setNotas(n => ({ ...n, [p.id]: e.target.value }))}
                      />
                      <button
                        onClick={() => guardarNotas(p.id)}
                        disabled={saving === p.id}
                        className="px-4 py-2 bg-eco-teal text-white text-sm font-semibold rounded-xl hover:bg-eco-teal-light transition-colors disabled:opacity-50"
                      >
                        Guardar
                      </button>
                    </div>
                  </div>

                  {/* Links rápidos */}
                  <div className="flex gap-3 pt-2">
                    <a
                      href={`https://wa.me/${p.clienteTelefono.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${p.clienteNombre}, te contactamos de EcoFiver para confirmar tu pedido de ${p.productoNombre}.`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-eco-teal border border-eco-teal/30 bg-eco-teal/5 px-3 py-1.5 rounded-full hover:bg-eco-teal/10 transition-colors"
                    >
                      📱 WhatsApp cliente
                    </a>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
