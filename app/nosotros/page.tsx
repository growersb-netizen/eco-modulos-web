import SectionTitle from '@/components/shared/SectionTitle'
import VideoCallButton from '@/components/shared/VideoCallButton'
import { MessageCircle, Award, Users, MapPin, Factory, Shield } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quiénes Somos | Cooperativa INAES Eco Módulos & Piscinas',
  description: 'Cooperativa de trabajo registrada ante INAES. Más de 15 años fabricando módulos habitacionales NCE y piscinas de fibra de vidrio en Zárate, Buenos Aires. Fabricante directo, sin intermediarios.',
  keywords: [
    'cooperativa INAES viviendas modulares',
    'fabricante módulos habitacionales Zárate',
    'empresa piscinas fibra Buenos Aires',
    'eco módulos piscinas quiénes somos',
    'cooperativa construcción argentina',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/nosotros' },
  openGraph: {
    title: 'Quiénes Somos | Eco Módulos & Piscinas',
    description: 'Cooperativa INAES con +15 años fabricando viviendas modulares y piscinas de fibra de vidrio en Zárate, BA.',
    url: 'https://ecomodulosypiscinas.com.ar/nosotros',
  },
}

const HITOS = [
  { año: '2008', hecho: 'Fundación de la cooperativa en Zárate, provincia de Buenos Aires.' },
  { año: '2012', hecho: 'Lanzamiento de la primera línea de módulos habitacionales NCE.' },
  { año: '2015', hecho: 'Incorporación de piscinas de fibra de vidrio al catálogo.' },
  { año: '2018', hecho: 'Expansión de planta a 7.000 m². Inicio de ventas en todo el país.' },
  { año: '2021', hecho: 'Lanzamiento del Combo Módulo + Piscina con financiación propia.' },
  { año: '2024', hecho: 'Más de 2.000 proyectos instalados en Argentina.' },
]

