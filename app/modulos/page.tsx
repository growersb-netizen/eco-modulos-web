import { prisma } from '@/lib/db'
import SectionTitle from '@/components/shared/SectionTitle'
import ProductCard from '@/components/shared/ProductCard'
import VideoCallButton from '@/components/shared/VideoCallButton'
import FaqAccordion from '@/components/shared/FaqAccordion'
import {
  MessageCircle, HardHat, Flame, Mountain, Wheat, Building2,
  Clock, Zap, Wrench, CheckCircle,
  Boxes, Users, MapPin, Hammer, Home, Coffee, Truck, Star
} from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Módulos Wood Frame | Viviendas, Quinchos, Obradores y Campamentos | EcoFiver',
  description: 'Fabricantes líderes de módulos industrializados Wood Frame en Argentina. Viviendas, quinchos, obradores, campamentos, oficinas rurales y unidades habitacionales. Llave en mano. Logística propia en todo el país. Financiación directa hasta 120 cuotas ajustadas por índice ICC, sin banco.',
  keywords: [
    'módulos habitacionales argentina líderes',
    'viviendas modulares Wood Frame',
    'quinchos modulares prefabricados',
    'obradores modulares',
    'campamentos modulares oil gas',
    'módulos para minería argentina',
    'unidades habitacionales prefabricadas',
    'módulos llave en mano',
    'construcción modular industrializada Wood Frame',
    'módulos financiación 120 cuotas',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/modulos' },
  openGraph: {
    title: 'Módulos Wood Frame Llave en Mano | EcoFiver',
    description: 'Líderes en fabricación de módulos Wood Frame. Viviendas, quinchos, obradores y campamentos. Logística propia en todo el país. Financiación hasta 120 cuotas ajustadas por ICC.',
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
    desc: 'Unidad habitacional de 18 a 72 m². Baño completo incluido desde 12 m², kitchenette desde 18 m². Habitable desde el día de la instalación. Financiación directa hasta 120 cuotas sin banco.',
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
    titulo: 'Líderes en módulos Wood Frame',
    desc: 'Más de 15 años de experiencia y +2.000 unidades instaladas en Argentina. Fabricación propia en 7.000 m² de planta en Zárate, Buenos Aires.',
  },
  {
    icon: Truck,
    titulo: 'Logística propia — todo el país',
    desc: 'Transporte e instalación con recursos propios. Sin tercerización. Llegamos a todas las provincias con plazos y costos previsibles.',
  },
  {
    icon: Zap,
    titulo: 'Eficiencia energética Wood Frame',
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
    r: 'Así es. Al no requerir fundaciones permanentes, los módulos son desmontables y relocalizables. Muchas empresas los usan en sucesivos proyectos, lo que maximiza la inversión.',
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
    q: '¿Qué está incluido en el módulo? ¿Baño, cocina, instalaciones?',
    r: 'Sí, todo incluido. Desde el módulo de 12 m² se entrega con baño completo (inodoro, ducha, lavabo y ventilación) operativo desde el primer día. Desde 18 m² incorpora kitchenette con mesada, muebles y conexiones ejecutadas. Todos los módulos incluyen instalación eléctrica y sanitaria interna completa. Las conexiones a la red eléctrica externa, agua y efluentes corren por cuenta del cliente, aunque asesoramos en la planificación sin costo adicional.',
  },
  {
    q: '¿Pueden adaptarse a climas extremos como la Patagonia o el NOA?',
    r: 'La estructura Wood Frame con revestimiento en placas cementicias ofrece una aislación térmica superior a la mampostería convencional. Esto los hace adecuados para el frío patagónico, las amplitudes térmicas del NOA y la aridez de Cuyo. Disponibles con refuerzos adicionales a pedido.',
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
  const modulos = await prisma.modulo.findMany({ where: { activo: true }, orderBy: { orden: 'asc' } })

  const waLink = 'https://wa.me/5491168733406?text=' + encodeURIComponent('Hola, necesito información sobre módulos. Quiero consultar disponibilidad y precios.')

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />

      {/* ── HERO — premium light ── */}
      <section className="pt-28 pb-16 bg-eco-bg border-b border-eco-border">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <span className="badge-green mb-5 inline-flex">
            Construcción modular industrializada · Tecnología Wood Frame
          </span>
          <h1
            className="text-5xl sm:text-7xl font-extrabold text-eco-text uppercase leading-[0.92] mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            Módulos Wood Frame.<br />
            <span className="text-eco-green">Llave en mano. Instalación en días.</span>
          </h1>
          <p className="text-eco-text-muted text-lg max-w-3xl mx-auto mb-4 leading-relaxed">
            Viviendas, quinchos, obradores, campamentos, oficinas de campo y más. Habitable desde el primer día: baño completo, cocina integrada, Obra Blanca terminada.
          </p>
          <p className="text-eco-text-muted text-sm max-w-2xl mx-auto mb-6">
            Baño incluido desde 12 m² · Kitchenette desde 18 m² · Instalación en el día · Sin obra civil · Financiación hasta 120 cuotas ajustadas por ICC
          </p>
          <div className="inline-flex items-center gap-2 bg-eco-green/8 border border-eco-green/20 text-eco-green text-xs font-semibold px-4 py-2 rounded-full mb-8">
            <CheckCircle className="w-3.5 h-3.5" />
            Stock disponible — entrega e instalación inmediata
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold px-8 py-4 rounded-xl transition-all shadow-[0_4px_16px_rgba(42,95,64,0.25)] hover:shadow-[0_8px_24px_rgba(42,95,64,0.35)]"
            >
              <MessageCircle className="w-5 h-5" />Solicitar cotización
            </a>
            <VideoCallButton variant="outline" label="Consulta técnica gratuita" productoDefault="modulo" />
          </div>
        </div>
      </section>

      {/* ── VENTAJAS CORPORATIVAS ── */}
      <section className="bg-eco-bg-surface border-b border-eco-border py-12">
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
      <section className="py-20 bg-eco-bg">
        <div className="max-w-7xl mx-auto px-4">
        <SectionTitle
          titulo="Aplicaciones"
          subtitulo="Un módulo Wood Frame puede resolver casi cualquier necesidad de espacio funcional sin recurrir a la obra tradicional."
        />
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {APLICACIONES.map(({ icon: Icon, titulo, desc }) => (
            <div
              key={titulo}
              className="card-premium p-5 flex flex-col gap-3"
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
        </div>
      </section>

      {/* ── RUBROS ── */}
      <section className="py-20 bg-eco-bg-surface border-y border-eco-border">
        <div className="max-w-6xl mx-auto px-4">
          <SectionTitle
            titulo="Rubros que trabajan con nosotros"
            subtitulo="Desde grandes proyectos de infraestructura hasta pymes y organismos públicos."
          />
          <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {RUBROS.map(({ icon: Icon, nombre, desc }) => (
              <div key={nombre} className="flex gap-4 bg-eco-bg-card border border-eco-border rounded-xl p-5 hover:border-eco-green/30 hover:shadow-sm transition-all">
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
      <section className="py-20 bg-eco-bg">
        <div className="max-w-7xl mx-auto px-4">
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
            />
          ))}
        </div>
        </div>
      </section>

      {/* ── LLAVE EN MANO ── */}
      <section className="py-20 bg-eco-bg-surface border-y border-eco-border">
        <div className="max-w-5xl mx-auto px-4">
        <div className="bg-eco-bg-card border border-eco-green/20 rounded-2xl p-8">
          <div className="flex flex-col sm:flex-row gap-8 items-start">
            <div className="flex-1">
              <span className="inline-block bg-eco-green/10 text-eco-green text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full mb-3">
                Habitable desde el día 1
              </span>
              <h2 className="text-3xl font-extrabold text-eco-text mb-3" style={{ fontFamily: 'var(--font-display)' }}>
                Instalado hoy. Listo para vivir.
              </h2>
              <p className="text-eco-text-muted text-sm leading-relaxed">
                Cada módulo llega a tu terreno <strong className="text-eco-text">completamente terminado</strong>: baño operativo, cocina instalada, Obra Blanca prolija y todas las conexiones ejecutadas. No es una estructura para completar — es una unidad funcional lista para habitarse desde el primer momento.
              </p>
              <p className="text-eco-text-muted text-sm leading-relaxed mt-3">
                La practicidad, la prolijidad y la solidez están garantizadas de fábrica. Lo que el cliente hace después — pintar, decorar, elegir su estilo — es <strong className="text-eco-text">libertad total, no tarea pendiente</strong>.
              </p>
            </div>
            <div className="sm:w-72 flex-shrink-0 space-y-3">
              {[
                { label: 'Baño completo', detalle: 'Incluido desde el módulo de 12 m². Inodoro, ducha, lavabo y ventilación. Funcional desde el primer día.' },
                { label: 'Cocina kitchenette', detalle: 'Desde 18 m², con mesada, muebles y conexiones listas para usar. Todo incluido en el precio.' },
                { label: 'Obra Blanca terminada', detalle: 'Interior fondeado en blanco, piso gris fondeado. Instalación eléctrica y sanitaria ejecutada.' },
                { label: 'Exterior en placas cementicias', detalle: 'Revestimiento en placas cementicias, resistente a la intemperie. Bajo mantenimiento, alta durabilidad.' },
                { label: 'Lista para personalizar', detalle: 'El cliente elige colores, muebles y detalles desde el primer día. Sin obra adicional.' },
              ].map(({ label, detalle }) => (
                <div key={label} className="flex gap-3 bg-eco-bg rounded-xl px-4 py-3 border border-eco-border">
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
        </div>
      </section>

      {/* ── SISTEMA CONSTRUCTIVO WOOD FRAME ── */}
      <section className="py-16 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-5xl mx-auto px-4">
          <SectionTitle
            titulo="Sistema Constructivo Wood Frame"
            subtitulo="Viviendas industrializadas — proceso de fabricación propio"
          />
          <p className="mt-4 text-eco-text-muted text-sm max-w-2xl mx-auto text-center">
            Fabricado íntegramente en nuestra planta de Zárate. Cada módulo sale terminado de fábrica — con baño, cocina y todas las instalaciones ejecutadas — listo para instalarse en el día y habitarse desde el primer momento.
          </p>
          <div className="mt-10 space-y-4">
            {[
              { n: '01', titulo: 'Estructura Wood Frame', desc: 'Se utiliza tirante de primera calidad (2×6) que se cepilla y endereza mecánicamente hasta obtener tirantes de 2×2. Estructura liviana y extremadamente resistente. Sin perfiles metálicos expuestos ni corrosión.' },
              { n: '02', titulo: 'Sistema de ensamble triple', desc: 'Los paneles se ensamblan con triple fijación: encolado industrial, pegado químico y atornillado estructural. Garantiza rigidez durante el transporte y a lo largo de toda la vida útil del módulo.' },
              { n: '03', titulo: 'Revestimiento exterior en placas cementicias', desc: 'La estructura de madera se reviste por fuera con placas cementicias, un material resistente a la intemperie, de bajo mantenimiento y alta durabilidad. Sin madera vista en el exterior.' },
              { n: '04', titulo: 'Terminación interior en Durlock — Obra Blanca', desc: 'Interior fondeado en Durlock, piso gris fondeado, instalación eléctrica y sanitaria ejecutada. Terminación prolija, habitable desde el primer día. El cliente personaliza a gusto.' },
              { n: '05', titulo: 'Estilo a elección: minimalista o americana', desc: 'Silueta minimalista (techo escondido/plano) o americana (techo a dos aguas) — ambas con el mismo sistema constructivo y revestimiento. Se define según el gusto del cliente.' },
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
      <section className="py-20 bg-eco-bg">
        <div className="max-w-3xl mx-auto px-4">
          <SectionTitle titulo="Preguntas frecuentes" />
          <div className="mt-10">
            <FaqAccordion items={FAQ} />
          </div>
        </div>
      </section>

      {/* ── CTA final — dark green ── */}
      <section className="py-24 bg-eco-green-dark relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-pattern opacity-60" />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-4xl sm:text-5xl font-extrabold text-white mb-4 uppercase"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ¿Tiene un proyecto?
          </h2>
          <p className="text-white/60 mb-2 text-lg">
            Nuestro equipo técnico evalúa su requerimiento sin costo ni compromiso.
          </p>
          <p className="text-white/40 text-sm mb-10">
            Trabajamos con empresas, municipios, cooperativas y proyectos particulares.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-eco-green-dark font-bold px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
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
