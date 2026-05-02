'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Leaf, Menu, X, MessageCircle } from 'lucide-react'
import { buildWhatsAppLink } from '@/lib/whatsapp'
import { cn } from '@/lib/utils'

const links = [
  { href: '/modulos', label: 'Módulos' },
  { href: '/piscinas', label: 'Piscinas' },
  { href: '/combo', label: 'Combo 25% OFF' },
  { href: '/financiacion', label: 'Financiación' },
  { href: '/obras', label: 'Obras' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setOpen(false), [pathname])

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'bg-eco-bg/95 backdrop-blur-md border-b border-eco-border shadow-lg' : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-eco-green hover:text-eco-green-light transition-colors">
            <Leaf className="w-6 h-6" />
            <span className="text-xl font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
              Eco Módulos
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors hover:text-eco-green',
                  pathname === link.href ? 'text-eco-green' : 'text-eco-text-muted',
                  link.href === '/combo' && 'text-eco-teal font-semibold'
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <a
            href={buildWhatsAppLink('stefania', 'Hola, me interesa consultar por módulos y piscinas')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:flex items-center gap-2 bg-eco-green hover:bg-eco-green-light text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            WhatsApp
          </a>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden text-eco-text hover:text-eco-green transition-colors"
            aria-label="Abrir menú"
          >
            {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="lg:hidden bg-eco-bg/98 backdrop-blur-md border-b border-eco-border"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    'py-3 px-4 rounded-lg text-sm font-medium transition-colors',
                    pathname === link.href
                      ? 'bg-eco-green/10 text-eco-green'
                      : 'text-eco-text hover:bg-eco-bg-surface hover:text-eco-green',
                    link.href === '/combo' && 'text-eco-teal'
                  )}
                >
                  {link.label}
                </Link>
              ))}
              <a
                href={buildWhatsAppLink('stefania', 'Hola, me interesa consultar')}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-eco-green text-white font-semibold py-3 px-4 rounded-lg mt-2 transition-colors"
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
