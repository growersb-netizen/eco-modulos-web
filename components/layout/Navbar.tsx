'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, Menu, X, MessageCircle } from 'lucide-react'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

const links = [
  { href: '/modulos',     label: 'Módulos' },
  { href: '/piscinas',    label: 'Piscinas' },
  { href: '/combo',       label: 'Combo' },
  { href: '/financiacion',label: 'Financiación' },
  { href: '/obras',       label: 'Obras' },
  { href: '/nosotros',    label: 'Nosotros' },
  { href: '/contacto',    label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen]       = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  /* Hero pages start dark — navbar fades in from transparent */
  const isHeroPage = pathname === '/'

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'bg-white/95 backdrop-blur-md border-b border-eco-border shadow-[0_1px_24px_rgba(0,0,0,0.06)]'
          : isHeroPage
            ? 'bg-transparent'
            : 'bg-eco-bg/90 backdrop-blur-sm border-b border-eco-border/60'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">

          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 transition-colors group"
          >
            <div className={cn(
              'w-8 h-8 rounded-lg flex items-center justify-center transition-colors',
              scrolled || !isHeroPage ? 'bg-eco-green/10' : 'bg-white/15'
            )}>
              <Leaf className={cn(
                'w-4 h-4 transition-colors',
                scrolled || !isHeroPage ? 'text-eco-green' : 'text-white'
              )} />
            </div>
            <span
              className={cn(
                'text-lg font-bold uppercase tracking-wide transition-colors',
                scrolled || !isHeroPage ? 'text-eco-text' : 'text-white'
              )}
              style={{ fontFamily: 'var(--font-display)' }}
            >
              EcoFiver
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'px-3 py-1.5 rounded-lg text-sm font-medium transition-all duration-200',
                  pathname === link.href
                    ? 'text-eco-green bg-eco-green/8'
                    : scrolled || !isHeroPage
                      ? 'text-eco-text-muted hover:text-eco-text hover:bg-eco-bg-surface'
                      : 'text-white/80 hover:text-white hover:bg-white/10',
                  link.href === '/combo' && (
                    scrolled || !isHeroPage
                      ? 'text-eco-teal font-semibold'
                      : 'text-white font-semibold'
                  )
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA */}
          <a
            href={buildWhatsAppLink('stefania', 'Hola, me interesa consultar por módulos y piscinas')}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'hidden lg:flex items-center gap-2 text-sm font-semibold px-4 py-2 rounded-lg transition-all duration-200',
              scrolled || !isHeroPage
                ? 'bg-eco-green text-white hover:bg-eco-green-light shadow-[0_2px_8px_rgba(11,35,80,0.25)] hover:shadow-[0_4px_16px_rgba(11,35,80,0.35)]'
                : 'bg-white/15 text-white border border-white/25 hover:bg-white/25 backdrop-blur-sm'
            )}
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className={cn(
              'lg:hidden p-1.5 rounded-lg transition-colors',
              scrolled || !isHeroPage
                ? 'text-eco-text hover:bg-eco-bg-surface'
                : 'text-white hover:bg-white/15'
            )}
            aria-label="Abrir menú"
          >
            {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18, ease: 'easeOut' }}
            className="lg:hidden bg-white border-b border-eco-border shadow-lg"
          >
            <nav className="max-w-7xl mx-auto px-4 py-3 flex flex-col gap-0.5">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'py-2.5 px-4 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-eco-green/8 text-eco-green'
                      : 'text-eco-text hover:bg-eco-bg-surface',
                    link.href === '/combo' && 'text-eco-teal font-semibold'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={buildWhatsAppLink('stefania', 'Hola, me interesa consultar')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-eco-green text-white font-semibold py-3 px-4 rounded-lg mt-2 transition-colors shadow-[0_2px_8px_rgba(11,35,80,0.25)]"
              >
                <MessageCircle className="w-4 h-4" />
                Contactar por WhatsApp
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
