import Link from 'next/link'
import { Leaf, MapPin, Phone, Mail, Clock, Share2, MessageCircle } from 'lucide-react'

const links = [
  { href: '/modulos',     label: 'Módulos' },
  { href: '/piscinas',    label: 'Piscinas' },
  { href: '/combo',       label: 'Combo Módulo + Piscina' },
  { href: '/financiacion',label: 'Financiación' },
  { href: '/obras',       label: 'Galería de Obras' },
  { href: '/nosotros',    label: 'Nosotros' },
  { href: '/blog',        label: 'Blog' },
  { href: '/contacto',    label: 'Contacto' },
]

export default function Footer() {
  return (
    <footer className="bg-eco-green-dark">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 mb-5 group">
              <div className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center group-hover:bg-white/15 transition-colors">
                <Leaf className="w-4 h-4 text-eco-green-light" />
              </div>
              <span
                className="text-lg font-bold uppercase tracking-wide text-white"
                style={{ fontFamily: 'var(--font-display)' }}
              >
                EcoFiver
              </span>
            </Link>
            <p className="text-white/55 text-sm leading-relaxed mb-6">
              Cooperativa de Trabajo Eco Zárate Ltda. · Más de 15 años fabricando viviendas modulares y piscinas de fibra de vidrio. Financiación directa, sin banco.
            </p>
            <div className="flex gap-2">
              <a
                href="https://instagram.com/ecomodulosypiscinas"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-xs font-medium border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg"
              >
                <Share2 className="w-3.5 h-3.5" />
                Instagram
              </a>
              <a
                href="https://wa.me/5491126036495"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 text-white/50 hover:text-white transition-colors text-xs font-medium border border-white/10 hover:border-white/30 px-3 py-1.5 rounded-lg"
              >
                <MessageCircle className="w-3.5 h-3.5" />
                WhatsApp
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3
              className="text-white/40 font-semibold uppercase text-xs tracking-widest mb-5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Productos y servicios
            </h3>
            <ul className="space-y-2.5">
              {links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-white/60 hover:text-white text-sm transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3
              className="text-white/40 font-semibold uppercase text-xs tracking-widest mb-5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Contacto
            </h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-eco-green-light mt-0.5 flex-shrink-0" />
                <a
                  href="https://wa.me/5491126036495"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  +54 9 11 6873-3406
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-eco-green-light mt-0.5 flex-shrink-0" />
                <a
                  href="mailto:info@ecomodulosypiscinas.com.ar"
                  className="text-white/60 hover:text-white text-sm transition-colors"
                >
                  info@ecomodulosypiscinas.com.ar
                </a>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-eco-green-light mt-0.5 flex-shrink-0" />
                <span className="text-white/60 text-sm">Lun–Vie 9–18 h · Sáb 9–13 h</span>
              </li>
            </ul>
          </div>

          {/* Ubicaciones */}
          <div>
            <h3
              className="text-white/40 font-semibold uppercase text-xs tracking-widest mb-5"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              Ubicaciones
            </h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-eco-green-light mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/80 font-medium text-sm">Planta de fabricación</p>
                  <p className="text-white/50 text-sm">Zárate, Buenos Aires</p>
                </div>
              </li>
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-eco-teal-light mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-white/80 font-medium text-sm">Showroom CABA</p>
                  <a
                    href="https://maps.google.com/?q=Av+Paseo+Colón+1013+Buenos+Aires"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-white/50 hover:text-white text-sm transition-colors"
                  >
                    Av. Paseo Colón 1013, CABA
                  </a>
                </div>
              </li>
            </ul>

            {/* INAES badge */}
            <div className="mt-6 inline-flex items-center gap-2 bg-white/5 border border-white/10 rounded-lg px-3 py-2">
              <div className="w-1.5 h-1.5 rounded-full bg-eco-green-light flex-shrink-0" />
              <span className="text-white/40 text-xs font-medium tracking-wide">
                Cooperativa INAES · CUIT 30-71807393-2
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-white/30 text-xs">
            © {new Date().getFullYear()} Cooperativa de Trabajo Eco Zárate Limitada. Todos los derechos reservados.
          </p>
          <p className="text-white/30 text-xs">
            Planta propia 7.000 m² · Zárate, Buenos Aires
          </p>
        </div>
      </div>
    </footer>
  )
}
