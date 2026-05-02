'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Plus, Pencil, Trash2, ToggleLeft, ToggleRight } from 'lucide-react'

interface Articulo {
  id: string; titulo: string; slug: string; categoria: string | null
  publicado: boolean; creadoEn: string
}

export default function AdminBlogPage() {
  const [articulos, setArticulos] = useState<Articulo[]>([])
  const [loading, setLoading] = useState(true)

  const fetchArticulos = () => {
    fetch('/api/admin/blog').then((r) => r.json()).then(setArticulos).finally(() => setLoading(false))
  }

  useEffect(() => { fetchArticulos() }, [])

  async function togglePublicado(a: Articulo) {
    await fetch(`/api/admin/blog/${a.id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ publicado: !a.publicado }) })
    fetchArticulos()
  }

  async function eliminar(a: Articulo) {
    if (!confirm(`¿Eliminar "${a.titulo}"?`)) return
    await fetch(`/api/admin/blog/${a.id}`, { method: 'DELETE' })
    fetchArticulos()
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>Blog</h1>
        <Link href="/admin/blog/nuevo" className="flex items-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-semibold px-4 py-2 rounded-xl transition-colors">
          <Plus className="w-4 h-4" />Nuevo artículo
        </Link>
      </div>

      {loading ? (
        <div className="text-eco-text-muted">Cargando…</div>
      ) : (
        <div className="bg-eco-bg-card border border-eco-border rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-eco-border">
                  {['Título', 'Categoría', 'Publicado', 'Fecha', ''].map((h) => (
                    <th key={h} className="text-left px-4 py-3 text-eco-text-muted text-xs uppercase tracking-wider font-medium">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-eco-border">
                {articulos.map((a) => (
                  <tr key={a.id} className="hover:bg-eco-bg-surface transition-colors">
                    <td className="px-4 py-3">
                      <p className="text-eco-text font-medium">{a.titulo}</p>
                      <p className="text-eco-text-muted text-xs">/blog/{a.slug}</p>
                    </td>
                    <td className="px-4 py-3 text-eco-text-muted capitalize">{a.categoria || '—'}</td>
                    <td className="px-4 py-3">
                      <button onClick={() => togglePublicado(a)} className="flex items-center gap-1 text-sm">
                        {a.publicado ? <ToggleRight className="w-5 h-5 text-eco-green" /> : <ToggleLeft className="w-5 h-5 text-eco-text-muted" />}
                        <span className={a.publicado ? 'text-eco-green' : 'text-eco-text-muted'}>{a.publicado ? 'Publicado' : 'Borrador'}</span>
                      </button>
                    </td>
                    <td className="px-4 py-3 text-eco-text-muted text-xs">{new Date(a.creadoEn).toLocaleDateString('es-AR')}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2">
                        <Link href={`/admin/blog/${a.id}`} className="p-1.5 hover:bg-eco-bg-surface rounded-lg transition-colors text-eco-text-muted hover:text-eco-text"><Pencil className="w-4 h-4" /></Link>
                        <button onClick={() => eliminar(a)} className="p-1.5 hover:bg-red-900/20 rounded-lg transition-colors text-eco-text-muted hover:text-red-400"><Trash2 className="w-4 h-4" /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  )
}
