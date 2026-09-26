'use client'

import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, ShoppingCart, ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react'

interface Slide {
  id: string
  badge: string
  titulo: string
  subtitulo: string
  imagen: string
  cta1: { label: string; href: string; icon?: React.ReactNode }
  cta2: { label: string; href: string; icon?: React.ReactNode }
  acento: 'teal' | 'green' | 'blue'
}

const WA = 'https://wa.me/5491126036495?text='

const SLIDES: Slide[] = [
  {
    id: 'piscinas',
    badge: '🏊 TIENDA VIRTUAL · PISCINAS',
    titulo: 'COMPRÁ TU PISCINA Y PAGALA EL DÍA DE LA INSTALACIÓN',
    subtitulo: 'Sin anticipos. Sin bancos. Instalamos y cobramos el día de la instalación, en el domicilio. Garantía 10 años.',
    imagen: '/hero-piscinas.jpg',
    cta1: { label: 'Ver modelos disponibles', href: '/piscinas', icon: <ShoppingCart className="w-5 h-5" /> },
    cta2: { label: 'Consultar por WhatsApp', href: WA + encodeURIComponent('Hola, quiero reservar una piscina con pago el día de la instalación'), icon: <MessageCircle className="w-5 h-5" /> },
    acento: 'green',
  },
  {
    id: 'modulos',
    badge: '🏠 TIENDA VIRTUAL · MÓDULOS',
    titulo: 'COMPRÁ TU MÓDULO Y PAGALO EL DÍA DE LA INSTALACIÓN',
    subtitulo: 'Sin anticipos. Sin bancos. El equipo llega, instala y cobra el día de la instalación, en el domicilio. Efectivo o transferencia.',
    imagen: '/hero-modulos.jpg',
    cta1: { label: 'Ver modelos disponibles', href: '/modulos', icon: <ShoppingCart className="w-5 h-5" /> },
    cta2: { label: 'Consultar por WhatsApp', href: WA + encodeURIComponent('Hola, quiero reservar un módulo con pago el día de la instalación'), icon: <MessageCircle className="w-5 h-5" /> },
    acento: 'teal',
  },
  {
    id: 'financiacion',
    badge: '💳 FINANCIACIÓN PROPIA',
    titulo: 'MÓDULOS Y PISCINAS EN HASTA 120 CUOTAS',
    subtitulo: 'Sin banco ni garante. Cuota fija en pesos para piscinas. Módulos ajustados por ICC. Aprobación en el día.',
    imagen: '/hero-financiacion.jpg',
    cta1: { label: 'Simular cuota', href: '/financiacion', icon: <ArrowRight className="w-5 h-5" /> },
    cta2: { label: 'Consultar por WhatsApp', href: WA + encodeURIComponent('Hola, quiero consultar sobre financiación de módulos o piscinas'), icon: <MessageCircle className="w-5 h-5" /> },
    acento: 'blue',
  },
]

const ACENTO_CLS: Record<string, string> = {
  teal:  'bg-eco-teal hover:bg-eco-teal-light shadow-[0_4px_20px_rgba(26,110,101,0.4)]',
  green: 'bg-eco-green hover:bg-eco-green-light shadow-[0_4px_20px_rgba(11,35,80,0.4)]',
  blue:  'bg-[#1E4080] hover:bg-[#2A5BAD] shadow-[0_4px_20px_rgba(30,64,128,0.4)]',
}

const INTERVAL = 6000

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused]   = useState(false)

  const next = useCallback(() => setCurrent(c => (c + 1) % SLIDES.length), [])
  const prev = useCallback(() => setCurrent(c => (c - 1 + SLIDES.length) % SLIDES.length), [])

  useEffect(() => {
    if (paused) return
    const t = setInterval(next, INTERVAL)
    return () => clearInterval(t)
  }, [paused, next])

  const slide = SLIDES[current]

  return (
    <section
      className="relative min-h-[520px] sm:min-h-[600px] lg:min-h-screen flex items-center justify-center overflow-hidden bg-eco-green-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Background images — all loaded, opacity transition */}
      {SLIDES.map((s, i) => (
        <div
          key={s.id}
          className="absolute inset-0 transition-opacity duration-700"
          style={{ opacity: i === current ? 1 : 0 }}
        >
          <Image
            src={s.imagen}
            alt={s.badge}
            fill
            priority={i === 0}
            className="object-contain"
            sizes="100vw"
          />
        </div>
      ))}

      {/* Overlay */}
      <div className="absolute inset-0 bg-eco-green-dark/65" />
      <div className="absolute inset-0 hero-grid-pattern opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(11,35,80,0.20),transparent)]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-eco-bg to-transparent" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 pt-28 pb-24">
        <div
          key={slide.id}
          className="animate-fade-up"
        >
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 text-white/80 text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-full mb-7">
            {slide.badge}
          </div>

          {/* Headline */}
          <h1
            className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white uppercase leading-[0.93] mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {slide.titulo}
          </h1>

          <p className="text-base sm:text-lg text-white/65 mb-10 max-w-2xl mx-auto leading-relaxed">
            {slide.subtitulo}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href={slide.cta1.href}
              className={`flex items-center justify-center gap-2 text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 ${ACENTO_CLS[slide.acento]}`}
            >
              {slide.cta1.icon}{slide.cta1.label}
            </Link>
            <a
              href={slide.cta2.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white/8 border border-white/25 hover:bg-white/15 hover:border-white/40 text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              {slide.cta2.icon}{slide.cta2.label}
            </a>
          </div>
        </div>
      </div>

      {/* Nav arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-all"
        aria-label="Anterior"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/10 border border-white/20 hover:bg-white/20 text-white flex items-center justify-center transition-all"
        aria-label="Siguiente"
      >
        <ChevronRight className="w-5 h-5" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {SLIDES.map((s, i) => (
          <button
            key={s.id}
            onClick={() => { setCurrent(i); setPaused(true) }}
            className={`rounded-full transition-all duration-300 ${
              i === current
                ? 'w-8 h-2 bg-white'
                : 'w-2 h-2 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5">
          <div className="w-0.5 h-2 bg-white/40 rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  )
}
