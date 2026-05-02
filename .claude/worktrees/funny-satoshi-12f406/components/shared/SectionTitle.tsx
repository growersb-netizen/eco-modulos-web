import { cn } from '@/lib/utils'

interface SectionTitleProps {
  titulo: string
  subtitulo?: string
  centrado?: boolean
  className?: string
  badge?: string
}

export default function SectionTitle({
  titulo,
  subtitulo,
  centrado = true,
  className,
  badge,
}: SectionTitleProps) {
  return (
    <div className={cn(centrado ? 'text-center' : '', className)}>
      {badge && (
        <span className="inline-block bg-eco-green/10 text-eco-green text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
          {badge}
        </span>
      )}
      <h2
        className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-eco-text uppercase tracking-tight leading-tight"
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {titulo}
      </h2>
      {subtitulo && (
        <p className="mt-3 text-eco-text-muted text-base sm:text-lg max-w-2xl mx-auto">
          {subtitulo}
        </p>
      )}
    </div>
  )
}
