'use client'

import { useCallback, useState } from 'react'
import { useDropzone } from 'react-dropzone'
import Image from 'next/image'
import { Upload, X, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

interface ImageUploadProps {
  value?: string | null
  onChange: (url: string | null) => void
  className?: string
}

export default function ImageUpload({ value, onChange, className }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

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
        if (!res.ok) throw new Error((await res.json()).error || 'Error al subir')
        const { url } = await res.json()
        onChange(url)
      } catch (e: any) {
        setError(e.message || 'Error al subir imagen')
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

  if (value) {
    return (
      <div className={cn('relative', className)}>
        <div className="relative h-48 rounded-lg overflow-hidden border border-eco-border">
          <Image src={value} alt="Imagen subida" fill className="object-cover" />
          <button
            type="button"
            onClick={() => onChange(null)}
            className="absolute top-2 right-2 bg-red-600 hover:bg-red-700 text-white rounded-full p-1 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className={className}>
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
            <p className="text-eco-text-muted text-sm">Subiendo imagen...</p>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <Upload className="w-8 h-8 text-eco-text-muted" />
            <p className="text-eco-text-muted text-sm">
              {isDragActive ? 'Soltá la imagen aquí' : 'Arrastrá una imagen o hacé click'}
            </p>
            <p className="text-eco-text-muted text-xs">JPG, PNG, WebP — máx. 5MB</p>
          </div>
        )}
      </div>
      {error && <p className="text-red-400 text-xs mt-1">{error}</p>}
    </div>
  )
}
