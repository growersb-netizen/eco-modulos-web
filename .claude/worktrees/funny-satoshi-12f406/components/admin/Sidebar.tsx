'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut, useSession } from 'next-auth/react'
import {
  Leaf, LayoutDashboard, Box, Waves, DollarSign, Image,
  Users, FileText, Star, Settings, UserCog, LogOut, Menu, X,
} from 'lucide-react'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin/dashboard',          label: 'Dashboard',     icon: LayoutDashboard },
  { href: '/admin/productos/modulos',  label: 'Módulos',       icon: Box },
  { href: '/admin/productos/piscinas', label: 'Piscinas',      icon: Waves },
  { href: '/admin/financiacion',       label: 'Financiación',  icon: DollarSign },
  { href: '/admin/obras',              label: 'Obras',         icon: Image },
  { href: '/admin/leads',              label: 'Leads',         icon: Users, badge: true },
  { href: '/admin/blog',               label: 'Blog',          icon: FileText },
  { href: '/admin/testimonios',        label: 'Testimonios',   icon: Star },
  { href: '/admin/config',             label: 'Configuración', icon: Settings },
]

export default function AdminSidebar() {
  const pathname = usePathname()
  const { data: session } = useSession()
  const [open, setOpen] = useState(false)
  const [leadsNuevos, setLeadsNuevos] = useState(0)

  useEffect(() => {
    fetch('/api/admin/leads?estado=nuevo&limit=1')
      .then((r) => r.json())
      .then((d) => setLeadsNuevos(d.total || 0))
      .catch(() => {})
  }, [])

  const sidebarLinks = links.filter((l) => {
    if (l.href === '/admin/usuarios') return session?.user.rol === 'admin'
    return true
  })

  const isAdmin = session?.user.rol === 'admin'

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="flex items-center gap-2 px-4 py-5 border-b border-[#2a2a2a]">
        <Leaf className="w-5 h-5 text-eco-green" />
        <span className="text-sm font-bold text-eco-text uppercase tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
          Eco Módulos Admin
        </span>
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 space-y-0.5 px-2 overflow-y-auto">
        {sidebarLinks.map((link) => {
          const Icon = link.icon
          const active = pathname.startsWith(link.href)
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
                active
                  ? 'bg-eco-green/10 text-eco-green font-medium'
                  : 'text-eco-text-muted hover:bg-[#1a1a1a] hover:text-eco-text'
              )}
            >
              <Icon className="w-4 h-4 flex-shrink-0" />
              <span className="flex-1">{link.label}</span>
              {link.badge && leadsNuevos > 0 && (
                <span className="bg-eco-green text-white text-xs font-bold px-1.5 py-0.5 rounded-full">
                  {leadsNuevos > 99 ? '99+' : leadsNuevos}
                </span>
              )}
            </Link>
          )
        })}
        {isAdmin && (
          <Link
            href="/admin/usuarios"
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors',
              pathname.startsWith('/admin/usuarios')
                ? 'bg-eco-green/10 text-eco-green font-medium'
                : 'text-eco-text-muted hover:bg-[#1a1a1a] hover:text-eco-text'
            )}
          >
            <UserCog className="w-4 h-4" />
            Usuarios
          </Link>
        )}
      </nav>

      {/* Footer usuario */}
      <div className="border-t border-[#2a2a2a] p-3">
        <div className="flex items-center gap-2 px-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-eco-green/20 flex items-center justify-center text-eco-green text-xs font-bold">
            {session?.user.nombre?.charAt(0) || 'A'}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-eco-text text-xs font-medium truncate">{session?.user.nombre}</p>
            <p className="text-eco-text-muted text-xs capitalize">{session?.user.rol}</p>
          </div>
        </div>
        <button
          onClick={() => signOut({ callbackUrl: '/admin/login' })}
          className="flex items-center gap-2 w-full px-3 py-2 text-eco-text-muted hover:text-red-400 hover:bg-red-900/10 rounded-lg text-xs transition-colors"
        >
          <LogOut className="w-3.5 h-3.5" />
          Cerrar sesión
        </button>
      </div>
    </div>
  )

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed left-0 top-0 bottom-0 w-60 bg-[#111111] border-r border-[#2a2a2a] z-40">
        <SidebarContent />
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#111111] border-b border-[#2a2a2a] flex items-center justify-between px-4 py-3">
        <div className="flex items-center gap-2 text-eco-green">
          <Leaf className="w-5 h-5" />
          <span className="text-sm font-bold uppercase" style={{ fontFamily: 'var(--font-display)' }}>Admin</span>
        </div>
        <button onClick={() => setOpen(!open)} className="text-eco-text-muted hover:text-eco-text">
          {open ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-40 flex">
          <div className="w-60 bg-[#111111] border-r border-[#2a2a2a] flex flex-col pt-14">
            <SidebarContent />
          </div>
          <div className="flex-1 bg-black/60" onClick={() => setOpen(false)} />
        </div>
      )}

      {/* Mobile top padding */}
      <div className="lg:hidden h-14 flex-shrink-0" />
    </>
  )
}
