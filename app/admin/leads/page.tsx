'use client'

import { useState, useEffect, useCallback } from 'react'
import { Download, X, ChevronLeft, ChevronRight } from 'lucide-react'

const ESTADOS = ['', 'nuevo', 'contactado', 'en_seguimiento', 'cerrado', 'perdido']
const VENDEDORES = ['', 'stefania', 'daniel', 'hernan']
const ESTADO_COLOR: Record<string, string> = {
  nuevo: 'bg-eco-green/20 text-eco-green',
  contactado: 'bg-blue-900/30 text-blue-400',
  en_seguimiento: 'bg-yellow-900/30 text-yellow-400',
  cerrado: 'bg-eco-teal/20 text-eco-teal',
  perdido: 'bg-red-900/30 text-red-400',
}

interface Lead {
  id: string; nombre: string | null; telefono: string; email: string | null
  localidad: string | null; producto_interes: string; vendedor_asignado: string
  estado: string; notas: string | null; fuente: string; creadoEn: string
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [filtroEstado, setFiltroEstado] = useState('')
  const [filtroVendedor, setFiltroVendedor] = useState('')
  const [filtroProducto, setFiltroProducto] = useState('')
  const [drawer, setDrawer] = useState<Lead | null>(null)
  const [drawerEstado, setDrawerEstado] = useState('')
  const [drawerVendedor, setDrawerVendedor] = useState('')
  const [drawerNotas, setDrawerNotas] = useState('')
  const [saving, setSaving] = useState(false)
  const PER_PAGE = 20

  const fetchLeads = useCallback(() => {
    setLoading(true)
    const qs = new URLSearchParams()
    if (filtroEstado) qs.set('estado', filtroEstado)
    if (filtroVendedor) qs.set('vendedor', filtroVendedor)
    if (filtroProducto) qs.set('producto', filtroProducto)
    qs.set('page', String(page))
    fetch('/api/admin/leads?' + qs.toString())
      .then((r) => r.json())
      .then(({ leads: l, total: t }) => { setLeads(l); setTotal(t) })
      .finally(() => setLoading(false))
  }, [filtroEstado, filtroVendedor, filtroProducto, page])

  useEffect(() => { fetchLeads() }, [fetchLeads])

  function abrirDrawer(lead: Lead) {
    setDrawer(lead)
    setDrawerEstado(lead.estado)
    setDrawerVendedor(lead.vendedor_asignado)
    setDrawerNotas(lead.notas || '')
  }

