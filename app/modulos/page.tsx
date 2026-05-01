import { prisma } from '@/lib/db'
import SectionTitle from '@/components/shared/SectionTitle'
import ProductCard from '@/components/shared/ProductCard'
import VideoCallButton from '@/components/shared/VideoCallButton'
import {
  MessageCircle, HardHat, Flame, Mountain, Wheat, Building2,
  Clock, RotateCcw, Zap, Shield, Wrench, CheckCircle, ChevronRight,
  Boxes, Users, MapPin, Hammer
} from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Módulos Industrializados NCE | Obradores, Campamentos y Unidades Habitacionales',
  description: 'Módulos NCE para obradores, comedores de obra, campamentos industriales, unidades habitacionales rurales, oficinas de campo y más. Fabricante directo en Zárate. Entrega en todo el país. Soluciones para empresas, municipios, minería, Oil & Gas y agro.',
  keywords: [
    'módulos habitacionales argentina',
    'obradores modulares',
    'campamentos modulares oil gas',
    'módulos para minería argentina',
    'comedores de obra modulares',
    'unidades habitacionales prefabricadas',
    'módulos corporativos empresas',
    'construcción modular industrializada NCE',
    'módulos para municipios',
    'campamentos vaca muerta modulares',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/modulos' },
  openGraph: {
    title: 'Módulos Industrializados NCE | Obradores, Campamentos y Unidades Habitacionales',
    description: 'Fabricante directo de módulos NCE. Obradores, campamentos, unidades habitacionales. Desplegados en días, sin obra civil, reubicables.',
    url: 'https://ecomodulosypiscinas.com.ar/modulos',
  },
}

const APLICACIONES = [
  {
    icon: HardHat,
    titulo: 'Obrador y administración de obra',
    desc: 'Oficinas técnicas y administrativas con conexión eléctrica, sanitaria y de red. Operativos desde el día de la instalación.',
    color: 'text-eco-green',
  },
  {
    icon: Users,
    titulo: 'Comedor de obra',
    desc: 'Módulos de mayor superficie para comedores con mesadas, ventilación y aberturas amplias. Capacidad para equipos de cualquier escala.',
    color: 'text-eco-green',
  },
  {
    icon: Boxes,
    titulo: 'Campamento modular',
    desc: 'Armado de campamentos completos con módulos dormitorio, baño, comedor y oficina. Escalables según el dimensionamiento del proyecto.',
    color: 'text-eco-green',
  },
  {
    icon: Wrench,
    titulo: 'Depósito y taller de campo',
    desc: 'Módulos reforzados para almacenamiento de herramientas, insumos o equipos. Disponibles con portón de acceso y estanterías.',
    color: 'text-eco-green',
  },
  {
    icon: MapPin,
    titulo: 'Puesto de control y vigilancia',
    desc: 'Unidades compactas de 6 a 18 m² para vigilancia perimetral, acceso a planta o control de rutas en zonas rurales y remotas.',
    color: 'text-eco-green',
  },
  {
    icon: Building2,
    titulo: 'Oficina de campo y municipal',
    desc: 'Espacios funcionales para delegaciones, obras públicas, registros civiles y servicios municipales en localidades pequeñas o zonas de emergencia.',
    color: 'text-eco-green',
  },
  {
    icon: Flame,
    titulo: 'Unidad habitacional rural',
    desc: 'Alojamiento permanente o transitorio para personal de campo, peones rurales o equipos de trabajo en zonas alejadas.',
    color: 'text-eco-green',
  },
  {
    icon: Mountain,
    titulo: 'Módulo sanitario',
    desc: 'Baños y vestuarios autónomos con inodoro, ducha, lavabo y ventilación. Ideales como soporte en campamentos o en instalaciones existentes.',
    color: 'text-eco-green',
  },
]

