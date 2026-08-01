import SectionTitle from '@/components/shared/SectionTitle'
import VideoCallButton from '@/components/shared/VideoCallButton'
import { MessageCircle, Award, Users, MapPin, Factory, Shield, Building2 } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quiénes Somos | Cooperativa de Trabajo Eco Zárate Ltda. | EcoFiver',
  description: 'Cooperativa de Trabajo Eco Zárate Limitada · CUIT 30-71807393-2 · Inscripta ante INAES. +15 años fabricando módulos Wood Frame y piscinas de fibra. Planta en Zárate, Buenos Aires.',
  keywords: [
    'cooperativa de trabajo eco zarate limitada',
    'cooperativa eco zarate INAES',
    'eco modulos y piscinas quienes somos',
    'fabricante módulos habitacionales Zárate Buenos Aires',
    'empresa piscinas fibra vidrio argentina',
    'CUIT 30718073932',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/nosotros' },
  openGraph: {
    title: 'Cooperativa de Trabajo Eco Zárate Ltda. | EcoFiver',
    description: 'Cooperativa de Trabajo Eco Zárate Limitada · CUIT 30-71807393-2 · Inscripta ante INAES. Fabricación modular Wood Frame y piscinas de fibra.',
    url: 'https://ecomodulosypiscinas.com.ar/nosotros',
  },
}

const HITOS = [
  { año: '2008', hecho: 'Fundación de la Cooperativa de Trabajo Eco Zárate Limitada en Zárate, Buenos Aires. Inscripción ante INAES · CUIT 30-71807393-2.' },
  { año: '2012', hecho: 'Lanzamiento de la primera línea de módulos habitacionales con sistema constructivo Wood Frame.' },
  { año: '2015', hecho: 'Incorporación de piscinas de fibra de vidrio al catálogo. Expansión logística a todo el país.' },
  { año: '2018', hecho: 'Expansión de planta a 7.000 m² en Zárate.' },
  { año: '2021', hecho: 'Lanzamiento del Combo Módulo + Piscina con financiación propia. Primeros contratos corporativos de obradores y campamentos.' },
  { año: '2024', hecho: 'Más de 2.000 proyectos instalados en Argentina. Presencia activa en 23 provincias.' },
]

const AREAS = [
  {
    icono: '🏗️',
    titulo: 'Área de Soluciones Constructivas',
    desc: 'Módulos Wood Frame, obradores, campamentos, unidades habitacionales y piscinas de fibra. Proyectos para empresas, municipios y particulares.',
    wa: 'https://wa.me/5491126036495?text=' + encodeURIComponent('Hola, necesito información sobre módulos y soluciones constructivas.'),
  },
  {
    icono: '📋',
    titulo: 'Área Comercial y Proyectos',
    desc: 'Cotizaciones corporativas, proyectos integrales, combos y licitaciones con organismos públicos o privados.',
    wa: 'https://wa.me/5491126036495?text=' + encodeURIComponent('Hola, quisiera consultar sobre proyectos y cotizaciones corporativas.'),
  },
]

