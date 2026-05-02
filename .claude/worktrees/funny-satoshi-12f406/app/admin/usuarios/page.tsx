'use client'

import { useState, useEffect } from 'react'
import { useSession } from 'next-auth/react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Plus, Pencil, X, ToggleLeft, ToggleRight } from 'lucide-react'

const schema = z.object({
  nombre: z.string().min(1, 'Requerido'),
  email: z.string().email('Email inválido'),
  password: z.string().min(8, 'Mínimo 8 caracteres').optional().or(z.literal('')),
  rol: z.enum(['admin', 'vendedor']),
  activo: z.boolean().optional(),
})

type FormValues = z.infer<typeof schema>

interface Usuario {
  id: string; nombre: string; email: string; rol: string; activo: boolean; creadoEn: string
}

export default function AdminUsuariosPage() {
  const { data: session } = useSession()
  const [usuarios, setUsuarios] = useState<Usuario[]>([])
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [editando, setEditando] = useState<Usuario | null>(null)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const isAdmin = session?.user?.rol === 'admin'
  const { register, handleSubmit, reset, formState: { errors } } = useForm<FormValues>({ resolver: zodResolver(schema), defaultValues: { rol: 'vendedor', activo: true } })

  const fetchUsuarios = () => {
    fetch('/api/admin/usuarios').then((r) => r.json()).then(setUsuarios).finally(() => setLoading(false))
  }

  useEffect(() => { fetchUsuarios() }, [])

  function abrirCrear() {
    if (!isAdmin) return
    setEditando(null)
    reset({ nombre: '', email: '', password: '', rol: 'vendedor', activo: true })
    setModalOpen(true)
  }

  function abrirEditar(u: Usuario) {
    if (!isAdmin) return
    setEditando(u)
    reset({ nombre: u.nombre, email: u.email, password: '', rol: u.rol as 'admin' | 'vendedor', activo: u.activo })
    setModalOpen(true)
  }

  async function onSubmit(data: FormValues) {
    setSaving(true)
    setError('')
    const url = editando ? `/api/admin/usuarios/${editando.id}` : '/api/admin/usuarios'
    const method = editando ? 'PUT' : 'POST'
    const body = { ...data }
    if (!body.password) delete body.password
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) })
    if (res.ok) { setModalOpen(false); fetchUsuarios() } else {
      const d = await res.json().catch(() => ({}))
      setError(d.error || 'Error al guardar')
    }
    setSaving(false)
  }

  async function toggleActivo(u: Usuario) {
    if (!isAdmin || u.id === session?.user?.id) return
    await fetch(`/api/admin/usuarios/${u.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ activo: !u.activo }) })
    fetchUsuarios()
  }

  if (!isAdmin) {
    return (
      <div className="text-center py-20">
        <p className="text-eco-text-muted">Solo los administradores pueden ver esta sección.</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>Usuarios</h1>
        <button onClick={abrirCrear} className="flex items-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-4 h-4" />Nuevo usuario
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
                  {['Nombre', 'Email', 'Rol', 'Activo', 'Creado', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-eco-text-muted text-xs uppercase tracking-wider font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-eco-border">
                {usuarios.map((u) => (
                  <tr key={u.id} className="hover:bg-eco-bg-surface transition-colors">
                    <td className="px-4 py-3 text-eco-text font-medium">{u.nombre}</td>
                    <td className="px-4 py-3 text-eco-text-muted">{u.email}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${u.rol === 'admin' ? 'bg-purple-900/30 text-purple-400' : 'bg-eco-bg-surface text-eco-text-muted'}`}>
                        {u.rol}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <button
                        onClick={() => toggleActivo(u)}
                        disabled={u.id === session?.user?.id}
                        className="flex items-center gap-1 text-sm disabled:opacity-40 disabled:cursor-not-allowed"
                      >
                        {u.activo ? <ToggleRight className="w-5 h-5 text-eco-green" /> : <ToggleLeft className="w-5 h-5 text-eco-text-muted" />}
                      </button>
                    </td>
                    <td className="px-4 py-3 text-eco-text-muted text-xs">{new Date(u.creadoEn).toLocaleDateString('es-AR')}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => abrirEditar(u)} className="p-1.5 hover:bg-eco-bg-surface rounded-lg transition-colors text-eco-text-muted hover:text-eco-text"><Pencil className="w-4 h-4" /></button>
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
          <div className="bg-eco-bg-card border border-eco-border rounded-2xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-eco-border">
              <h2 className="font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>{editando ? 'Editar usuario' : 'Nuevo usuario'}</h2>
              <button onClick={() => setModalOpen(false)} className="text-eco-text-muted hover:text-eco-text"><X className="w-5 h-5" /></button>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
              <div>
                <label className="block text-eco-text-muted text-xs mb-1">Nombre</label>
                <input {...register('nombre')} className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green" />
                {errors.nombre && <p className="text-red-400 text-xs mt-1">{errors.nombre.message}</p>}
              </div>
              <div>
                <label className="block text-eco-text-muted text-xs mb-1">Email</label>
                <input {...register('email')} type="email" className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green" />
                {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
              </div>
              <div>
                <label className="block text-eco-text-muted text-xs mb-1">{editando ? 'Nueva contraseña (dejar vacío para no cambiar)' : 'Contraseña'}</label>
                <input {...register('password')} type="password" className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green" />
                {errors.password && <p className="text-red-400 text-xs mt-1">{errors.password.message}</p>}
              </div>
              <div>
                <label className="block text-eco-text-muted text-xs mb-1">Rol</label>
                <select {...register('rol')} className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green">
                  <option value="vendedor">Vendedor</option>
                  <option value="admin">Admin</option>
                </select>
              </div>
              {editando && (
                <label className="flex items-center gap-2 cursor-pointer text-sm text-eco-text-muted">
                  <input {...register('activo')} type="checkbox" className="accent-eco-green" />
                  Usuario activo
                </label>
              )}
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