const RUBROS = [
  {
    icon: HardHat,
    nombre: 'Construcción',
    desc: 'Obradores, comedores, vestuarios y módulos de gestión para obras viales, edilidades y proyectos de infraestructura.',
  },
  {
    icon: Flame,
    nombre: 'Oil & Gas',
    desc: 'Campamentos para personal en Vaca Muerta, Neuquén, Santa Cruz y Tierra del Fuego. Alta aislación para climas extremos.',
  },
  {
    icon: Mountain,
    nombre: 'Minería',
    desc: 'Unidades habitacionales y operativas para proyectos en altura y zonas remotas: San Juan, Catamarca, Salta, Jujuy.',
  },
  {
    icon: Wheat,
    nombre: 'Agro y ganadería',
    desc: 'Puestos de campo, alojamiento de cuadrillas y oficinas para establecimientos agropecuarios en todo el país.',
  },
  {
    icon: Building2,
    nombre: 'Municipios y Estado',
    desc: 'Oficinas temporales, salas de primeros auxilios, puestos de atención ciudadana y aulas modulares de emergencia.',
  },
  {
    icon: Hammer,
    nombre: 'Empresas y proyectos privados',
    desc: 'Cualquier empresa que requiera infraestructura funcional desplegable en plazos cortos, sin obra civil permanente.',
  },
]

const VENTAJAS = [
  {
    icon: Clock,
    titulo: 'Desplegado en días',
    desc: 'Fabricamos en planta y armamos en sitio. Un módulo de 36 m² puede estar operativo en menos de una semana desde la llegada al predio.',
  },
  {
    icon: RotateCcw,
    titulo: 'Reubicable y escalable',
    desc: 'No requiere fundaciones permanentes. Al terminar el proyecto, el módulo se puede trasladar a otra locación o ampliar con unidades adicionales.',
  },
  {
    icon: Zap,
    titulo: 'Eficiencia energética NCE',
    desc: 'Aislación térmica y acústica superior a la mampostería. Menor consumo de calefacción y refrigeración, crítico en zonas extremas.',
  },
  {
    icon: Shield,
    titulo: 'Sin obra civil',
    desc: 'Mínima intervención en el terreno. Sin excavaciones, sin hormigonado extenso, sin plazos de fraguado. Ideal para zonas con restricciones de obra.',
  },
]

const FAQ = [
  {
    q: '¿Se puede armar un campamento completo solo con módulos?',
    r: 'Sí. Diseñamos campamentos modulares completos con dormitorios, baños, comedor, lavandería y oficinas. Cada unidad se conecta entre sí y se puede ampliar en etapas según el crecimiento del proyecto.',
  },
  {
    q: '¿Los módulos se pueden reubicar una vez terminado el proyecto?',
    r: 'Exactamente. Al no requerir fundaciones permanentes, los módulos son desmontables y relocalizables. Muchas empresas los usan en sucesivos proyectos, lo que maximiza la inversión.',
  },
  {
    q: '¿Tienen experiencia en proyectos para empresas, municipios o gobiernos provinciales?',
    r: 'Sí. Trabajamos con empresas constructoras, pymes industriales, municipios del interior y organismos del Estado. Podemos emitir factura A, B o a cooperativas, y acompañar con documentación técnica para licitaciones.',
  },
  {
    q: '¿Cuánto tarda la fabricación y el armado?',
    r: 'La fabricación en nuestra planta de Zárate toma entre 15 y 45 días hábiles según el tamaño y la demanda. El armado en sitio demora entre 3 y 10 días hábiles. Consulte disponibilidad para plazos urgentes.',
  },
  {
    q: '¿Qué base o cimiento necesitan los módulos?',
    r: 'Para módulos de hasta 36 m², una losa de baja densidad, blocks de hormigón o una plataforma de madera sobre suelo compactado es suficiente. Para campamentos de mayor escala, nuestro equipo técnico asesora según el tipo de suelo y la carga del proyecto.',
  },
  {
    q: '¿Los módulos incluyen instalación eléctrica y sanitaria?',
    r: 'Sí. Se entregan con pre-instalación eléctrica y sanitaria completa. Las conexiones a la red o generador, agua y efluentes son responsabilidad de quien los recibe, aunque asesoramos en la planificación.',
  },
  {
    q: '¿Pueden adaptarse a climas extremos como la Patagonia o el NOA?',
    r: 'La tecnología NCE incluye doble panel con aislación que supera la normativa térmica básica. Esto los hace adecuados para el frío patagónico, las amplitudes térmicas del NOA y la aridez de Cuyo. Disponibles con refuerzos adicionales a pedido.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQ.map(({ q, r }) => ({
    '@type': 'Question',
    name: q,
    acceptedAnswer: { '@type': 'Answer', text: r },
  })),
}

