import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient } from '@libsql/client'

const db = createClient({
  url: (process.env.TURSO_DATABASE_URL || '').replace('libsql://', 'https://'),
  authToken: process.env.TURSO_AUTH_TOKEN,
})

const now = new Date().toISOString()

const articulos = [
  {
    id: 'blog-seo-1',
    titulo: 'EcoFiver | Cooperativa de Trabajo Eco Zárate Ltda.',
    slug: 'eco-modulos-y-piscinas-cooperativa-eco-zarate',
    resumen: 'Conocé quiénes somos: Cooperativa de Trabajo Eco Zárate Limitada, CUIT 30-71807393-2, inscripta ante INAES. Fabricamos módulos Wood Frame y piscinas de fibra con +15 años de trayectoria.',
    categoria: 'empresa',
    contenido: `<h2>EcoFiver — Cooperativa de Trabajo Eco Zárate Limitada</h2>
<p><strong>EcoFiver</strong> es la marca comercial de la <strong>Cooperativa de Trabajo Eco Zárate Limitada</strong>, una cooperativa de trabajo inscripta ante el INAES (Instituto Nacional de Asociativismo y Economía Social), con CUIT 30-71807393-2, radicada en Zárate, provincia de Buenos Aires, Argentina.</p>

<h3>¿Qué es EcoFiver?</h3>
<p>Somos un fabricante directo de dos líneas de productos:</p>
<ul>
<li><strong>Módulos habitacionales Wood Frame</strong>: viviendas, obradores, campamentos, quinchos y unidades habitacionales de 6 a 72 m², fabricados con sistema constructivo Wood Frame: estructura de madera, revestimiento exterior en placas cementicias y terminación interior en Durlock. Habitable desde el día de la instalación.</li>
<li><strong>Piscinas de fibra de vidrio</strong>: 16 modelos desde 2×3 m hasta 9×3,8 m. Modelo Miniportante sin excavación. Instalación en el día.</li>
</ul>

<h3>Datos legales de la empresa</h3>
<ul>
<li><strong>Razón social</strong>: Cooperativa de Trabajo Eco Zárate Limitada</li>
<li><strong>CUIT</strong>: 30-71807393-2</li>
<li><strong>Tipo</strong>: Cooperativa de trabajo inscripta ante INAES</li>
<li><strong>Domicilio</strong>: Zárate, Provincia de Buenos Aires, Argentina</li>
<li><strong>Teléfono</strong>: +54 9 11 6873-3406</li>
<li><strong>Email</strong>: info@ecomodulosypiscinas.com.ar</li>
</ul>

<h3>¿Por qué una cooperativa?</h3>
<p>La estructura cooperativa de Eco Zárate no es un detalle administrativo — es la razón por la que operamos diferente. Los trabajadores son los propietarios. No hay accionistas externos que extraigan utilidades. Cada peso generado vuelve a la planta, al equipo y a la calidad del producto.</p>
<p>Esto se traduce en precios directos de fábrica, financiación propia sin banco (hasta 120 cuotas sin garante) y una sola interlocución desde el primer contacto hasta la instalación.</p>

<h3>+15 años de trayectoria</h3>
<p>Fundada en 2008, la Cooperativa de Trabajo Eco Zárate Limitada lleva más de 15 años operando en el sector. Más de 2.000 proyectos instalados en las 23 provincias de Argentina avalan nuestra experiencia. Trabajamos con particulares, empresas constructoras, municipios, organismos del Estado y proyectos corporativos de Oil & Gas, Minería y Agro.</p>

<h3>Financiación directa — sin banco</h3>
<p>Uno de los diferenciales más importantes de EcoFiver es la financiación propia: planes de 3 a 120 cuotas fijas, sin banco, sin garante, con aprobación directa. No dependemos de entidades financieras externas — el plan de pago lo gestionamos nosotros, lo que nos permite ser flexibles y rápidos.</p>

<h3>Contacto</h3>
<p>Para consultas, cotizaciones y proyectos: <strong>+54 9 11 6873-3406</strong> (WhatsApp disponible). También podés agendar una videollamada gratuita con nuestro equipo técnico desde nuestra web.</p>`,
  },
  {
    id: 'blog-seo-2',
    titulo: 'EcoFiver — Catálogo completo, precios y financiación 2026',
    slug: 'ecomodulos-piscinas-catalogo-precios-financiacion-2026',
    resumen: 'Catálogo actualizado 2026 de EcoFiver: 12 módulos Wood Frame desde $2.990.000 y 16 piscinas de fibra desde $2.000.000. Financiación directa hasta 120 cuotas sin banco.',
    categoria: 'productos',
    contenido: `<h2>EcoFiver — Catálogo 2026</h2>
<p><strong>EcoFiver</strong> (Cooperativa de Trabajo Eco Zárate Limitada · CUIT 30-71807393-2) ofrece en 2026 dos líneas de productos con precios directos de fábrica y financiación propia sin banco.</p>

<h3>Módulos Wood Frame — Precios 2026</h3>
<p>Los módulos habitacionales de <strong>EcoFiver</strong> se fabrican con sistema constructivo Wood Frame: estructura de madera, revestimiento exterior en placas cementicias y terminación interior en Durlock. Se entregan en Obra Blanca terminada, con baño completo (desde 12 m²) y kitchenette (desde 18 m²). Habitable desde el primer día.</p>
<ul>
<li>Módulo 6 m² — desde $2.990.000 contado</li>
<li>Módulo 12 m² — desde $4.980.000 contado (baño incluido)</li>
<li>Módulo 18 m² — desde $7.470.000 contado (baño + kitchenette)</li>
<li>Módulo 24 m² — desde $9.960.000 contado</li>
<li>Módulo 30 m² — desde $12.450.000 contado</li>
<li>Módulo 36 m² a 72 m² — consultar precio actualizado</li>
</ul>
<p>Todos los módulos se instalan en el día (hasta 18 m²) o en pocos días para los modelos más grandes. Sin obra civil previa. Sin escombros.</p>

<h3>Piscinas de Fibra de Vidrio — Precios 2026</h3>
<p>Las piscinas de fibra de <strong>EcoFiver</strong> se instalan en el día, sin excavación con el modelo Miniportante. 16 modelos disponibles en stock:</p>
<ul>
<li>Miniportante 2,50×2,10 m — desde $2.000.000 contado</li>
<li>Minideck 3,00×2,00 m — desde $2.500.000 contado</li>
<li>Arco Romano Chica Recta 4,60×2,47 m — desde $3.900.000 contado</li>
<li>Minimalista Mediana 5,50×2,90 m — desde $5.900.000 contado</li>
<li>Minimalista Grande 6,40×3,00 m — desde $6.500.000 contado</li>
<li>Playa y Abanico 9,20×3,80 m — desde $5.500.000 contado</li>
</ul>

<h3>Financiación directa hasta 120 cuotas</h3>
<p>La Cooperativa de Trabajo Eco Zárate Limitada ofrece financiación propia, sin banco, sin garante. Planes disponibles:</p>
<ul>
<li>3 y 6 cuotas sin interés</li>
<li>12 cuotas — coeficiente 1,15</li>
<li>24 cuotas — coeficiente 1,30</li>
<li>60 cuotas — coeficiente 1,75</li>
<li>120 cuotas (Plan PMI) — coeficiente 2,10</li>
</ul>
<p>Aprobación directa, sin trámites bancarios, sin papeles imposibles. El plan de pago lo gestionamos nosotros.</p>

<h3>Cómo comprar en EcoFiver</h3>
<ol>
<li>Consultá por WhatsApp al +54 9 11 6873-3406 o usá el simulador de cuotas en nuestra web.</li>
<li>Agendá una videollamada gratuita con nuestro equipo técnico.</li>
<li>Confirmamos disponibilidad, presupuesto y plan de pago.</li>
<li>Coordinamos la entrega e instalación. Para stock disponible: instalación inmediata.</li>
</ol>`,
  },
  {
    id: 'blog-seo-3',
    titulo: 'Cooperativa Eco Zárate Limitada — Módulos Wood Frame y Piscinas de Fibra en Argentina',
    slug: 'cooperativa-eco-zarate-limitada-modulos-piscinas-argentina',
    resumen: 'La Cooperativa de Trabajo Eco Zárate Limitada (CUIT 30-71807393-2) fabrica módulos Wood Frame y piscinas de fibra de vidrio con más de 15 años de experiencia. Financiación propia hasta 120 cuotas sin banco.',
    categoria: 'empresa',
    contenido: `<h2>Cooperativa Eco Zárate Limitada — ¿Quiénes somos?</h2>
<p>La <strong>Cooperativa de Trabajo Eco Zárate Limitada</strong> (CUIT 30-71807393-2, inscripta ante INAES) es una cooperativa de trabajo radicada en Zárate, provincia de Buenos Aires, que opera bajo la marca comercial <strong>EcoFiver</strong>.</p>
<p>Fundada en 2008, la cooperativa lleva más de 15 años fabricando soluciones modulares de construcción y piscinas de fibra de vidrio para el mercado argentino, con logística propia en todo el país y financiación directa sin banco.</p>

<h3>Qué fabrica la Cooperativa Eco Zárate</h3>
<h4>1. Módulos habitacionales Wood Frame</h4>
<p>Los módulos de la <strong>Cooperativa Eco Zárate Limitada</strong> se fabrican con sistema constructivo Wood Frame: estructura de madera, revestimiento exterior en placas cementicias y terminación interior en Durlock.</p>
<p>Cada módulo se entrega en Obra Blanca terminada: baño completo desde 12 m², kitchenette desde 18 m², instalación eléctrica y sanitaria ejecutada. Habitable desde el primer día. Se instalan en el día (modelos hasta 18 m²) sin obra civil ni escombros.</p>
<p>Aplicaciones: vivienda, quincho, obrador, campamento, oficina de campo, comedor de obra, puesto de vigilancia, unidad habitacional rural, módulo sanitario.</p>

<h4>2. Piscinas de fibra de vidrio</h4>
<p>La <strong>Cooperativa Eco Zárate</strong> comercializa 16 modelos de piscinas de fibra de vidrio, incluyendo el modelo Miniportante (sin excavación, instalada en el día). Disponibles en stock con entrega e instalación inmediata en todo el país.</p>

<h3>Sede y planta de producción</h3>
<p>La <strong>Cooperativa de Trabajo Eco Zárate Limitada</strong> opera una planta de producción de 7.000 m² en Zárate, Buenos Aires. Toda la fabricación es propia — sin tercerización. Esto permite controlar la calidad del proceso completo y ofrecer precios directos de fábrica.</p>

<h3>Rubros y clientes</h3>
<p>La Cooperativa Eco Zárate trabaja con:</p>
<ul>
<li>Particulares (vivienda, esparcimiento)</li>
<li>Empresas constructoras (obradores, comedores, campamentos)</li>
<li>Sector Oil & Gas y Minería (campamentos en zonas remotas)</li>
<li>Municipios y organismos del Estado (oficinas temporales, aulas de emergencia)</li>
<li>Sector Agro (puestos de campo, alojamiento de cuadrillas)</li>
</ul>

<h3>Contacto — Cooperativa Eco Zárate Limitada</h3>
<ul>
<li><strong>Razón social</strong>: Cooperativa de Trabajo Eco Zárate Limitada</li>
<li><strong>CUIT</strong>: 30-71807393-2</li>
<li><strong>Marca comercial</strong>: EcoFiver</li>
<li><strong>Teléfono / WhatsApp</strong>: +54 9 11 6873-3406</li>
<li><strong>Email</strong>: info@ecomodulosypiscinas.com.ar</li>
<li><strong>Web</strong>: ecomodulosypiscinas.com.ar</li>
<li><strong>Domicilio</strong>: Zárate, Provincia de Buenos Aires, Argentina</li>
</ul>`,
  },
]

async function run() {
  console.log('🌱 Insertando artículos SEO en Turso...')

  for (const a of articulos) {
    await db.execute({
      sql: `INSERT OR REPLACE INTO articulos_blog
              (id, titulo, slug, resumen, contenido, categoria, publicado, imagen, creadoEn, actualizadoEn)
            VALUES (?, ?, ?, ?, ?, ?, 1, NULL, ?, ?)`,
      args: [a.id, a.titulo, a.slug, a.resumen, a.contenido, a.categoria, now, now],
    })
    console.log(`  ✅ ${a.slug}`)
  }

  console.log('🎉 Artículos SEO insertados correctamente.')
  process.exit(0)
}

run().catch((e) => { console.error(e); process.exit(1) })