const EQUIPO = [
  { nombre: 'Daniel', rol: 'Especialista en módulos', wa: 'https://wa.me/5491171825835?text=' + encodeURIComponent('Hola Daniel, quiero consultar por módulos habitacionales') },
  { nombre: 'Hernán', rol: 'Especialista en piscinas', wa: 'https://wa.me/5491125582328?text=' + encodeURIComponent('Hola Hernán, quiero consultar por piscinas de fibra de vidrio') },
  { nombre: 'Stefanía', rol: 'Atención al cliente', wa: 'https://wa.me/5491144498854?text=' + encodeURIComponent('Hola, quisiera consultar sobre Eco Módulos & Piscinas') },
]

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-eco-green-dark to-eco-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-eco-green/10 text-eco-green text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            Cooperativa INAES
          </span>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white uppercase mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Más de 15 años<br />construyendo sueños
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Somos una cooperativa de trabajo registrada en INAES. Fabricamos en planta propia, financiamos con recursos propios y llegamos a todo el país.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-eco-bg-card border-y border-eco-border py-10">
        <div className="max-w-5xl mx-auto px-4">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {[
              { valor: '+15', label: 'Años de experiencia' },
              { valor: '+2.000', label: 'Proyectos instalados' },
              { valor: '7.000 m²', label: 'Planta de fabricación' },
              { valor: '23', label: 'Provincias alcanzadas' },
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
          Eco Módulos & Piscinas nació en 2008 como una cooperativa de trabajo en Zárate, provincia de Buenos Aires. Desde entonces, crecimos con un solo objetivo: hacer que más familias argentinas puedan acceder a su vivienda o su espacio de recreación sin depender de los bancos.
        </p>
        <p className="mt-4 text-eco-text-muted leading-relaxed">
          Fabricamos módulos habitacionales con tecnología NCE (No Convencional de Eficiencia energética) y piscinas de fibra de vidrio premium. Todo en planta propia. Sin intermediarios. Con financiación directa que generamos con nuestros propios recursos.
        </p>
        <p className="mt-4 text-eco-text-muted leading-relaxed">
          Ser cooperativa no es solo una forma jurídica para nosotros: es una forma de hacer negocios. Cada peso que entra se reinvierte en mejores productos, mejores condiciones de trabajo y mayor alcance geográfico.
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

      {/* Cooperativa INAES */}
      <section className="py-16 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-5xl mx-auto px-4">
          <SectionTitle titulo="Cooperativa INAES" subtitulo="¿Qué significa comprarle a una cooperativa?" />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, titulo: 'Solidez legal', desc: 'Estamos registrados en el Instituto Nacional de Asociativismo y Economía Social. Tu compra está respaldada por una entidad jurídica transparente.' },
              { icon: Users, titulo: 'Sin dueños externos', desc: 'Los trabajadores son los dueños. No hay accionistas que extraigan utilidades. Las ganancias se reinvierten en mejores productos y condiciones.' },
              { icon: Award, titulo: 'Responsabilidad compartida', desc: 'Al comprarle a una cooperativa, apoyás el trabajo asociativo y la economía solidaria. Cada compra genera trabajo genuino en Argentina.' },
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
      <section className="py-16 max-w-4xl mx-auto px-4">
        <SectionTitle titulo="Nuestra planta en Zárate" centrado={false} />
        <div className="mt-6 bg-eco-bg-card border border-eco-border rounded-2xl p-6 flex flex-col sm:flex-row gap-6">
          <div className="flex-1 space-y-3">
            <div className="flex items-start gap-3">
              <Factory className="w-5 h-5 text-eco-green mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-eco-text font-semibold">7.000 m² de planta cubierta</p>
                <p className="text-eco-text-muted text-sm">Fabricación de módulos y piscinas bajo el mismo techo. Control de calidad en cada etapa.</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-eco-teal mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-eco-text font-semibold">Zárate, Buenos Aires</p>
                <p className="text-eco-text-muted text-sm">Ubicación estratégica con acceso al Puerto de Zárate y rutas nacionales. Logística propia a todo el país.</p>
              </div>
            </div>
          </div>
          {/* Placeholder foto planta — reemplazar con imagen real */}
          <div className="sm:w-64 h-40 bg-gradient-to-br from-[#0d1f0d] to-eco-bg-surface rounded-xl overflow-hidden relative flex-shrink-0">
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
      </section>

      {/* Equipo */}
      <section className="py-16 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle titulo="El equipo" subtitulo="Personas reales. Respuesta directa. Sin bots ni call centers." />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {EQUIPO.map((p) => (
              <div key={p.nombre} className="bg-eco-bg-surface rounded-2xl p-6 flex flex-col items-center text-center gap-4">
                {/* Placeholder foto equipo — reemplazar con foto real */}
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-eco-green-dark to-eco-bg-surface border border-eco-green/20 flex items-center justify-center overflow-hidden">
                  <svg viewBox="0 0 48 48" className="w-12 h-12 opacity-40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="24" cy="18" r="9" stroke="#2d9e4f" strokeWidth="2" fill="#2d9e4f" fillOpacity="0.15"/>
                    <path d="M6 42c0-9.94 8.06-18 18-18s18 8.06 18 18" stroke="#2d9e4f" strokeWidth="2" fill="#2d9e4f" fillOpacity="0.15"/>
                  </svg>
                </div>
                <div>
                  <p className="font-bold text-eco-text text-lg" style={{ fontFamily: 'var(--font-display)' }}>{p.nombre}</p>
                  <p className="text-eco-text-muted text-sm">{p.rol}</p>
                </div>
                <a
                  href={p.wa}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 bg-eco-green/10 hover:bg-eco-green text-eco-green hover:text-white text-sm font-semibold px-4 py-2 rounded-xl transition-colors"
                >
                  <MessageCircle className="w-4 h-4" />WhatsApp
                </a>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 max-w-3xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-extrabold text-eco-text mb-4 uppercase" style={{ fontFamily: 'var(--font-display)' }}>¿Querés conocernos?</h2>
        <p className="text-eco-text-muted mb-8">Agendá una videollamada o visitanos en Zárate. Sin turnos previos de lunes a viernes de 9 a 17hs.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/contacto" className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-8 py-4 rounded-xl transition-colors">
            Ir a contacto
          </Link>
          <VideoCallButton variant="outline" label="Agendar videollamada" />
        </div>
      </section>
    </>
  )
}
