'use client'

import { useState, useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Pencil, Trash2, Star, X } from 'lucide-react'

const schema = z.object({
  nombre: z.string().min(1, 'Requerido'),
  localidad: z.string().min(1, 'Requerido'),
  producto: z.string().min(1, 'Requerido'),
  texto: z.string().min(10, 'Mínimo 10 caracteres'),
  estrellas: z.coerce.number().int().min(1).max(5),
  orden: z.coerce.number().int().nonnegative().optional(),
})

type FormValues = z.infer<typeof schema>

interface Testimonio {
  id: string; nombre: string; localidad: string; producto: string
  texto: string; estrellas: number; orden: number; activo: boolean
}

export default function AdminTestimoniosPage() {
  const [testimonios, setTestimonios] = useState<Testimonio[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editando, setEditando] = useState<Testimonio | null>(null)
  const [estrellas, setEstrellas] = useState(5)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) as Resolver<FormValues>, defaultValues: { estrellas: 5 } })

  const fetch_ = () => {
    fetch('/api/admin/testimonios').then((r) => r.json()).then(setTestimonios).finally(() => setLoading(false))
  }

  useEffect(() => { fetch_() }, [])

  function abrirCrear() {
    setEditando(null)
    setEstrellas(5)
    reset({ nombre: '', localidad: '', producto: '', texto: '', estrellas: 5, orden: 0 })
    setModalOpen(true)
  }

  function abrirEditar(t: Testimonio) {
    setEditando(t)
    setEstrellas(t.estrellas)
    reset({ nombre: t.nombre, localidad: t.localidad, producto: t.producto, texto: t.texto, estrellas: t.estrellas, orden: t.orden })
    setModalOpen(true)
  }

  async function onSubmit(data: FormValues) {
    setSaving(true)
    setError('')
    const url = editando ? `/api/admin/testimonios/${editando.id}` : '/api/admin/testimonios'
    const method = editando ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (res.ok) { setModalOpen(false); fetch_() } else { setError('Error al guardar') }
    setSaving(false)
  }

  async function eliminar(t: Testimonio) {
    if (!confirm(`¿Eliminar el testimonio de "${t.nombre}"?`)) return
    await fetch(`/api/admin/testimonios/${t.id}`, { method: 'DELETE' })
    fetch_()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>Testimonios</h1>
        <button onClick={abrirCrear} className="flex items-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-4 h-4" />Nuevo testimonio
        </button>
      </div>

      {loading ? (
        <div className="text-eco-text-muted">Cargando…</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {testimonios.map((t) => (
            <div key={t.id} className="bg-eco-bg-card border border-eco-border rounded-xl p-5 flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <div className="flex">{Array.from({ length: t.estrellas }).map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
                <div className="flex gap-1.5">
                  <button onClick={() => abrirEditar(t)} className="p-1.5 hover:bg-eco-bg-surface rounded-lg text-eco-text-muted hover:text-eco-text transition-colors"><Pencil className="w-4 h-4" /></button>
                  <button onClick={() => eliminar(t)} className="p-1.5 hover:bg-red-900/20 rounded-lg text-eco-text-muted hover:text-red-400 transition-colors"><Trash2 className="w-4 h-4" /></button>
                </div>
              </div>
              <p className="text-eco-text text-sm flex-1">"{t.texto}"</p>
              <div>
                <p className="text-eco-text font-semibold text-sm">{t.nombre}</p>
                <p className="text-eco-text-muted text-xs">{t.localidad} · {t.producto}</p>
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
              <h2 className="font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>{editando ? 'Editar testimonio' : 'Nuevo testimonio'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-eco-text-muted hover:text-eco-text"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className="block text-eco-text-muted text-xs mb-2">Estrellas</label>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((n) => (
                    <button key={n} type="button" onClick={() => { setEstrellas(n); setValue('estrellas', n) }}>
                      <Star className={`w-6 h-6 ${n <= estrellas ? 'text-yellow-400 fill-yellow-400' : 'text-eco-text-muted'}`} />
                    </button>
                  ))}
                </div>
              </div>
              {[
                { label: 'Nombre', name: 'nombre' as const },
                { label: 'Localidad', name: 'localidad' as const },
                { label: 'Producto', name: 'producto' as const, placeholder: 'ej: Módulo 18 m²' },
              ].map(({ label, name, placeholder }) => (
                <div key={name}>
                  <label className="block text-eco-text-muted text-xs mb-1">{label}</label>
                  <input {...register(name)} placeholder={placeholder} className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green" />
                  {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]?.message}</p>}
                </div>
              ))}
              <div>
                <label className="block text-eco-text-muted text-xs mb-1">Texto del testimonio</label>
                <textarea {...register('texto')} rows={3} className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green resize-none" />
                {errors.texto && <p className="text-red-400 text-xs mt-1">{errors.texto.message}</p>}
              </div>
              <div>
                <label className="block text-eco-text-muted text-xs mb-1">Orden</label>
                <input {...register('orden')} type="number" className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green" />
              </div>
              {error && <p className="text-red-400 text-sm">{error}</p>}
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