export default function NosotrosPage() {
  return (
    <>
      {/* Hero — premium light */}
      <section className="pt-28 pb-16 bg-eco-bg border-b border-eco-border">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="badge-green mb-5 inline-flex">
            Cooperativa de Trabajo Eco Zárate Ltda. · INAES · Zárate, Buenos Aires
          </span>
          <h1
            className="text-5xl sm:text-7xl font-extrabold text-eco-text uppercase leading-[0.92] mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Más de 15 años<br />
            <span className="text-eco-green">de trayectoria cooperativa</span>
          </h1>
          <p className="text-eco-text-muted text-lg max-w-2xl mx-auto leading-relaxed">
            Fabricación modular y piscinas de fibra. Una cooperativa con escala industrial y presencia en todo el país.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-eco-bg-card border-y border-eco-border py-10">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { valor: '+15', label: 'Años de trayectoria ininterrumpida' },
              { valor: '+2.000', label: 'Proyectos constructivos instalados' },
              { valor: '7.000 m²', label: 'Planta propia de fabricación en Zárate' },
              { valor: '23', label: 'Provincias con logística propia' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl font-extrabold text-eco-green mb-1" style={{ fontFamily: 'var(--font-display)' }}>{s.valor}</p>
                <p className="text-eco-text-muted text-sm">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Historia */}
      <section className="py-16 max-w-4xl mx-auto px-4">
        <SectionTitle titulo="Nuestra historia" centrado={false} />
        <p className="mt-6 text-eco-text-muted leading-relaxed">
          EcoFiver nació en 2008 como una cooperativa de trabajo en Zárate, provincia de Buenos Aires, dedicada a la fabricación de soluciones modulares para infraestructura y vivienda, y de piscinas de fibra de vidrio.
        </p>
        <p className="mt-4 text-eco-text-muted leading-relaxed">
          Fabricamos módulos constructivos con sistema Wood Frame (estructura de madera, revestimiento exterior en placas cementicias, terminación interior en Durlock) — obradores, campamentos, unidades habitacionales, oficinas de campo — y piscinas de fibra de vidrio. Todo en planta propia en Zárate, con logística directa a todo el país y financiación sin banco.
        </p>
        <p className="mt-4 text-eco-text-muted leading-relaxed">
          Ser cooperativa no es solo una forma jurídica: es una forma de operar. Sin accionistas externos. Sin extracción de utilidades. Cada peso que genera la cooperativa vuelve al equipo, a la planta y al alcance del servicio.
        </p>

        {/* Timeline */}
        <div className="mt-12 space-y-6">
          {HITOS.map((h) => (
            <div key={h.año} className="flex gap-4">
              <span className="text-2xl font-extrabold text-eco-green/40 flex-shrink-0 w-16 text-right" style={{ fontFamily: 'var(--font-display)' }}>{h.año}</span>
              <div className="flex-1 border-l border-eco-border pl-4 pb-6">
                <p className="text-eco-text text-sm">{h.hecho}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Datos legales */}
      <section className="py-16 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-5xl mx-auto px-4">
          <SectionTitle titulo="Cooperativa de Trabajo Eco Zárate Ltda." subtitulo="Datos legales y por qué importa la figura cooperativa" />
          <div className="mb-8 mt-4 flex flex-wrap justify-center gap-4 text-xs text-eco-text-muted">
            <span className="flex items-center gap-1.5 bg-eco-bg-surface border border-eco-border rounded-lg px-3 py-1.5"><Shield className="w-3.5 h-3.5 text-eco-green" /> Razón social: Cooperativa de Trabajo Eco Zárate Limitada</span>
            <span className="flex items-center gap-1.5 bg-eco-bg-surface border border-eco-border rounded-lg px-3 py-1.5"><Shield className="w-3.5 h-3.5 text-eco-green" /> CUIT: 30-71807393-2</span>
            <span className="flex items-center gap-1.5 bg-eco-bg-surface border border-eco-border rounded-lg px-3 py-1.5"><Shield className="w-3.5 h-3.5 text-eco-green" /> Inscripta ante INAES</span>
            <span className="flex items-center gap-1.5 bg-eco-bg-surface border border-eco-border rounded-lg px-3 py-1.5"><MapPin className="w-3.5 h-3.5 text-eco-green" /> Zárate, Buenos Aires</span>
          </div>
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, titulo: 'Solidez legal y transparencia', desc: 'Inscripta ante el Instituto Nacional de Asociativismo y Economía Social (INAES). Marco legal sólido, balances públicos y estructura auditada. Emitimos factura A o B.' },
              { icon: Users, titulo: 'Propiedad colectiva', desc: 'Los trabajadores son los propietarios. No hay accionistas externos ni extracción de utilidades. Cada peso generado se reinvierte en operaciones, planta y calidad de servicio.' },
              { icon: Award, titulo: 'Respaldo y seriedad', desc: 'Más de 15 años de operación continua, +2.000 proyectos instalados y contratos con empresas, municipios y organismos del Estado. Documentación técnica disponible para licitaciones.' },
            ].map(({ icon: Icon, titulo, desc }) => (
              <div key={titulo} className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-eco-green/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-eco-green" />
                </div>
                <h3 className="font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>{titulo}</h3>
                <p className="text-eco-text-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Planta */}
      <section className="py-16 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle titulo="Nuestra planta en Zárate" centrado={false} />
          <div className="mt-6 bg-eco-bg-surface border border-eco-border rounded-2xl p-6 flex flex-col sm:flex-row gap-6">
            <div className="flex-1 space-y-4">
              <div className="flex items-start gap-3">
                <Factory className="w-5 h-5 text-eco-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-eco-text font-semibold">7.000 m² de planta cubierta</p>
                  <p className="text-eco-text-muted text-sm">Fabricación de módulos Wood Frame y producción de piscinas de fibra — todo bajo el mismo techo. Control de calidad en cada etapa.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-eco-teal mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-eco-text font-semibold">Zárate, Buenos Aires</p>
                  <p className="text-eco-text-muted text-sm">Ubicación estratégica con acceso al Puerto de Zárate y rutas nacionales. Logística propia hacia las 23 provincias del país.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Building2 className="w-5 h-5 text-eco-green mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-eco-text font-semibold">Dos áreas operativas integradas</p>
                  <p className="text-eco-text-muted text-sm">Construcción modular · Piscinas de fibra. Una sola estructura cooperativa que cubre ambos rubros a escala industrial.</p>
                </div>
              </div>
            </div>
            {/* Placeholder planta */}
            <div className="sm:w-64 h-44 bg-gradient-to-br from-eco-green/10 to-eco-bg-surface rounded-xl overflow-hidden relative flex-shrink-0 border border-eco-border">
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                <svg viewBox="0 0 120 80" className="w-28 h-20 opacity-30" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="5" y="25" width="50" height="50" rx="1" stroke="#2d9e4f" strokeWidth="1.5" fill="#2d9e4f" fillOpacity="0.07"/>
                  <rect x="55" y="15" width="60" height="60" rx="1" stroke="#2d9e4f" strokeWidth="1.5" fill="#2d9e4f" fillOpacity="0.07"/>
                  <rect x="65" y="50" width="15" height="25" stroke="#00b8a9" strokeWidth="1" fill="#00b8a9" fillOpacity="0.1"/>
                  <rect x="85" y="50" width="15" height="25" stroke="#00b8a9" strokeWidth="1" fill="#00b8a9" fillOpacity="0.1"/>
                  <rect x="10" y="40" width="35" height="20" stroke="#00b8a9" strokeWidth="1" fill="#00b8a9" fillOpacity="0.1"/>
                  <line x1="5" y1="75" x2="115" y2="75" stroke="#2d9e4f" strokeWidth="1.5" opacity="0.5"/>
                  <rect x="0" y="20" width="120" height="5" rx="2" fill="#2d9e4f" fillOpacity="0.15"/>
                </svg>
                <p className="text-eco-green text-[10px] font-semibold uppercase tracking-widest opacity-50">Planta Zárate · 7.000 m²</p>
              </div>
              <div className="absolute bottom-2 right-2">
                <a
                  href="https://maps.google.com/?q=Zárate+Buenos+Aires+Argentina"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-eco-green text-xs font-semibold hover:underline flex items-center gap-1 bg-eco-bg-card/80 px-2 py-1 rounded-lg"
                >
                  <MapPin className="w-3 h-3" />Ver en Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Áreas de contacto */}
      <section className="py-20 bg-eco-bg">
        <div className="max-w-5xl mx-auto px-4">
        <SectionTitle titulo="Áreas de atención" subtitulo="Cada consulta va al área correcta. Respuesta técnica directa, sin intermediarios." />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {AREAS.map((a) => (
            <div key={a.titulo} className="card-premium p-6 flex flex-col gap-4">
              <div className="w-14 h-14 rounded-2xl bg-eco-green/10 border border-eco-green/20 flex items-center justify-center text-3xl">
                {a.icono}
              </div>
              <div className="flex-1">
                <p className="font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>{a.titulo}</p>
                <p className="text-eco-text-muted text-sm mt-2">{a.desc}</p>
              </div>
              <a
                href={a.wa}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 bg-eco-green/10 hover:bg-eco-green text-eco-green hover:text-white text-sm font-semibold px-4 py-2.5 rounded-xl transition-colors"
              >
                <MessageCircle className="w-4 h-4" />Consultar por WhatsApp
              </a>
            </div>
          ))}
        </div>
        </div>
      </section>

      {/* CTA final */}
      <section className="py-24 bg-eco-green-dark relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-pattern opacity-60" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 uppercase" style={{ fontFamily: 'var(--font-display)' }}>
            ¿Quiere conocernos?
          </h2>
          <p className="text-white/60 mb-10 text-lg">
            Reserve una videollamada con nuestro equipo o visítenos en Zárate, de lunes a viernes de 9 a 17 h.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contacto"
              className="flex items-center justify-center gap-2 bg-white text-eco-green-dark font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              Ir a contacto
            </Link>
            <VideoCallButton variant="outline" label="Agendar videollamada" />
          </div>
        </div>
      </section>
    </>
  )
}