  async function guardarDrawer() {
    if (!drawer) return
    setSaving(true)
    await fetch(`/api/admin/leads/${drawer.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ estado: drawerEstado, vendedor_asignado: drawerVendedor, notas: drawerNotas }),
    })
    setSaving(false)
    setDrawer(null)
    fetchLeads()
  }

  function exportarCSV() {
    const qs = new URLSearchParams()
    if (filtroEstado) qs.set('estado', filtroEstado)
    if (filtroVendedor) qs.set('vendedor', filtroVendedor)
    if (filtroProducto) qs.set('producto', filtroProducto)
    window.open('/api/admin/leads/export?' + qs.toString(), '_blank')
  }

  function tiempoRelativo(d: string) {
    const seg = Math.floor((Date.now() - new Date(d).getTime()) / 1000)
    if (seg < 60) return 'hace un momento'
    if (seg < 3600) return `hace ${Math.floor(seg / 60)}m`
    if (seg < 86400) return `hace ${Math.floor(seg / 3600)}h`
    return `hace ${Math.floor(seg / 86400)}d`
  }

  const totalPages = Math.ceil(total / PER_PAGE)

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>Leads</h1>
          <p className="text-eco-text-muted text-sm">{total} leads en total</p>
        </div>
        <button onClick={exportarCSV} className="flex items-center gap-2 border border-eco-border text-eco-text-muted hover:border-eco-green hover:text-eco-green px-4 py-2 rounded-xl text-sm transition-colors">
          <Download className="w-4 h-4" />Exportar CSV
        </button>
      </div>

      {/* Filtros */}
      <div className="flex flex-wrap gap-3">
        <select value={filtroEstado} onChange={(e) => { setFiltroEstado(e.target.value); setPage(1) }} className="bg-eco-bg-surface border border-eco-border text-eco-text-muted rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green">
          <option value="">Todos los estados</option>
          {ESTADOS.filter(Boolean).map((e) => <option key={e} value={e}>{e}</option>)}
        </select>
        <select value={filtroVendedor} onChange={(e) => { setFiltroVendedor(e.target.value); setPage(1) }} className="bg-eco-bg-surface border border-eco-border text-eco-text-muted rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green">
          <option value="">Todos los vendedores</option>
          {VENDEDORES.filter(Boolean).map((v) => <option key={v} value={v}>{v}</option>)}
        </select>
        <input
          type="text"
          placeholder="Filtrar por producto…"
          value={filtroProducto}
          onChange={(e) => { setFiltroProducto(e.target.value); setPage(1) }}
          className="bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green"
        />
      </div>

      {/* Tabla */}
      {loading ? (
        <div className="text-eco-text-muted">Cargando…</div>
      ) : (
        <div className="bg-eco-bg-card border border-eco-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-eco-border">
                  {['Nombre/Tel', 'Producto', 'Localidad', 'Vendedor', 'Estado', 'Cuándo', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-eco-text-muted text-xs uppercase tracking-wider font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-eco-border">
                {leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-eco-bg-surface transition-colors cursor-pointer" onClick={() => abrirDrawer(lead)}>
                    <td className="px-4 py-3">
                      <p className="text-eco-text">{lead.nombre || '—'}</p>
                      <p className="text-eco-text-muted text-xs">{lead.telefono}</p>
                    </td>
                    <td className="px-4 py-3 text-eco-text-muted capitalize">{lead.producto_interes}</td>
                    <td className="px-4 py-3 text-eco-text-muted">{lead.localidad || '—'}</td>
                    <td className="px-4 py-3 text-eco-text-muted capitalize">{lead.vendedor_asignado}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${ESTADO_COLOR[lead.estado] || 'bg-gray-800 text-gray-400'}`}>
                        {lead.estado}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-eco-text-muted text-xs">{tiempoRelativo(lead.creadoEn)}</td>
                    <td className="px-4 py-3 text-eco-green text-xs">Abrir →</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Paginación */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-eco-border">
              <span className="text-eco-text-muted text-xs">Página {page} de {totalPages}</span>
              <div className="flex gap-2">
                <button disabled={page === 1} onClick={() => setPage(page - 1)} className="p-1.5 rounded-lg border border-eco-border text-eco-text-muted hover:border-eco-green disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="p-1.5 rounded-lg border border-eco-border text-eco-text-muted hover:border-eco-green disabled:opacity-30 disabled:cursor-not-allowed transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Drawer */}
      {drawer && (
        <div className="fixed inset-0 z-50 bg-black/50" onClick={() => setDrawer(null)}>
          <div className="absolute right-0 top-0 bottom-0 w-full max-w-md bg-eco-bg-card border-l border-eco-border flex flex-col" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between px-6 py-4 border-b border-eco-border">
              <h2 className="font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>Lead #{drawer.id.slice(-6)}</h2>
              <button onClick={() => setDrawer(null)} className="text-eco-text-muted hover:text-eco-text"><X className="w-5 h-5" /></button>
            </div>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              <div className="space-y-2 text-sm">
                {[
                  { label: 'Nombre', val: drawer.nombre },
                  { label: 'Teléfono', val: drawer.telefono },
                  { label: 'Email', val: drawer.email },
                  { label: 'Localidad', val: drawer.localidad },
                  { label: 'Producto', val: drawer.producto_interes },
                  { label: 'Fuente', val: drawer.fuente },
                  { label: 'Fecha', val: new Date(drawer.creadoEn).toLocaleString('es-AR') },
                ].map(({ label, val }) => (
                  <div key={label} className="flex gap-2">
                    <span className="text-eco-text-muted w-24 flex-shrink-0">{label}</span>
                    <span className="text-eco-text">{val || '—'}</span>
                  </div>
                ))}
              </div>

              <div>
                <label className="block text-eco-text-muted text-xs mb-1">Estado</label>
                <select value={drawerEstado} onChange={(e) => setDrawerEstado(e.target.value)} className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green">
                  {ESTADOS.filter(Boolean).map((e) => <option key={e} value={e}>{e}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-eco-text-muted text-xs mb-1">Vendedor asignado</label>
                <select value={drawerVendedor} onChange={(e) => setDrawerVendedor(e.target.value)} className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green">
                  {VENDEDORES.filter(Boolean).map((v) => <option key={v} value={v}>{v}</option>)}
                </select>
              </div>

              <div>
                <label className="block text-eco-text-muted text-xs mb-1">Notas internas</label>
                <textarea
                  value={drawerNotas}
                  onChange={(e) => setDrawerNotas(e.target.value)}
                  rows={4}
                  className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green resize-none"
                  placeholder="Agregar nota sobre este lead…"
                />
              </div>

              <a
                href={`https://wa.me/${drawer.telefono.replace(/\D/g, '')}?text=${encodeURIComponent(`Hola ${drawer.nombre || ''}, te contactamos de Eco Módulos & Piscinas`)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-eco-bg-surface border border-eco-border hover:border-eco-green text-eco-text text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
              >
                Abrir WhatsApp
              </a>
            </div>
            <div className="p-6 border-t border-eco-border">
              <button onClick={guardarDrawer} disabled={saving} className="w-full bg-eco-green hover:bg-eco-green-light text-white font-semibold px-4 py-3 rounded-xl transition-colors disabled:opacity-50">
                {saving ? 'Guardando…' : 'Guardar cambios'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
