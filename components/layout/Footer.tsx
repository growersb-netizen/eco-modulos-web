import Link from 'next/link'
import { Leaf, MapPin, Phone, Mail, Clock } from 'lucide-react'

const links = [
  { href: '/modulos', label: 'Módulos' },
  { href: '/piscinas', label: 'Piscinas' },
  { href: '/combo', label: 'Combo Módulo + Piscina' },
  { href: '/financiacion', label: 'Financiación' },
  { href: '/obras', label: 'Galería de Obras' },
  { href: '/nosotros', label: 'Nosotros' },
  { href: '/blog', label: 'Blog' },
  { href: '/contacto', label: 'Contacto' },
]

export default function Footer() {
  return (
    <footer className="bg-[#0d0d0d] border-t border-eco-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="flex items-center gap-2 text-eco-green mb-4">
              <Leaf className="w-6 h-6" />
              <span className="text-xl font-bold uppercase tracking-wide" style={{ fontFamily: 'var(--font-display)' }}>
                Eco Módulos & Piscinas
              </span>
            </Link>
            <p className="text-eco-text-muted text-sm leading-relaxed mb-4">
              Cooperativa INAES con más de 15 años fabricando viviendas modulares y piscinas de fibra de vidrio. Financiación directa, sin banco.
            </p>
            <div className="flex gap-3">
              <a href="https://instagram.com/ecomodulosypiscinas" target="_blank" rel="noopener noreferrer"
                className="text-eco-text-muted hover:text-eco-green transition-colors text-xs font-medium border border-eco-border hover:border-eco-green px-2 py-1 rounded-lg">
                Instagram
              </a>
              <a href="https://wa.me/5491168733406" target="_blank" rel="noopener noreferrer"
                className="text-eco-text-muted hover:text-eco-green transition-colors text-xs font-medium border border-eco-border hover:border-eco-green px-2 py-1 rounded-lg">
                WhatsApp
              </a>
            </div>
          </div>

          {/* Links */}
          <div>
            <h3 className="text-eco-text font-semibold mb-4 uppercase text-sm tracking-wider">Productos</h3>
            <ul className="space-y-2">
              {links.map((link) => (
                <li key={link.href}>
                  <Link href={link.href} className="text-eco-text-muted hover:text-eco-green text-sm transition-colors">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-eco-text font-semibold mb-4 uppercase text-sm tracking-wider">Contacto</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-eco-text-muted text-sm">
                <Phone className="w-4 h-4 text-eco-green mt-0.5 flex-shrink-0" />
                <a href="https://wa.me/5491168733406" target="_blank" rel="noopener noreferrer"
                  className="hover:text-eco-green transition-colors">
                  +54 9 11 4449-8854
                </a>
              </li>
              <li className="flex items-start gap-2 text-eco-text-muted text-sm">
                <Mail className="w-4 h-4 text-eco-green mt-0.5 flex-shrink-0" />
                <a href="mailto:info@ecomodulosypiscinas.com.ar"
                  className="hover:text-eco-green transition-colors">
                  info@ecomodulosypiscinas.com.ar
                </a>
              </li>
              <li className="flex items-start gap-2 text-eco-text-muted text-sm">
                <Clock className="w-4 h-4 text-eco-green mt-0.5 flex-shrink-0" />
                <span>Lun–Vie 9–18hs · Sáb 9–13hs</span>
              </li>
            </ul>
          </div>

          {/* Direcciones */}
          <div>
            <h3 className="text-eco-text font-semibold mb-4 uppercase text-sm tracking-wider">Ubicaciones</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-2 text-eco-text-muted text-sm">
                <MapPin className="w-4 h-4 text-eco-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-eco-text font-medium">Planta de fabricación</p>
                  <p>Zárate, Provincia de Buenos Aires</p>
                </div>
              </li>
              <li className="flex items-start gap-2 text-eco-text-muted text-sm">
                <MapPin className="w-4 h-4 text-eco-teal mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-eco-text font-medium">Showroom CABA</p>
                  <a
                    href="https://maps.google.com/?q=Av+Paseo+Colón+1013+Buenos+Aires"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-eco-green transition-colors"
                  >
                    Av. Paseo Colón 1013, CABA
                  </a>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="border-t border-eco-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-eco-text-muted text-xs">
            © {new Date().getFullYear()} Eco Módulos & Piscinas. Todos los derechos reservados.
          </p>
          <p className="text-eco-text-muted text-xs">
            Cooperativa INAES · Planta propia 7.000 m² · Zárate, Buenos Aires
          </p>
        </div>
      </div>
    </footer>
  )
}
