'use client'

import { Calendar } from 'lucide-react'
import { trackCalendly } from '@/lib/analytics'
import { cn } from '@/lib/utils'

interface CalendlyButtonProps {
  className?: string
  variant?: 'primary' | 'outline'
  label?: string
}

export default function CalendlyButton({
  className,
  variant = 'outline',
  label = 'Agendar videollamada gratuita',
}: CalendlyButtonProps) {
  const url = process.env.NEXT_PUBLIC_CALENDLY_URL || 'https://calendly.com/ecomodulos/videollamada'

  function handleClick() {
    trackCalendly()
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  return (
    <button
      onClick={handleClick}
      className={cn(
        'flex items-center gap-2 font-semibold py-3 px-6 rounded-lg transition-colors',
        variant === 'primary'
          ? 'bg-eco-teal hover:bg-eco-teal-light text-white'
          : 'border border-eco-green text-eco-green hover:bg-eco-green hover:text-white',
        className
      )}
    >
      <Calendar className="w-5 h-5" />
      {label}
    </button>
  )
}
