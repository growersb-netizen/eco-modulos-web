'use client'

import { useState, useEffect, use } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import Link from 'next/link'
import { ArrowLeft, Save, Eye } from 'lucide-react'

const schema = z.object({
  titulo: z.string().min(1, 'Requerido'),
  slug: z.string().optional(),
  resumen: z.string().optional(),
  contenido: z.string().min(1, 'Requerido'),
  imagen: z.string().url('URL inválida').optional().or(z.literal('')),
  categoria: z.string().optional(),
  publicado: z.boolean().optional(),
})

type FormValues = z.infer<typeof schema>

const CATEGORIAS = ['modulos', 'piscinas', 'financiacion', 'construccion']

export default function AdminBlogEditorPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const isNuevo = id === 'nuevo'
  const router = useRouter()
  const [loading, setLoading] = useState(!isNuevo)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(false)
  const [contenidoPreview, setContenidoPreview] = useState('')

  const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: { publicado: false },
  })

  const contenido = watch('contenido', '')

  useEffect(() => {
    if (!isNuevo) {
      fetch(`/api/admin/blog/${id}`).then((r) => r.json()).then((data) => {
        reset({
          titulo: data.titulo, slug: data.slug, resumen: data.resumen || '',
          contenido: data.contenido, imagen: data.imagen || '',
          categoria: data.categoria || '', publicado: data.publicado,
        })
        setContenidoPreview(data.contenido)
      }).finally(() => setLoading(false))
    }
  }, [id, isNuevo, reset])

  async function onSubmit(data: FormValues) {
    setSaving(true)
    setError('')
    const url = isNuevo ? '/api/admin/blog' : `/api/admin/blog/${id}`
    const method = isNuevo ? 'POST' : 'PUT'
    const res = await fetch(url, { method, headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
    if (res.ok) {
      router.push('/admin/blog')
    } else {
      const d = await res.json().catch(() => ({}))
      setError(d.error || 'Error al guardar')
    }
    setSaving(false)
  }

  if (loading) return <div className="text-eco-text-muted">Cargando…</div>

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin/blog" className="p-2 hover:bg-eco-bg-surface rounded-lg text-eco-text-muted hover:text-eco-text transition-colors">
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <h1 className="text-2xl font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>
            {isNuevo ? 'Nuevo artículo' : 'Editar artículo'}
          </h1>
        </div>
        <button onClick={() => setPreview(!preview)} className="flex items-center gap-2 border border-eco-border text-eco-text-muted hover:border-eco-green hover:text-eco-green px-3 py-2 rounded-xl text-sm transition-colors">
          <Eye className="w-4 h-4" />{preview ? 'Editar' : 'Preview'}
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Editor principal */}
        <div className="lg:col-span-2 space-y-4">
          <div>
            <label className="block text-eco-text-muted text-xs mb-1">Título</label>
            <input {...register('titulo')} className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-4 py-3 text-lg font-semibold focus:outline-none focus:border-eco-green" placeholder="Título del artículo" />
            {errors.titulo && <p className="text-red-400 text-xs mt-1">{errors.titulo.message}</p>}
          </div>

          <div>
            <label className="block text-eco-text-muted text-xs mb-1">Resumen (aparece en el listado)</label>
            <textarea {...register('resumen')} rows={2} className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-eco-green resize-none" placeholder="Breve descripción del artículo…" />
          </div>

          <div>
            <label className="block text-eco-text-muted text-xs mb-1">Contenido</label>
            {preview ? (
              <div
                className="min-h-64 bg-eco-bg-surface border border-eco-border rounded-xl p-4 prose prose-invert prose-sm max-w-none text-eco-text-muted prose-headings:text-eco-text"
                dangerouslySetInnerHTML={{ __html: contenido.replace(/\n/g, '<br/>') }}
              />
            ) : (
              <textarea
                {...register('contenido')}
                rows={20}
                onChange={(e) => setContenidoPreview(e.target.value)}
                className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-eco-green resize-none font-mono"
                placeholder="Escribí el contenido del artículo aquí…"
              />
            )}
            {errors.contenido && <p className="text-red-400 text-xs mt-1">{errors.contenido.message}</p>}
          </div>
        </div>

        {/* Panel lateral */}
        <div className="space-y-4">
          <div className="bg-eco-bg-card border border-eco-border rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-eco-text font-semibold text-sm">Publicar</span>
              <label className="flex items-center gap-2 cursor-pointer">
                <input {...register('publicado')} type="checkbox" className="accent-eco-green w-4 h-4" />
                <span className="text-eco-text-muted text-xs">Visible en el sitio</span>
              </label>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button type="submit" disabled={saving} className="w-full flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-semibold px-4 py-2 rounded-xl transition-colors disabled:opacity-50">
              <Save className="w-4 h-4" />{saving ? 'Guardando…' : 'Guardar'}
            </button>
          </div>

          <div className="bg-eco-bg-card border border-eco-border rounded-xl p-4 space-y-4">
            <h3 className="font-semibold text-eco-text text-sm">Configuración</h3>

            <div>
              <label className="block text-eco-text-muted text-xs mb-1">Slug (URL)</label>
              <input {...register('slug')} className="w-full bg-eco-bg-surface border border-eco-border text-eco-text-muted rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green" placeholder="auto-generado-del-titulo" />
            </div>

            <div>
              <label className="block text-eco-text-muted text-xs mb-1">Categoría</label>
              <select {...register('categoria')} className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green">
                <option value="">Sin categoría</option>
                {CATEGORIAS.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-eco-text-muted text-xs mb-1">URL imagen destacada</label>
              <input {...register('imagen')} className="w-full bg-eco-bg-surface border border-eco-border text-eco-text rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-eco-green" placeholder="https://…" />
              {errors.imagen && <p className="text-red-400 text-xs mt-1">{errors.imagen.message}</p>}
            </div>
          </div>
        </div>
      </form>
    </div>
  )
}
