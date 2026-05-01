'use client'

import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'
import { formatPeso } from '@/lib/utils'

interface Coeficiente {
  id: string; cuotas: number; coef: number; activo: boolean
}

export default function AdminFinanciacionPage() {
  const [coeficientes, setCoeficientes] = useState<Coeficiente[]>([])
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [precioEjemplo] = useState(3000000)

  useEffect(() => {
    fetch('/api/admin/coeficientes').then((r) => r.json()).then(setCoeficientes).finally(() => setLoading(false))
  }, [])

  function updateCoef(id: string, field: 'coef' | 'activo', value: number | boolean) {
    setCoeficientes((prev) => prev.map((c) => c.id === id ? { ...c, [field]: value } : c))
  }

  async function guardar() {
    setSaving(true)
    const res = await fetch('/api/admin/coeficientes', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(coeficientes.map(({ id, cuotas, coef, activo }) => ({ id, cuotas, coef, activo }))),
    })
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000) }
    setSaving(false)
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>Financiación</h1>
          <p className="text-eco-text-muted text-sm mt-1">Editá los coeficientes de cuotas. Los cambios se reflejan en el simulador en tiempo real.</p>
        </div>
        <button
          onClick={guardar}
          disabled={saving}
          className="flex items-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-semibold px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />{saving ? 'Guardando…' : saved ? '¡Guardado!' : 'Guardar cambios'}
        </button>
      </div>

      {loading ? (
        <div className="text-eco-text-muted">Cargando…</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Tabla editable */}
          <div className="bg-eco-bg-card border border-eco-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-eco-border">
              <h3 className="font-semibold text-eco-text">Coeficientes por plan</h3>
            </div>
            <div className="divide-y divide-eco-border">
              {coeficientes.map((c) => (
                <div key={c.id} className="px-4 py-3 flex items-center gap-4">
                  <span className="w-20 text-eco-text font-medium text-sm">{c.cuotas} cuotas</span>
                  <div className="flex-1">
                    <input
                      type="number"
                      step="0.01"
                      min="1"
                      value={c.coef}
                      onChange={(e) => updateCoef(c.id, 'coef', parseFloat(e.target.value))}
                      className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-eco-green"
                    />
                  </div>
                  <label className="flex items-center gap-2 text-sm text-eco-text-muted cursor-pointer">
                    <input
                      type="checkbox"
                      checked={c.activo}
                      onChange={(e) => updateCoef(c.id, 'activo', e.target.checked)}
                      className="accent-eco-green"
                    />
                    Activo
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Preview en tiempo real */}
          <div className="bg-eco-bg-card border border-eco-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-eco-border">
              <h3 className="font-semibold text-eco-text">Preview — {formatPeso(precioEjemplo)} de contado</h3>
            </div>
            <div className="divide-y divide-eco-border">
              {coeficientes.filter((c) => c.activo).map((c) => {
                const total = precioEjemplo * c.coef
                const cuota = Math.round(total / c.cuotas)
                return (
                  <div key={c.id} className="px-4 py-3 flex items-center justify-between">
                    <span className="text-eco-text-muted text-sm">{c.cuotas} cuotas</span>
                    <div className="text-right">
                      <span className="text-eco-green font-bold">{formatPeso(cuota)}/mes</span>
                      <span className="text-eco-text-muted text-xs ml-2">(total {formatPeso(Math.round(total))})</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
