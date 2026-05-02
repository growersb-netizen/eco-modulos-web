import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface MetricCardProps {
  titulo: string
  valor: number | string
  icono: ReactNode
  color?: 'green' | 'teal' | 'yellow' | 'red'
  descripcion?: string
}

const colorMap = {
  green: 'text-eco-green bg-eco-green/10',
  teal:  'text-eco-teal bg-eco-teal/10',
  yellow: 'text-yellow-400 bg-yellow-400/10',
  red:   'text-red-400 bg-red-400/10',
}

export default function MetricCard({ titulo, valor, icono, color = 'green', descripcion }: MetricCardProps) {
  return (
    <div className="bg-eco-bg-card border border-eco-border rounded-xl p-5">
      <div className="flex items-center justify-between mb-3">
        <p className="text-eco-text-muted text-sm">{titulo}</p>
        <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center', colorMap[color])}>
          {icono}
        </div>
      </div>
      <p className="text-3xl font-extrabold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>
        {typeof valor === 'number' ? valor.toLocaleString('es-AR') : valor}
      </p>
      {descripcion && <p className="text-eco-text-muted text-xs mt-1">{descripcion}</p>}
    </div>
  )
}
