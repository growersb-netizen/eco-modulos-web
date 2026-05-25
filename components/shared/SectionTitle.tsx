import { cn } from '@/lib/utils'

interface SectionTitleProps {
  titulo: string
  subtitulo?: string
  centrado?: boolean
  className?: string
  badge?: string
  /** Show a short decorative green underline */
  decorLine?: boolean
}

export default function SectionTitle({
  titulo,
  subtitulo,
  centrado = true,
  className,
  badge,
  decorLine = true,
}: SectionTitleProps) {
  return (
    <div className={cn(centrado ? 'text-center' : '', className)}>
      {badge && (
        <span className="badge-green mb-4 inline-flex">
          {badge}
        </span>
      )}
      <h2
        className={cn(
          'text-3xl sm:text-4xl lg:text-5xl font-extrabold text-eco-text uppercase tracking-tight leading-tight',
          decorLine && (centrado ? 'heading-line heading-line-center' : 'heading-line'),
        )}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {titulo}
      </h2>
      {subtitulo && (
        <p className={cn(
          'mt-5 text-eco-text-muted text-base sm:text-lg leading-relaxed',
          centrado ? 'max-w-2xl mx-auto' : 'max-w-2xl',
        )}>
          {subtitulo}
        </p>
      )}
    </div>
  )
}
