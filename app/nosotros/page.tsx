import SectionTitle from '@/components/shared/SectionTitle'
import VideoCallButton from '@/components/shared/VideoCallButton'
import { MessageCircle, Award, Users, MapPin, Factory, Shield, Leaf, Recycle, Building2, Zap } from 'lucide-react'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Quiénes Somos | Cooperativa INAES Eco Módulos & Piscinas',
  description: 'Cooperativa de trabajo INAES con +15 años de trayectoria. Fabricación de módulos habitacionales NCE, piscinas de fibra y gestión de materiales reciclables para grandes empresas. Planta propia en Zárate, Buenos Aires.',
  keywords: [
    'cooperativa INAES viviendas modulares',
    'fabricante módulos habitacionales Zárate',
    'empresa piscinas fibra Buenos Aires',
    'cooperativa reciclaje industrial argentina',
    'eco módulos piscinas quiénes somos',
    'cooperativa construcción reciclaje',
    'materiales reciclables empresas argentina',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/nosotros' },
  openGraph: {
    title: 'Quiénes Somos | Eco Módulos & Piscinas',
    description: 'Cooperativa INAES con +15 años. Fabricación modular NCE, piscinas de fibra y gestión de reciclaje industrial para empresas líderes.',
    url: 'https://ecomodulosypiscinas.com.ar/nosotros',
  },
}

const HITOS = [
  { año: '2008', hecho: 'Fundación de la cooperativa de trabajo en Zárate, provincia de Buenos Aires. Registro ante INAES.' },
  { año: '2010', hecho: 'Inicio del programa de gestión de materiales reciclables con industrias de la región.' },
  { año: '2012', hecho: 'Lanzamiento de la primera línea de módulos habitacionales NCE (No Convencional de Eficiencia energética).' },
  { año: '2015', hecho: 'Incorporación de piscinas de fibra de vidrio al catálogo. Expansión logística a todo el país.' },
  { año: '2018', hecho: 'Expansión de planta a 7.000 m² en Zárate. Inicio de contratos de reciclaje con empresas de escala nacional.' },
  { año: '2021', hecho: 'Lanzamiento del Combo Módulo + Piscina con financiación propia. Primeros contratos corporativos de obradores y campamentos.' },
  { año: '2024', hecho: 'Más de 2.000 proyectos instalados en Argentina. Presencia activa en 23 provincias.' },
]

const RECICLAJE_CLIENTES = [
  { nombre: 'Carrefour', icono: '🛒', sector: 'Retail / Supermercados' },
  { nombre: 'Toyota', icono: '🏭', sector: 'Industria automotriz' },
  { nombre: 'Atucha', icono: '⚡', sector: 'Energía / Nuclear' },
  { nombre: 'TransBA', icono: '🚌', sector: 'Transporte público' },
]

const AREAS = [
  {
    icono: '🏗️',
    titulo: 'Área de Soluciones Constructivas',
    desc: 'Módulos NCE, obradores, campamentos, unidades habitacionales y piscinas de fibra. Proyectos para empresas, municipios y particulares.',
    wa: 'https://wa.me/5491168733406?text=' + encodeURIComponent('Hola, necesito información sobre módulos y soluciones constructivas.'),
  },
  {
    icono: '♻️',
    titulo: 'Área de Gestión de Reciclaje',
    desc: 'Retiro, clasificación y procesamiento de materiales reciclables en empresas industriales, comerciales e institucionales.',
    wa: 'https://wa.me/5491168733406?text=' + encodeURIComponent('Hola, quisiera consultar sobre el servicio de gestión de reciclaje.'),
  },
  {
    icono: '📋',
    titulo: 'Área Comercial y Proyectos',
    desc: 'Cotizaciones corporativas, proyectos integrales, combos y licitaciones con organismos públicos o privados.',
    wa: 'https://wa.me/5491168733406?text=' + encodeURIComponent('Hola, quisiera consultar sobre proyectos y cotizaciones corporativas.'),
  },
]