export default async function ModulosPage() {
  const [modulos, coeficientes] = await Promise.all([
    prisma.modulo.findMany({ where: { activo: true }, orderBy: { orden: 'asc' } }),
    prisma.coeficienteCuota.findMany({ where: { activo: true }, orderBy: { cuotas: 'asc' } }),
  ])

  const coef12 = coeficientes.find((c) => c.cuotas === 12)?.coef ?? 1.15
  const waLink = 'https://wa.me/5491171825835?text=' + encodeURIComponent('Hola, necesito información sobre módulos. Quiero consultar disponibilidad y precios.')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── HERO ── */}
      <section className="pt-28 pb-16 bg-gradient-to-b from-eco-green-dark to-eco-bg">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="inline-block bg-eco-green/10 text-eco-green text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">
            Construcción modular industrializada · Tecnología NCE
          </span>
          <h1
            className="text-5xl sm:text-7xl font-extrabold text-white uppercase leading-none mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Infraestructura modular.<br />
            <span className="text-eco-green">Operativa en días.</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-4">
            Obradores, comedores, campamentos, oficinas de campo y unidades habitacionales. Fabricación propia en Zárate. Sin obra civil. Sin plazos de construcción.
          </p>
          <p className="text-eco-text-muted text-sm max-w-2xl mx-auto mb-8">
            También ofrecemos módulos para vivienda particular con financiación directa hasta 120 cuotas.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-8 py-4 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />Solicitar cotización
            </a>
            <VideoCallButton variant="outline" label="Consulta técnica gratuita" productoDefault="modulo" />
          </div>
        </div>
      </section>

      {/* ── VENTAJAS CORPORATIVAS ── */}
      <section className="bg-eco-bg-card border-y border-eco-border py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VENTAJAS.map(({ icon: Icon, titulo, desc }) => (
              <div key={titulo} className="flex flex-col gap-3">
                <div className="w-10 h-10 rounded-xl bg-eco-green/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-eco-green" />
                </div>
                <h3 className="font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>
                  {titulo}
                </h3>
                <p className="text-eco-text-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── APLICACIONES ── */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <SectionTitle
          titulo="Aplicaciones"
          subtitulo="Un módulo NCE puede resolver casi cualquier necesidad de espacio funcional sin recurrir a la obra tradicional."
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {APLICACIONES.map(({ icon: Icon, titulo, desc }) => (
            <div
              key={titulo}
              className="bg-eco-bg-card border border-eco-border hover:border-eco-green/40 rounded-xl p-5 flex flex-col gap-3 transition-colors"
            >
              <div className="w-9 h-9 rounded-lg bg-eco-green/10 flex items-center justify-center flex-shrink-0">
                <Icon className="w-4 h-4 text-eco-green" />
              </div>
              <h3 className="font-bold text-eco-text text-sm" style={{ fontFamily: 'var(--font-display)' }}>
                {titulo}
              </h3>
              <p className="text-eco-text-muted text-xs leading-relaxed">{desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── RUBROS ── */}
      <section className="py-16 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle
            titulo="Rubros que trabajan con nosotros"
            subtitulo="Desde grandes proyectos de infraestructura hasta pymes y organismos públicos."
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RUBROS.map(({ icon: Icon, nombre, desc }) => (
              <div key={nombre} className="flex gap-4 bg-eco-bg-surface border border-eco-border rounded-xl p-5 hover:border-eco-green/30 transition-colors">
                <div className="w-10 h-10 rounded-xl bg-eco-green/10 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Icon className="w-5 h-5 text-eco-green" />
                </div>
                <div>
                  <h3 className="font-bold text-eco-text mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                    {nombre}
                  </h3>
                  <p className="text-eco-text-muted text-sm">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CATÁLOGO ── */}
      <section className="py-16 max-w-7xl mx-auto px-4">
        <SectionTitle
          titulo="Catálogo de módulos"
          subtitulo="Precios de contado. Consultá planes de financiación para proyectos corporativos o particulares."
          centrado={false}
        />
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {modulos.map((m) => (
            <ProductCard
              key={m.id}
              id={m.id}
              nombre={m.nombre}
              medida={m.medida}
              descripcion={m.descripcion}
              usos={JSON.parse(m.usos || '[]')}
              precio_contado={m.precio_contado}
              precio_lista={m.precio_lista}
              imagen={m.imagen}
              tipo="modulo"
              coeficiente12={coef12}
            />
          ))}
        </div>
      </section>

      {/* ── TECNOLOGÍA NCE ── */}
      <section className="py-16 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-5xl mx-auto px-4">
          <SectionTitle
            titulo="Tecnología NCE"
            subtitulo="No Convencional de Eficiencia energética — 5 capas de prestaciones técnicas"
          />
          <p className="mt-4 text-eco-text-muted text-sm max-w-2xl mx-auto text-center">
            Diseñada para rendir en zonas con amplitud térmica extrema: Patagonia, NOA, Cuyo y el corredor andino minero.
          </p>
          <div className="mt-10 space-y-4">
            {[
              { n: '01', titulo: 'Estructura metálica galvanizada', desc: 'Perfil de acero galvanizado de alta resistencia. No requiere mantenimiento, no se oxida, vida útil estructural mínima de 50 años. Cumple con las normas IRAM para perfiles de steel frame.' },
              { n: '02', titulo: 'Panel SIP con aislación de alto rendimiento', desc: 'Dos láminas de OSB estructural con núcleo de poliestireno expandido. Aislación térmica y acústica muy superior al ladrillo convencional. Crítico para minimizar consumo energético en climas extremos.' },
              { n: '03', titulo: 'Membrana hidrófuga perimetral', desc: 'Barrera contra el ingreso de humedad del exterior. Fundamental en entornos con alta pluviometría, humedad ambiental elevada o condensación nocturna.' },
              { n: '04', titulo: 'Revestimiento exterior funcional', desc: 'Chapa prepintada de alta duración como estándar. Disponible en símil piedra, madera compuesta u otros materiales según requerimiento. Resistente al clima y de bajo mantenimiento.' },
              { n: '05', titulo: 'Terminaciones interiores funcionales', desc: 'Durlock con terminación lista para pintar. La propuesta no prioriza acabados de lujo: prioriza funcionalidad, durabilidad y velocidad de habilitación.' },
            ].map((capa) => (
              <div key={capa.n} className="flex gap-4 bg-eco-bg-surface border border-eco-border rounded-xl p-5">
                <span
                  className="text-2xl font-extrabold text-eco-green/30 flex-shrink-0 w-10"
                  style={{ fontFamily: 'var(--font-display)' }}
                >
                  {capa.n}
                </span>
                <div>
                  <h3 className="font-bold text-eco-text mb-1" style={{ fontFamily: 'var(--font-display)' }}>
                    {capa.titulo}
                  </h3>
                  <p className="text-eco-text-muted text-sm">{capa.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="py-16 max-w-3xl mx-auto px-4">
        <SectionTitle titulo="Preguntas frecuentes" />
        <div className="mt-10 space-y-4">
          {FAQ.map((f) => (
            <details
              key={f.q}
              className="group bg-eco-bg-card border border-eco-border rounded-xl"
            >
              <summary className="flex items-center justify-between px-5 py-4 cursor-pointer text-eco-text font-medium list-none">
                {f.q}
                <span className="text-eco-green group-open:rotate-45 transition-transform text-xl leading-none flex-shrink-0 ml-3">+</span>
              </summary>
              <p className="px-5 pb-4 text-eco-text-muted text-sm">{f.r}</p>
            </details>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-16 bg-eco-bg-card border-t border-eco-border">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-4xl font-extrabold text-eco-text mb-4 uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ¿Tenés un proyecto?
          </h2>
          <p className="text-eco-text-muted mb-2">
            Nuestro equipo técnico evalúa tu requerimiento sin costo y sin compromiso.
          </p>
          <p className="text-eco-text-muted text-sm mb-8">
            Trabajamos con empresas, municipios, cooperativas y proyectos particulares.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-8 py-4 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />Solicitar cotización por WhatsApp
            </a>
            <VideoCallButton variant="outline" label="Consulta técnica gratuita" productoDefault="modulo" />
          </div>
        </div>
      </section>
    </>
  )
}
