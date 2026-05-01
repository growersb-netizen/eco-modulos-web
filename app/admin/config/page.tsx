'use client'

import { useState, useEffect } from 'react'
import { Save } from 'lucide-react'

interface ConfigEntry { label: string; key: string; type?: 'text' | 'textarea' | 'url'; placeholder?: string }

const SECCIONES: { titulo: string; items: ConfigEntry[] }[] = [
  {
    titulo: 'Hero',
    items: [
      { label: 'Título principal', key: 'hero_titulo', type: 'textarea', placeholder: 'TU VIVIENDA O PISCINA. SIN BANCO. HASTA 120 CUOTAS.' },
      { label: 'Subtítulo', key: 'hero_subtitulo', placeholder: 'Fabricación directa. Financiación propia. Todo el país.' },
    ],
  },
  {
    titulo: 'Empresa',
    items: [
      { label: 'Nombre empresa', key: 'empresa_nombre', placeholder: 'Eco Módulos & Piscinas' },
      { label: 'Dirección', key: 'empresa_direccion', placeholder: 'Zárate, Buenos Aires' },
      { label: 'Teléfono general', key: 'empresa_telefono', placeholder: '+54 11 4449-8854' },
      { label: 'Email', key: 'empresa_email', type: 'url', placeholder: 'info@ecomodulosypiscinas.com.ar' },
    ],
  },
  {
    titulo: 'Redes sociales',
    items: [
      { label: 'Instagram URL', key: 'social_instagram', type: 'url', placeholder: 'https://instagram.com/ecomodulos' },
      { label: 'Facebook URL', key: 'social_facebook', type: 'url', placeholder: 'https://facebook.com/ecomodulos' },
      { label: 'YouTube URL', key: 'social_youtube', type: 'url', placeholder: 'https://youtube.com/@ecomodulos' },
    ],
  },
  {
    titulo: 'Precios y financiación',
    items: [
      { label: 'Multiplicador precio lista (ej: 1.40 = +40%)', key: 'precio_multiplicador', placeholder: '1.40' },
    ],
  },
  {
    titulo: 'Analytics',
    items: [
      { label: 'Google Analytics ID', key: 'ga_id', placeholder: 'G-XXXXXXXXXX' },
      { label: 'Meta Pixel ID', key: 'meta_pixel_id', placeholder: '123456789' },
    ],
  },
]

export default function AdminConfigPage() {
  const [config, setConfig] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    fetch('/api/admin/config').then((r) => r.json()).then(setConfig).finally(() => setLoading(false))
  }, [])

  function updateKey(key: string, value: string) {
    setConfig((prev) => ({ ...prev, [key]: value }))
  }

  async function guardar() {
    setSaving(true)
    const res = await fetch('/api/admin/config', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(config),
    })
    if (res.ok) { setSaved(true); setTimeout(() => setSaved(false), 3000) }
    setSaving(false)
  }

  if (loading) return <div className="text-eco-text-muted">Cargando…</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>Configuración</h1>
          <p className="text-eco-text-muted text-sm mt-1">Los cambios se reflejan en el sitio sin necesidad de deploy.</p>
        </div>
        <button
          onClick={guardar}
          disabled={saving}
          className="flex items-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-semibold px-4 py-2 rounded-xl transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4" />{saving ? 'Guardando…' : saved ? '¡Guardado!' : 'Guardar todo'}
        </button>
      </div>

      <div className="space-y-8">
        {SECCIONES.map((sec) => (
          <div key={sec.titulo} className="bg-eco-bg-card border border-eco-border rounded-xl overflow-hidden">
            <div className="px-6 py-4 border-b border-eco-border">
              <h3 className="font-semibold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>{sec.titulo}</h3>
            </div>
            <div className="p-6 space-y-4">
              {sec.items.map((item) => (
                <div key={item.key}>
                  <label className="block text-eco-text-muted text-xs mb-1">{item.label}</label>
                  {item.type === 'textarea' ? (
                    <textarea
                      value={config[item.key] || ''}
                      onChange={(e) => updateKey(item.key, e.target.value)}
                      rows={2}
                      placeholder={item.placeholder}
                      className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-eco-green resize-none"
                    />
                  ) : (
                    <input
                      type={item.type === 'url' ? 'text' : 'text'}
                      value={config[item.key] || ''}
                      onChange={(e) => updateKey(item.key, e.target.value)}
                      placeholder={item.placeholder}
                      className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-4 py-2 text-sm focus:outline-none focus:border-eco-green"
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
