'use client'

import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Image from 'next/image'
import { Plus, Trash2, X } from 'lucide-react'
import ImageUpload from '@/components/shared/ImageUpload'

const schema = z.object({
  titulo: z.string().min(1, 'Requerido'),
  localidad: z.string().min(1, 'Requerido'),
  provincia: z.string().min(1, 'Requerido'),
  tipo: z.enum(['modulo', 'piscina', 'combo']),
  descripcion: z.string().optional(),
})

type FormValues = z.infer<typeof schema>

interface Obra {
  id: string; titulo: string; localidad: string; provincia: string
  tipo: string; descripcion: string | null; imagen: string | null
  activo: boolean; creadoEn: string
}

export default function AdminObrasPage() {
  const [obras, setObras] = useState<Obra[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [imagenUrl, setImagenUrl] = useState('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { tipo: 'modulo' } })

  const fetchObras = () => {
    fetch('/api/admin/obras').then((r) => r.json()).then(setObras).finally(() => setLoading(false))
  }

  useEffect(() => { fetchObras() }, [])

  function abrirModal() {
    reset({ titulo: '', localidad: '', provincia: '', tipo: 'modulo', descripcion: '' })
    setImagenUrl('')
    setError('')
    setModalOpen(true)
  }

  async function onSubmit(data: FormValues) {
    if (!imagenUrl) { setError('La imagen es requerida'); return }
    setSaving(true)
    const res = await fetch('/api/admin/obras', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, imagen: imagenUrl }),
    })
    if (res.ok) { setModalOpen(false); fetchObras() } else { setError('Error al guardar') }
    setSaving(false)
  }

  async function eliminar(o: Obra) {
    if (!confirm(`¿Eliminar "${o.titulo}"? También se eliminará la imagen.`)) return
    await fetch(`/api/admin/obras/${o.id}`, { method: 'DELETE' })
    fetchObras()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>Obras</h1>
        <button onClick={abrirModal} className="flex items-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-4 h-4" />Nueva obra
        </button>
      </div>

      {loading ? (
        <div className="text-eco-text-muted">Cargando…</div>
      ) : obras.length === 0 ? (
        <div className="text-center py-20 text-eco-text-muted border border-dashed border-eco-border rounded-xl">
          <p>No hay obras. Subí la primera imagen.</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
          {obras.map((o) => (
            <div key={o.id} className="relative group bg-eco-bg-surface rounded-xl overflow-hidden aspect-video">
              {o.imagen && (
                <Image src={o.imagen} alt={o.titulo} fill className="object-cover" sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw" />
              )}
              <div className="absolute inset-0 bg-black/70 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-between p-3">
                <button onClick={() => eliminar(o)} className="self-end p-1.5 bg-red-900/50 hover:bg-red-900 rounded-lg transition-colors">
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
                <div>
                  <p className="text-white text-xs font-semibold">{o.titulo}</p>
                  <p className="text-gray-400 text-xs">{o.localidad}, {o.provincia}</p>
                  <span className="inline-block mt-1 bg-eco-green/30 text-eco-green text-xs px-1.5 py-0.5 rounded capitalize">{o.tipo}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-eco-bg-card border border-eco-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-eco-border">
              <h2 className="font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>Nueva obra</h2>
              <button onClick={() => setModalOpen(false)} className="text-eco-text-muted hover:text-eco-text"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className="block text-eco-text-muted text-xs mb-2">Imagen</label>
                <ImageUpload value={imagenUrl || null} onChange={(url) => setImagenUrl(url || '')} />
                {!imagenUrl && error && <p className="text-red-400 text-xs mt-1">{error}</p>}
              </div>

              {[
                { label: 'Título', name: 'titulo' as const },
                { label: 'Localidad', name: 'localidad' as const },
                { label: 'Provincia', name: 'provincia' as const },
              ].map(({ label, name }) => (
                <div key={name}>
                  <label className="block text-eco-text-muted text-xs mb-1">{label}</label>
                  <input {...register(name)} className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green" />
                  {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]?.message}</p>}
                </div>
              ))}

              <div>
                <label className="block text-eco-text-muted text-xs mb-1">Tipo</label>
                <select {...register('tipo')} className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green">
                  <option value="modulo">Módulo</option>
                  <option value="piscina">Piscina</option>
                  <option value="combo">Combo</option>
                </select>
              </div>

              <div>
                <label className="block text-eco-text-muted text-xs mb-1">Descripción (opcional)</label>
                <textarea {...register('descripcion')} rows={2} className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green resize-none" />
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setModalOpen(false)} className="flex-1 border border-eco-border text-eco-text-muted px-4 py-2 rounded-xl hover:border-eco-text transition-colors">Cancelar</button>
                <button type="submit" disabled={saving} className="flex-1 bg-eco-green hover:bg-eco-green-light text-white font-semibold px-4 py-2 rounded-xl transition-colors disabled:opacity-50">
                  {saving ? 'Guardando…' : 'Guardar'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