export default function NosotrosPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-eco-green-dark to-eco-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-eco-green/10 text-eco-green text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            Cooperativa INAES · Zárate, Buenos Aires
          </span>
          <h1 className="text-5xl sm:text-7xl font-extrabold text-white uppercase mb-6" style={{ fontFamily: 'var(--font-display)' }}>
            Más de 15 años<br />de trayectoria cooperativa
          </h1>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Fabricación modular, piscinas de fibra y gestión de materiales reciclables. Una cooperativa con múltiples rubros, escala industrial y presencia en todo el país.
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
          Eco Módulos & Piscinas nació en 2008 como una cooperativa de trabajo en Zárate, provincia de Buenos Aires. Desde el inicio operamos en dos ejes complementarios: la fabricación de soluciones modulares para infraestructura y vivienda, y la gestión profesional de materiales reciclables para la industria.
        </p>
        <p className="mt-4 text-eco-text-muted leading-relaxed">
          Fabricamos módulos constructivos con tecnología NCE (No Convencional de Eficiencia energética) — obradores, campamentos, unidades habitacionales, oficinas de campo — y piscinas de fibra de vidrio. Todo en planta propia en Zárate, con logística directa a todo el país y financiación sin banco.
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

      {/* Cooperativa INAES */}
      <section className="py-16 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-5xl mx-auto px-4">
          <SectionTitle titulo="Cooperativa INAES" subtitulo="¿Qué significa operar bajo esta figura?" />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
            {[
              { icon: Shield, titulo: 'Solidez legal y transparencia', desc: 'Registrados en el Instituto Nacional de Asociativismo y Economía Social. Marco legal sólido, balances públicos y estructura auditada.' },
              { icon: Users, titulo: 'Propiedad colectiva', desc: 'Los trabajadores son los propietarios. No hay accionistas externos que extraigan utilidades. Las ganancias se reinvierten en operaciones y mejoras.' },
              { icon: Award, titulo: 'Compromiso real con el cliente', desc: 'Al contratar con una cooperativa, respaldás el trabajo asociativo genuino. Cada operación genera empleo de calidad en Argentina.' },
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

      {/* ── SECCIÓN RECICLAJE ── */}
      <section className="py-20 max-w-5xl mx-auto px-4">
        <div className="flex items-center gap-3 mb-2">
          <span className="inline-block bg-eco-teal/10 text-eco-teal text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full">Compromiso ambiental</span>
        </div>
        <SectionTitle
          titulo="Gestión de materiales reciclables"
          subtitulo="Un eje estratégico de la cooperativa — y parte de la base de nuestra eficiencia."
          centrado={false}
        />
        <p className="mt-6 text-eco-text-muted leading-relaxed">
          Además de la fabricación modular y las piscinas, la cooperativa opera un área especializada en retiro, clasificación y procesamiento de materiales reciclables generados por grandes empresas industriales, comerciales e institucionales de la Argentina.
        </p>
        <p className="mt-4 text-eco-text-muted leading-relaxed">
          Los materiales retirados — plásticos, metales, cartón, vidrio y otros — son procesados en nuestra planta y reincorporados a la cadena industrial como materia prima. Este ciclo reduce el desperdicio, baja el costo energético de la producción y cierra el loop de la economía circular. El mismo compromiso ambiental que aplicamos en la eficiencia energética de nuestros módulos NCE lo aplicamos a la gestión de residuos industriales.
        </p>

        {/* Beneficios del reciclaje */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { icon: Recycle, titulo: 'Retiro en planta', desc: 'Operamos directamente en las instalaciones del cliente con equipos especializados.' },
            { icon: Factory, titulo: 'Procesamiento propio', desc: 'Clasificación y acondicionamiento en nuestra planta de Zárate para devolución a la industria.' },
            { icon: Leaf, titulo: 'Materia prima circular', desc: 'Los materiales procesados vuelven a la cadena productiva, reduciendo el uso de recursos vírgenes.' },
            { icon: Zap, titulo: 'Eficiencia energética', desc: 'Menos extracción primaria = menor consumo energético global. Coherente con nuestros módulos NCE.' },
          ].map(({ icon: Icon, titulo, desc }) => (
            <div key={titulo} className="bg-eco-bg-card border border-eco-border rounded-xl p-5 flex flex-col gap-3">
              <div className="w-10 h-10 rounded-xl bg-eco-teal/10 flex items-center justify-center">
                <Icon className="w-5 h-5 text-eco-teal" />
              </div>
              <h3 className="font-bold text-eco-text text-sm" style={{ fontFamily: 'var(--font-display)' }}>{titulo}</h3>
              <p className="text-eco-text-muted text-xs">{desc}</p>
            </div>
          ))}
        </div>

        {/* Empresas cliente */}
        <div className="mt-12">
          <p className="text-eco-text-muted text-sm mb-6 uppercase tracking-widest text-center font-semibold">Empresas que confían en nuestra gestión</p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {RECICLAJE_CLIENTES.map((c) => (
              <div key={c.nombre} className="bg-eco-bg-card border border-eco-border rounded-xl p-5 flex flex-col items-center gap-2 text-center">
                <span className="text-3xl">{c.icono}</span>
                <p className="font-extrabold text-eco-text text-lg" style={{ fontFamily: 'var(--font-display)' }}>{c.nombre}</p>
                <p className="text-eco-text-muted text-xs">{c.sector}</p>
              </div>
            ))}
          </div>
          <p className="text-eco-text-muted text-xs mt-5 text-center">
            Entre otros clientes industriales, comerciales e institucionales de todo el país.
          </p>
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
                  <p className="text-eco-text-muted text-sm">Fabricación de módulos NCE, producción de piscinas de fibra y área de procesamiento de reciclables — todo bajo el mismo techo. Control de calidad en cada etapa.</p>
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
                  <p className="text-eco-text font-semibold">Tres áreas operativas integradas</p>
                  <p className="text-eco-text-muted text-sm">Construcción modular · Piscinas de fibra · Gestión de reciclables. Una sola estructura cooperativa que cubre tres rubros de escala industrial.</p>
                </div>
              </div>
            </div>
            {/* Placeholder planta */}
            <div className="sm:w-64 h-44 bg-gradient-to-br from-[#0d1f0d] to-eco-bg-surface rounded-xl overflow-hidden relative flex-shrink-0">
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

      {/* Áreas de contacto — sin nombres propios */}
      <section className="py-16 max-w-5xl mx-auto px-4">
        <SectionTitle titulo="Áreas de atención" subtitulo="Cada consulta va al área correcta. Respuesta técnica directa, sin intermediarios." />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-6">
          {AREAS.map((a) => (
            <div key={a.titulo} className="bg-eco-bg-card border border-eco-border rounded-2xl p-6 flex flex-col gap-4">
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
      </section>

      {/* CTA */}
      <section className="py-16 bg-eco-bg-card border-t border-eco-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-extrabold text-eco-text mb-4 uppercase" style={{ fontFamily: 'var(--font-display)' }}>¿Querés conocernos?</h2>
          <p className="text-eco-text-muted mb-8">Agendá una videollamada con nuestro equipo o visitanos en Zárate, de lunes a viernes de 9 a 17hs.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contacto" className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-8 py-4 rounded-xl transition-colors">
              Ir a contacto
            </Link>
            <VideoCallButton variant="outline" label="Agendar videollamada" />
          </div>
        </div>
      </section>
    </>
  )
}
