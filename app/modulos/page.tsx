import { prisma } from '@/lib/db'
import SectionTitle from '@/components/shared/SectionTitle'
import ProductCard from '@/components/shared/ProductCard'
import VideoCallButton from '@/components/shared/VideoCallButton'
import {
  MessageCircle, HardHat, Flame, Mountain, Wheat, Building2,
  Clock, Zap, Wrench, CheckCircle,
  Boxes, Users, MapPin, Hammer, Home, Coffee, Truck, Star
} from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Módulos NCE | Viviendas, Quinchos, Obradores y Campamentos | Eco Módulos & Piscinas',
  description: 'Fabricantes líderes de módulos NCE en Argentina. Viviendas, quinchos, obradores, campamentos, oficinas rurales y unidades habitacionales. Llave en mano. Logística propia en todo el país. Financiación directa hasta 120 cuotas sin banco.',
  keywords: [
    'módulos habitacionales argentina líderes',
    'viviendas modulares NCE',
    'quinchos modulares prefabricados',
    'obradores modulares',
    'campamentos modulares oil gas',
    'módulos para minería argentina',
    'unidades habitacionales prefabricadas',
    'módulos llave en mano',
    'construcción modular industrializada NCE',
    'módulos financiación 120 cuotas',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/modulos' },
  openGraph: {
    title: 'Módulos NCE Llave en Mano | Eco Módulos & Piscinas',
    description: 'Líderes en fabricación de módulos NCE. Viviendas, quinchos, obradores y campamentos. Logística propia en todo el país. Financiación hasta 120 cuotas.',
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
  {
    icon: Home,
    titulo: 'Vivienda particular',
    desc: 'Unidad habitacional permanente o transitoria de 18 a 72 m². Llave en mano. Financiación directa hasta 120 cuotas sin banco ni garante.',
    color: 'text-eco-green',
  },
  {
    icon: Coffee,
    titulo: 'Quincho y espacio de recreación',
    desc: 'Módulos abiertos o semicerrados para entretenimiento, asados y reuniones. Con o sin cocina. Personalizable en dimensiones y aberturas.',
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
    icon: Star,
    titulo: 'Líderes en módulos NCE',
    desc: 'Más de 15 años de experiencia y +2.000 unidades instaladas en Argentina. Fabricación propia en 7.000 m² de planta en Zárate, Buenos Aires.',
  },
  {
    icon: Truck,
    titulo: 'Logística propia — todo el país',
    desc: 'Transporte e instalación con recursos propios. Sin tercerización. Llegamos a todas las provincias con plazos y costos previsibles.',
  },
  {
    icon: Zap,
    titulo: 'Eficiencia energética NCE',
    desc: 'Aislación térmica y acústica muy superior a la mampostería convencional. Menor consumo energético en cualquier clima del país.',
  },
  {
    icon: Clock,
    titulo: 'Instalación el mismo día',
    desc: 'Módulos hasta 18 m² instalados en el día. Hasta 72 m² en un máximo de 5 días. Disponemos de stock para coordinar entrega e instalación inmediata.',
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
    q: '¿Cuánto tarda la instalación?',
    r: 'Para módulos de hasta 18 m², la instalación se realiza en el día. Módulos de mayor metraje demoran entre 2 y 5 días de armado en sitio, según el tamaño. Disponemos de stock para entrega e instalación inmediata. Para proyectos financiados, los plazos de fabricación se coordinan al momento de la confirmación del pedido.',
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
  const waLink = 'https://wa.me/5491168733406?text=' + encodeURIComponent('Hola, necesito información sobre módulos. Quiero consultar disponibilidad y precios.')

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
            Módulos NCE.<br />
            <span className="text-eco-green">Llave en mano. En días.</span>
          </h1>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto mb-4">
            Viviendas, quinchos, obradores, campamentos, oficinas de campo y más. Líderes en fabricación de módulos NCE en Argentina. Logística propia en todo el país.
          </p>
          <p className="text-eco-text-muted text-sm max-w-2xl mx-auto mb-4">
            Practicidad · Prolijidad · Rapidez · Eficiencia energética · Sin obra civil
          </p>
          <div className="inline-flex items-center gap-2 bg-yellow-400/10 border border-yellow-400/30 text-yellow-300 text-xs font-semibold px-4 py-2 rounded-full mb-8">
            <CheckCircle className="w-3.5 h-3.5" />
            Stock disponible — entrega e instalación inmediata
          </div>
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
          subtitulo="Precios de contado con entrega inmediata desde stock. Para compras financiadas, coordinar plazo de fabricación."
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

      {/* ── LLAVE EN MANO ── */}
      <section className="py-14 max-w-5xl mx-auto px-4">
        <div className="bg-eco-bg-card border border-eco-green/20 rounded-2xl p-8">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="flex-1">
              <span className="inline-block bg-eco-green/10 text-eco-green text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                Entrega llave en mano
              </span>
              <h2 className="text-3xl font-extrabold text-eco-text mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                Terminado. Listo para usar o personalizar.
              </h2>
              <p className="text-eco-text-muted text-sm leading-relaxed">
                Cada módulo se entrega <strong className="text-eco-text">completamente terminado</strong> y habitable desde el primer día. No vendemos estructura: entregamos una unidad funcional.
              </p>
              <p className="text-eco-text-muted text-sm leading-relaxed mt-3">
                No ofrecemos terminaciones de lujo ni detalles decorativos de obra fina — eso no es lo que hacemos. Lo que sí garantizamos es <strong className="text-eco-text">practicidad, prolijidad, solidez y eficiencia</strong>. El cliente tiene un módulo habitable y puede personalizarlo a gusto sin necesidad de obra adicional.
              </p>
            </div>
            <div className="sm:w-72 flex-shrink-0 space-y-3">
              {[
                { label: 'Interior', detalle: 'Paredes y cielorraso fondeados en blanco. Piso fondeado en gris. Instalación eléctrica y sanitaria incluida.' },
                { label: 'Exterior', detalle: 'Revestimiento plástico texturizado impermeabilizado. Resistente a la intemperie. Bajo mantenimiento.' },
                { label: 'Aberturas', detalle: 'Puerta de acceso y ventanas según modelo. Incluidas en precio de catálogo.' },
                { label: 'Personalización', detalle: 'El cliente elige colores, revestimientos, muebles y detalles. Sin obra adicional.' },
              ].map(({ label, detalle }) => (
                <div key={label} className="flex gap-3 bg-eco-bg-surface rounded-xl px-4 py-3">
                  <CheckCircle className="w-4 h-4 text-eco-green flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-eco-text text-xs font-bold uppercase tracking-widest">{label}</p>
                    <p className="text-eco-text-muted text-xs mt-0.5">{detalle}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TECNOLOGÍA NCE ── */}
      <section className="py-16 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-5xl mx-auto px-4">
          <SectionTitle
            titulo="Tecnología NCE"
            subtitulo="No Convencional de Eficiencia energética — proceso de fabricación propio"
          />
          <p className="mt-4 text-eco-text-muted text-sm max-w-2xl mx-auto text-center">
            Fabricado íntegramente en nuestra planta de Zárate. Cada panel sale terminado, con anclajes incorporados, listo para armado en seco sin agua ni desperdicios.
          </p>
          <div className="mt-10 space-y-4">
            {[
              { n: '01', titulo: 'Estructura Wood Frame', desc: 'Se utiliza tirante de primera calidad (2×6) que se cepilla y endereza mecánicamente hasta obtener tirantes de 2×2. Estructura liviana y extremadamente resistente. Sin perfiles metálicos expuestos ni corrosión.' },
              { n: '02', titulo: 'Sistema de ensamble triple', desc: 'Los paneles se ensamblan con triple fijación: encolado industrial, pegado químico y atornillado estructural. Garantiza rigidez durante el transporte y a lo largo de toda la vida útil del módulo.' },
              { n: '03', titulo: 'Emplacado NCE — Núcleo de Celulosa Encapsulada', desc: 'Los paneles se cubren con placas de NCE (Núcleo de Celulosa Encapsulada). Material aislante que ofrece eficiencia térmica y acústica superior a cualquier sistema de steel frame o construcción tradicional.' },
              { n: '04', titulo: 'Blindaje con resina náutica', desc: 'Cada panel ingresa a la espresora donde se aplica fibra de vidrio combinada con resina náutica en vuelta completa. Otorga resistencia estructural excepcional y protección exterior absoluta contra la humedad, el clima y la intemperie.' },
              { n: '05', titulo: 'Obra Blanca', desc: 'Tras el fibrado, cada panel pasa por perfilado, lijado y pintado. Se entrega en Obra Blanca: interior fondeado en blanco, piso gris fondeado, exterior con revestimiento plástico texturizado impermeabilizado. Terminación prolija, habitable desde el primer día. El cliente personaliza a gusto.' },
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
          {/* Montaje en seco */}
          <div className="mt-8 bg-eco-green/5 border border-eco-green/20 rounded-2xl p-6 flex flex-col sm:flex-row gap-4 items-start">
            <span className="text-3xl flex-shrink-0">🔩</span>
            <div>
              <h3 className="font-bold text-eco-text mb-2" style={{ fontFamily: 'var(--font-display)' }}>Montaje en seco — sin obra en el terreno</h3>
              <p className="text-eco-text-muted text-sm">Los tabiques salen de nuestra planta con todos los anclajes ya incorporados. El armado en sitio no requiere agua, no genera escombros y no depende de obra civil previa. Un equipo especializado instala el módulo completo en el día — y en módulos de mayor metraje, en pocos días de trabajo limpio y eficiente.</p>
            </div>
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
