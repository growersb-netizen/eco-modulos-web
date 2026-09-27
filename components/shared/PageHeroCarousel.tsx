'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ChevronLeft, ChevronRight, MessageCircle, ShoppingCart, ArrowRight } from 'lucide-react'

export interface PageSlide {
  badge: string
  titulo: string
  subtitulo: string
  imagen: string
  btns: Array<{
    label: string
    href: string
    primary?: boolean
    external?: boolean
    icon?: 'cart' | 'wa' | 'arrow'
  }>
  acento?: 'teal' | 'green' | 'blue'
}

const ICON_MAP = {
  cart:  <ShoppingCart className="w-4 h-4" />,
  wa:    <MessageCircle className="w-4 h-4" />,
  arrow: <ArrowRight className="w-4 h-4" />,
}

const ACENTO: Record<string, string> = {
  teal:  'bg-eco-teal hover:bg-eco-teal-light shadow-[0_4px_16px_rgba(26,110,101,0.35)]',
  green: 'bg-eco-green hover:bg-eco-green-light shadow-[0_4px_16px_rgba(11,35,80,0.30)]',
  blue:  'bg-[#1E4080] hover:bg-[#2A5BAD] shadow-[0_4px_16px_rgba(30,64,128,0.35)]',
}

const INTERVAL = 6000

export default function PageHeroCarousel({ slides }: { slides: PageSlide[] }) {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused]   = useState(false)

  const next = useCallback(() => setCurrent(c => (c + 1) % slides.length), [slides.length])
  const prev = useCallback(() => setCurrent(c => (c - 1 + slides.length) % slides.length), [slides.length])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, INTERVAL)
    return () => clearInterval(t)
  }, [paused, next])

  const slide = slides[current]

  return (
    <section
      className="relative min-h-[380px] sm:min-h-[460px] flex items-center justify-center overflow-hidden bg-eco-green-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background images */}
      {slides.map((s, i) => (
        <div
          key={s.badge}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={s.imagen}
            alt={s.badge}
            fill
            priority={i === 0}
            className="object-cover"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-eco-green-dark/60" />
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-eco-bg to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-20 pb-16">
        <div key={slide.badge} className="animate-fade-up">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            {slide.badge}
          </div>
          <h1
            className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white uppercase leading-[0.95] mb-4"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {slide.titulo}
          </h1>
          <p className="text-sm sm:text-base text-white/65 mb-8 max-w-2xl mx-auto leading-relaxed">
            {slide.subtitulo}
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {slide.btns.map((btn, i) =>
              btn.external ? (
                <a
                  key={i}
                  href={btn.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 ${
                    btn.primary
                      ? `text-white ${ACENTO[slide.acento ?? 'teal']}`
                      : 'bg-white/10 border border-white/25 hover:bg-white/18 hover:border-white/40 text-white backdrop-blur-sm'
                  }`}
                >
                  {btn.icon && ICON_MAP[btn.icon]}
                  {btn.label}
                </a>
              ) : (
                <Link
                  key={i}
                  href={btn.href}
                  className={`flex items-center justify-center gap-2 font-bold text-sm px-7 py-3.5 rounded-xl transition-all duration-200 ${
                    btn.primary
                      ? `text-white ${ACENTO[slide.acento ?? 'teal']}`
                      : 'bg-white/10 border border-white/25 hover:bg-white/18 hover:border-white/40 text-white backdrop-blur-sm'
                  }`}
                >
                  {btn.icon && ICON_MAP[btn.icon]}
                  {btn.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>

      {/* Nav arrows */}
      {slides.length > 1 && (
        <>
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-all"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-4 h-4" />
          </button>

          {/* Dots */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
            {slides.map((s, i) => (
              <button
                key={s.badge}
                onClick={() => { setCurrent(i); setPaused(true) }}
                className={`rounded-full transition-all duration-300 ${
                  i === current ? 'w-7 h-2 bg-white' : 'w-2 h-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </section>
  )
}
