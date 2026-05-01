'use client'

import { useState, useEffect } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight, X } from 'lucide-react'
import { formatPeso } from '@/lib/utils'

const schema = z.object({
  nombre: z.string().min(1, 'Requerido'),
  medida: z.string().min(1, 'Requerido'),
  descripcion: z.string().min(1, 'Requerido'),
  precio_contado: z.coerce.number().positive('Debe ser positivo'),
  precio_lista: z.coerce.number().positive('Debe ser positivo'),
  imagen: z.string().url('URL inválida').optional().or(z.literal('')),
  usos: z.string().optional(),
  orden: z.coerce.number().int().nonnegative().optional(),
})

type FormValues = z.infer<typeof schema>

interface Modulo {
  id: string; nombre: string; medida: string; descripcion: string
  precio_contado: number; precio_lista: number; imagen: string | null
  usos: string; orden: number; activo: boolean
}

export default function AdminModulosPage() {
  const [modulos, setModulos] = useState<Modulo[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editando, setEditando] = useState<Modulo | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema) as Resolver<FormValues> })

  const fetchModulos = () => {
    fetch('/api/admin/modulos').then((r) => r.json()).then(setModulos).finally(() => setLoading(false))
  }

  useEffect(() => { fetchModulos() }, [])

  function abrirCrear() {
    setEditando(null)
    reset({ nombre: '', medida: '', descripcion: '', precio_contado: 0, precio_lista: 0, imagen: '', usos: '', orden: 0 })
    setModalOpen(true)
  }

  function abrirEditar(m: Modulo) {
    setEditando(m)
    reset({
      nombre: m.nombre, medida: m.medida, descripcion: m.descripcion,
      precio_contado: m.precio_contado, precio_lista: m.precio_lista,
      imagen: m.imagen || '', usos: JSON.parse(m.usos || '[]').join(', '), orden: m.orden,
    })
    setModalOpen(true)
  }

  async function onSubmit(data: FormValues) {
    setSaving(true)
    setError('')
    const usos = data.usos ? JSON.stringify(data.usos.split(',').map((u) => u.trim()).filter(Boolean)) : '[]'
    const body = { ...data, usos }
    const url = editando ? `/api/admin/modulos/${editando.id}` : '/api/admin/modulos'
    const method = editando ? 'PUT' : 'POST'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (res.ok) { setModalOpen(false); fetchModulos() } else { setError('Error al guardar') }
    setSaving(false)
  }

  async function toggleActivo(m: Modulo) {
    await fetch(`/api/admin/modulos/${m.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ activo: !m.activo }) })
    fetchModulos()
  }

  async function eliminar(m: Modulo) {
    if (!confirm(`¿Eliminar "${m.nombre}"? Esta acción no se puede deshacer.`)) return
    await fetch(`/api/admin/modulos/${m.id}`, { method: 'DELETE' })
    fetchModulos()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>Módulos</h1>
        <button onClick={abrirCrear} className="flex items-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-4 h-4" />Nuevo módulo
        </button>
      </div>

      {loading ? (
        <div className="text-eco-text-muted">Cargando…</div>
      ) : (
        <div className="bg-eco-bg-card border border-eco-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-eco-border">
                  {['Nombre', 'Medida', 'Precio contado', 'Precio lista', 'Orden', 'Activo', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-eco-text-muted text-xs uppercase tracking-wider font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-eco-border">
                {modulos.map((m) => (
                  <tr key={m.id} className="hover:bg-eco-bg-surface transition-colors">
                    <td className="px-4 py-3 text-eco-text font-medium">{m.nombre}</td>
                    <td className="px-4 py-3 text-eco-text-muted">{m.medida}</td>
                    <td className="px-4 py-3 text-eco-green font-semibold">{formatPeso(m.precio_contado)}</td>
                    <td className="px-4 py-3 text-eco-text-muted">{formatPeso(m.precio_lista)}</td>
                    <td className="px-4 py-3 text-eco-text-muted">{m.orden}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => toggleActivo(m)} className="flex items-center gap-1 text-sm">
                        {m.activo ? <ToggleRight className="w-5 h-5 text-eco-green" /> : <ToggleLeft className="w-5 h-5 text-eco-text-muted" />}
                        <span className={m.activo ? 'text-eco-green' : 'text-eco-text-muted'}>{m.activo ? 'Activo' : 'Inactivo'}</span>
                      </button>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <button onClick={() => abrirEditar(m)} className="p-1.5 hover:bg-eco-bg-surface rounded-lg transition-colors text-eco-text-muted hover:text-eco-text"><Pencil className="w-4 h-4" /></button>
                        <button onClick={() => eliminar(m)} className="p-1.5 hover:bg-red-900/20 rounded-lg transition-colors text-eco-text-muted hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-eco-bg-card border border-eco-border rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-eco-border">
              <h2 className="font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>{editando ? 'Editar módulo' : 'Nuevo módulo'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-eco-text-muted hover:text-eco-text"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              {[
                { label: 'Nombre', name: 'nombre' as const },
                { label: 'Medida (ej: 6x3 m)', name: 'medida' as const },
                { label: 'Descripción', name: 'descripcion' as const },
                { label: 'Precio contado ($)', name: 'precio_contado' as const, type: 'number' },
                { label: 'Precio lista ($)', name: 'precio_lista' as const, type: 'number' },
                { label: 'URL imagen', name: 'imagen' as const },
                { label: 'Usos (separados por coma)', name: 'usos' as const },
                { label: 'Orden', name: 'orden' as const, type: 'number' },
              ].map(({ label, name, type = 'text' }) => (
                <div key={name}>
                  <label className="block text-eco-text-muted text-xs mb-1">{label}</label>
                  <input {...register(name)} type={type} className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green" />
                  {errors[name] && <p className="text-red-400 text-xs mt-1">{errors[name]?.message}</p>}
                </div>
              ))}
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
