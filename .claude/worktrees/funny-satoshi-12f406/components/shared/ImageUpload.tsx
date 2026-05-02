'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { Upload, X, Loader2, Link as LinkIcon, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  value?: string | null
  onChange: (url: string | null) => void
  className?: string
}

export default function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')
  const [mode, setMode] = useState<'upload' | 'url'>('upload')
  const [urlInput, setUrlInput] = useState('')
  const r2Enabled = typeof window !== 'undefined'
    ? true
    : !!process.env.R2_ACCOUNT_ID

  const onDrop = useCallback(
    async (accepted: File[]) => {
      const file = accepted[0]
      if (!file) return
      setError('')
      setUploading(true)
      try {
        const formData = new FormData()
        formData.append('file', file)
        const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })
        const json = await res.json()
        if (!res.ok) throw new Error(json.error || 'Error al subir')
        onChange(json.url)
      } catch (e: unknown) {
        const msg = e instanceof Error ? e.message : 'Error al subir imagen'
        // If R2 not configured, suggest URL mode
        if (msg.includes('no configurado') || msg.includes('503')) {
          setError('El almacenamiento R2 no está configurado. Usá la pestaña "URL" para pegar un enlace de imagen.')
        } else {
          setError(msg)
        }
      } finally {
        setUploading(false)
      }
    },
    [onChange]
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/jpeg': [], 'image/png': [], 'image/webp': [] },
    maxSize: 5 * 1024 * 1024,
    multiple: false,
  })

  function handleUrlConfirm() {
    const url = urlInput.trim()
    if (!url) return
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      setError('La URL debe empezar con https://')
      return
    }
    setError('')
    onChange(url)
    setUrlInput('')
  }

  if (value) {
    return (
      <div className={cn('relative', className)}>
        <div className="relative h-48 rounded-lg overflow-hidden border border-eco-border">
          <Image
            src={value}
            alt="Imagen"
            fill
            className="object-cover"
            unoptimized={!value.includes('r2.dev') && !value.includes('cloudflarestorage')}
          />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors"
            title="Quitar imagen"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs text-eco-text-muted mt-1 truncate">{value}</p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-2', className)}>
      {/* Tabs */}
      <div className="flex gap-1 bg-eco-bg-surface rounded-lg p-1 w-fit">
        <button
          type="button"
          onClick={() => { setMode('upload'); setError('') }}
          className={cn(
            'flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-colors',
            mode === 'upload'
              ? 'bg-eco-bg-card text-eco-text font-semibold'
              : 'text-eco-text-muted hover:text-eco-text'
          )}
        >
          <Upload className="w-3.5 h-3.5" />
          Subir archivo
        </button>
        <button
          type="button"
          onClick={() => { setMode('url'); setError('') }}
          className={cn(
            'flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-md transition-colors',
            mode === 'url'
              ? 'bg-eco-bg-card text-eco-text font-semibold'
              : 'text-eco-text-muted hover:text-eco-text'
          )}
        >
          <LinkIcon className="w-3.5 h-3.5" />
          Pegar URL
        </button>
      </div>

      {mode === 'upload' ? (
        <div
          {...getRootProps()}
          className={cn(
            'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
            isDragActive
              ? 'border-eco-green bg-eco-green/5'
              : 'border-eco-border hover:border-eco-green/60 bg-eco-bg-surface'
          )}
        >
          <input {...getInputProps()} />
          {uploading ? (
            <div className="flex flex-col items-center gap-2">
              <Loader2 className="w-8 h-8 text-eco-green animate-spin" />
              <p className="text-eco-text-muted text-sm">Subiendo imagen…</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-2">
              <Upload className="w-8 h-8 text-eco-text-muted" />
              <p className="text-eco-text-muted text-sm">
                {isDragActive ? 'Soltá la imagen aquí' : 'Arrastrá o hacé click para seleccionar'}
              </p>
              <p className="text-eco-text-muted text-xs">JPG, PNG, WebP — máx. 5 MB</p>
            </div>
          )}
        </div>
      ) : (
        <div className="space-y-2">
          <div className="flex gap-2">
            <input
              type="url"
              value={urlInput}
              onChange={(e) => { setUrlInput(e.target.value); setError('') }}
              onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleUrlConfirm())}
              placeholder="https://ejemplo.com/imagen.jpg"
              className="flex-1 bg-eco-bg-surface border border-eco-border rounded-lg px-3 py-2.5 text-eco-text text-sm placeholder-eco-text-muted focus:outline-none focus:border-eco-green"
            />
            <button
              type="button"
              onClick={handleUrlConfirm}
              disabled={!urlInput.trim()}
              className="bg-eco-green hover:bg-eco-green-light text-white px-4 py-2 rounded-lg transition-colors disabled:opacity-40 flex items-center gap-1"
            >
              <Check className="w-4 h-4" />
            </button>
          </div>
          <p className="text-xs text-eco-text-muted">
            Pegá un link público de Google Drive, Dropbox, ImgBB, WhatsApp Web, etc.
          </p>
        </div>
      )}

      {error && <p className="text-red-400 text-xs">{error}</p>}
    </div>
  )
}
