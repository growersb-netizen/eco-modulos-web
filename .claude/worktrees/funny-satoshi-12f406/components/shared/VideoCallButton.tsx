'use client'

import { useState } from 'react'
import { Video } from 'lucide-react'
import { cn } from '@/lib/utils'
import VideoCallModal from './VideoCallModal'

interface VideoCallButtonProps {
  className?: string
  variant?: 'primary' | 'outline'
  label?: string
  productoDefault?: string
}

export default function VideoCallButton({
  className,
  variant = 'outline',
  label = 'Agendar videollamada gratuita',
  productoDefault,
}: VideoCallButtonProps) {
  const [open, setOpen] = useState(false)

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={cn(
          'flex items-center gap-2 font-semibold py-3 px-6 rounded-lg transition-colors',
          variant === 'primary'
            ? 'bg-eco-teal hover:bg-eco-teal-light text-white'
            : 'border border-eco-green text-eco-green hover:bg-eco-green hover:text-white',
          className
        )}
      >
        <Video className="w-5 h-5" />
        {label}
      </button>

      <VideoCallModal
        isOpen={open}
        onClose={() => setOpen(false)}
        productoDefault={productoDefault}
      />
    </>
  )
}
