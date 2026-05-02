import { config } from 'dotenv'
config({ path: '.env.local' })
import { PrismaClient } from '@prisma/client'
import { createClient } from '@libsql/client'
import bcrypt from 'bcryptjs'

// eslint-disable-next-line @typescript-eslint/no-require-imports
const { PrismaLibSql } = require('@prisma/adapter-libsql')

function createPrisma() {
  console.log('TURSO_DATABASE_URL:', process.env.TURSO_DATABASE_URL?.slice(0, 40))
  const libsql = createClient({
    url: process.env.TURSO_DATABASE_URL!,
    authToken: process.env.TURSO_AUTH_TOKEN,
  })
  const adapter = new PrismaLibSql(libsql)
  return new PrismaClient({ adapter })
}
const prisma = createPrisma()

async function main() {
  console.log('🌱 Iniciando seed...')

  // ─── USUARIO ADMIN ───
  const adminEmail = process.env.ADMIN_EMAIL || 'admin@ecomodulosypiscinas.com.ar'
  const adminPassword = process.env.ADMIN_PASSWORD || 'cambiar-en-produccion'
  const hash = await bcrypt.hash(adminPassword, 12)

  await prisma.usuario.upsert({
    where: { email: adminEmail },
    update: {},
    create: {
      email: adminEmail,
      password: hash,
      nombre: 'Administrador',
      rol: 'admin',
      activo: true,
    },
  })
  console.log('✅ Usuario admin creado')

  // ─── MÓDULOS (12 modelos) ───
  const modulos = [
    { nombre: 'Módulo 6 m²',  medida: '6 m²',  precio_contado: 2990000,  precio_lista: 4186000  },
    { nombre: 'Módulo 12 m²', medida: '12 m²', precio_contado: 4980000,  precio_lista: 6972000  },
    { nombre: 'Módulo 18 m²', medida: '18 m²', precio_contado: 7470000,  precio_lista: 10458000 },
    { nombre: 'Módulo 24 m²', medida: '24 m²', precio_contado: 9960000,  precio_lista: 13944000 },
    { nombre: 'Módulo 30 m²', medida: '30 m²', precio_contado: 12450000, precio_lista: 17430000 },
    { nombre: 'Módulo 36 m²', medida: '36 m²', precio_contado: 14940000, precio_lista: 20916000 },
    { nombre: 'Módulo 42 m²', medida: '42 m²', precio_contado: 17430000, precio_lista: 24402000 },
    { nombre: 'Módulo 48 m²', medida: '48 m²', precio_contado: 19920000, precio_lista: 27888000 },
    { nombre: 'Módulo 54 m²', medida: '54 m²', precio_contado: 22410000, precio_lista: 31374000 },
    { nombre: 'Módulo 60 m²', medida: '60 m²', precio_contado: 24900000, precio_lista: 34860000 },
    { nombre: 'Módulo 66 m²', medida: '66 m²', precio_contado: 27390000, precio_lista: 38346000 },
    { nombre: 'Módulo 72 m²', medida: '72 m²', precio_contado: 29880000, precio_lista: 41832000 },
  ]

  const usosModulo = JSON.stringify(['Vivienda', 'Ampliación', 'Oficina', 'Quincho', 'Glamping', 'Inversión'])
  const descripcionModulo = 'Módulo habitacional de tecnología NCE (No Convencional de Eficiencia energética). Estructura metálica galvanizada, aislación térmica y acústica superior, terminaciones premium. Llave en mano.'

  for (let i = 0; i < modulos.length; i++) {
    const m = modulos[i]
    await prisma.modulo.upsert({
      where: { id: `modulo-${i + 1}` },
      update: { precio_contado: m.precio_contado, precio_lista: m.precio_lista },
      create: {
        id: `modulo-${i + 1}`,
        nombre: m.nombre,
        medida: m.medida,
        descripcion: descripcionModulo,
        usos: usosModulo,
        precio_contado: m.precio_contado,
        precio_lista: m.precio_lista,
        activo: true,
        orden: i,
      },
    })
  }
  console.log('✅ 12 módulos creados')

  // ─── PISCINAS (16 modelos) ───
  const piscinas = [
    { nombre: 'Minideck',                         medida: '3,00×2,00×0,70m',   precio_contado: 2500000, precio_lista: 3500000, destacada: false },
    { nombre: 'Miniportante',                     medida: '2,50×2,10×0,70m',   precio_contado: 2000000, precio_lista: 2800000, destacada: true  },
    { nombre: 'Autoportante',                     medida: '4,10×2,10×0,70m',   precio_contado: 2500000, precio_lista: 3500000, destacada: false },
    { nombre: 'Arco Romano Chica Recta',          medida: '4,60×2,47×1,20m',   precio_contado: 3900000, precio_lista: 5460000, destacada: false },
    { nombre: 'Arco Romano Chica C/Desnivel',     medida: '4,60×2,35m',        precio_contado: 2990000, precio_lista: 4186000, destacada: false },
    { nombre: 'Arco Romano Mediana Recta',        medida: '6,40×2,94×1,40m',   precio_contado: 3690000, precio_lista: 5166000, destacada: false },
    { nombre: 'Arco Romano Mediana C/Desnivel',   medida: '7,00×3,35m',        precio_contado: 4900000, precio_lista: 6860000, destacada: false },
    { nombre: 'Arco Romano Grande',               medida: '8,10×3,35m',        precio_contado: 5200000, precio_lista: 7280000, destacada: false },
    { nombre: 'Playa Húmeda',                     medida: '5,20×2,45m',        precio_contado: 3290000, precio_lista: 4606000, destacada: false },
    { nombre: 'Minimalista Chica',                medida: '3,97×2,46×1,20m',   precio_contado: 3700000, precio_lista: 5180000, destacada: false },
    { nombre: 'Minimalista Mediana',              medida: '5,50×2,90×1,50m',   precio_contado: 5900000, precio_lista: 8260000, destacada: false },
    { nombre: 'Minimalista Grande',               medida: '6,40×3,00×1,40m',   precio_contado: 6500000, precio_lista: 9100000, destacada: false },
    { nombre: 'Recta C/Mini Escalera',            medida: '4,63×2,48×1,25m',   precio_contado: 4500000, precio_lista: 6300000, destacada: false },
    { nombre: 'Playa Húmeda Chica C/Escalera',   medida: '4,10×2,40×1,20m',   precio_contado: 3800000, precio_lista: 5320000, destacada: false },
    { nombre: 'Semi Playa Húmeda C/Escalera',    medida: '6,70×2,95×1,50m',   precio_contado: 4500000, precio_lista: 6300000, destacada: false },
    { nombre: 'Playa y Abanico',                  medida: '9,20×3,80m',        precio_contado: 5500000, precio_lista: 7700000, destacada: false },
  ]

  const usosPiscina = JSON.stringify(['Residencial', 'Comercial', 'Glamping', 'Hotel', 'Club'])
  const descripcionPiscina = 'Piscina de fibra de vidrio de alta resistencia. Resistente a rayos UV, químicos y temperatura. No requiere mantenimiento especial. Instalación rápida y limpia.'

  for (let i = 0; i < piscinas.length; i++) {
    const p = piscinas[i]
    await prisma.piscina.upsert({
      where: { id: `piscina-${i + 1}` },
      update: { precio_contado: p.precio_contado, precio_lista: p.precio_lista },
      create: {
        id: `piscina-${i + 1}`,
        nombre: p.nombre,
        medida: p.medida,
        descripcion: descripcionPiscina,
        usos: usosPiscina,
        precio_contado: p.precio_contado,
        precio_lista: p.precio_lista,
        destacada: p.destacada,
        activo: true,
        orden: i,
      },
    })
  }
  console.log('✅ 16 piscinas creadas')

  // ─── COEFICIENTES DE CUOTAS (13 tramos) ───
  const coeficientes = [
    { cuotas: 3,   coef: 1.00, label: 'Hasta 3 cuotas sin interés'  },
    { cuotas: 6,   coef: 1.00, label: 'Hasta 6 cuotas sin interés'  },
    { cuotas: 12,  coef: 1.15, label: 'Hasta 12 cuotas'             },
    { cuotas: 18,  coef: 1.22, label: 'Hasta 18 cuotas'             },
    { cuotas: 24,  coef: 1.30, label: 'Hasta 24 cuotas'             },
    { cuotas: 36,  coef: 1.50, label: 'Hasta 36 cuotas'             },
    { cuotas: 48,  coef: 1.62, label: 'Hasta 48 cuotas'             },
    { cuotas: 60,  coef: 1.75, label: 'Hasta 60 cuotas'             },
    { cuotas: 72,  coef: 1.87, label: 'Hasta 72 cuotas'             },
    { cuotas: 84,  coef: 1.95, label: 'Hasta 84 cuotas'             },
    { cuotas: 96,  coef: 2.02, label: 'Hasta 96 cuotas'             },
    { cuotas: 108, coef: 2.07, label: 'Hasta 108 cuotas'            },
    { cuotas: 120, coef: 2.10, label: 'Plan PMI — 120 cuotas'       },
  ]

  for (const c of coeficientes) {
    await prisma.coeficienteCuota.upsert({
      where: { cuotas: c.cuotas },
      update: { coef: c.coef, label: c.label },
      create: { ...c, activo: true },
    })
  }
  console.log('✅ 13 coeficientes creados')

  // ─── TESTIMONIOS ───
  const testimonios = [
    {
      nombre: 'María González',
      localidad: 'Pilar, Buenos Aires',
      producto: 'Módulo 36 m²',
      texto: 'Increíble la calidad y velocidad de instalación. En menos de una semana tenía mi local comercial funcionando. El equipo de Eco Módulos es excelente, siempre disponibles para cualquier consulta.',
      estrellas: 5,
      orden: 0,
    },
    {
      nombre: 'Roberto Fernández',
      localidad: 'Córdoba Capital',
      producto: 'Piscina Minimalista Mediana',
      texto: 'La piscina superó todas mis expectativas. La instalación fue rapidísima, el equipo muy profesional. La fibra de vidrio se mantiene perfecta después de dos temporadas. Totalmente recomendable.',
      estrellas: 5,
      orden: 1,
    },
    {
      nombre: 'Laura Martínez',
      localidad: 'Mendoza',
      producto: 'Combo Módulo 48 m² + Piscina',
      texto: 'Compramos el combo módulo-piscina en 60 cuotas y fue la mejor decisión. El financiamiento directo sin banco nos facilitó todo. Hoy tenemos nuestro espacio de glamping generando ingresos.',
      estrellas: 5,
      orden: 2,
    },
  ]

  for (const t of testimonios) {
    const exists = await prisma.testimonio.findFirst({ where: { nombre: t.nombre } })
    if (!exists) {
      await prisma.testimonio.create({ data: { ...t, activo: true } })
    }
  }
  console.log('✅ 3 testimonios creados')

  // ─── ARTÍCULOS DE BLOG ───
  const articulos = [
    {
      titulo: 'Casa modular vs ladrillo: comparativa real 2026',
      slug: 'casa-modular-vs-ladrillo',
      resumen: 'Comparamos en detalle los costos, tiempos y calidad de una vivienda modular NCE versus construcción tradicional de ladrillo en Argentina en 2026.',
      categoria: 'vivienda',
      contenido: `<h2>Casa modular vs ladrillo: ¿cuál conviene en Argentina en 2026?</h2>
<p>La elección entre una vivienda modular y una construcción tradicional de ladrillos es una de las decisiones más importantes que puede tomar una familia argentina. En Eco Módulos & Piscinas llevamos más de 15 años ayudando a personas a tomar esta decisión con información real, sin marketing vacío.</p>

<h3>Tiempo de construcción</h3>
<p>Una de las ventajas más evidentes de la construcción modular NCE es el tiempo. Mientras que una vivienda de ladrillo de 60 m² puede tardar entre 12 y 24 meses en completarse (dependiendo de los imprevistos, el clima y la disponibilidad de mano de obra), un módulo habitacional del mismo tamaño se instala en sitio en tan solo 5 a 10 días hábiles.</p>
<p>Esto significa que podés estar viviendo en tu nueva casa en cuestión de semanas, no de años. Para familias en situación de necesidad habitacional urgente, esto no es un detalle menor.</p>

<h3>Costo real de construcción</h3>
<p>La comparación de costos entre construcción modular y ladrillo en Argentina es más compleja de lo que parece. En general, el costo por metro cuadrado de un módulo NCE terminado, llave en mano, es comparable o incluso menor al de una construcción de ladrillo de calidad equivalente.</p>
<p>Pero hay factores que la gente suele ignorar al calcular el costo del ladrillo: el tiempo de tu propia supervisión (si es autogestionada), las demasías de material (estimadas en un 15-20%), el costo de los imprevistos, y el costo financiero de tener el dinero inmovilizado por más de un año durante la construcción.</p>

<h3>Calidad constructiva</h3>
<p>La tecnología NCE (No Convencional de Eficiencia energética) utiliza estructura metálica galvanizada de alta resistencia, con aislación termoacústica de poliuretano expandido de alta densidad. El resultado es una vivienda que en muchos aspectos supera a la construcción de ladrillo convencional en eficiencia energética y resistencia sísmica.</p>

<h3>Financiación directa</h3>
<p>Quizás la diferencia más importante en el contexto argentino actual es la financiación. En Eco Módulos ofrecemos planes propios de hasta 120 cuotas sin banco, sin garante y sin requisitos imposibles. Para la construcción de ladrillo, la financiación suele depender de créditos hipotecarios que son difíciles de acceder para gran parte de la población.</p>

<h3>Conclusión</h3>
<p>Si valorás la velocidad de entrega, la certeza del costo final, la eficiencia energética y la posibilidad de financiar sin banco, la vivienda modular NCE es la mejor opción en 2026. ¿Tenés dudas? Agendá una videollamada gratuita con nuestro equipo.</p>`,
      publicado: true,
    },
    {
      titulo: '¿Cuánto cuesta una piscina de fibra en Argentina?',
      slug: 'costo-piscina-fibra-argentina',
      resumen: 'Precios actualizados 2026 de piscinas de fibra de vidrio en Argentina. Modelos, tamaños y planes de financiación disponibles.',
      categoria: 'piscinas',
      contenido: `<h2>¿Cuánto cuesta una piscina de fibra de vidrio en Argentina en 2026?</h2>
<p>Una de las preguntas más frecuentes que recibimos en Eco Módulos & Piscinas es sobre el costo real de una piscina de fibra de vidrio. En este artículo te contamos todo lo que necesitás saber, con precios reales y sin letra chica.</p>

<h3>Rango de precios según modelo</h3>
<p>Los precios de las piscinas de fibra varían significativamente según el tamaño y diseño. En nuestro catálogo 2026, tenemos modelos que van desde los $2.000.000 para modelos compactos (la Miniportante, ideal para espacios pequeños) hasta los $6.500.000 para modelos grandes como la Minimalista Grande de 6,40×3,00m.</p>

<h3>¿Qué incluye el precio?</h3>
<p>Nuestros precios incluyen la piscina de fibra de vidrio terminada en fábrica, el flete hasta tu domicilio (hasta cierta distancia), y la instalación básica. No incluyen la excavación (excepto modelos autoportantes y la Miniportante), la conexión eléctrica del sistema de filtrado, ni la decoración perimetral.</p>

<h3>Ventajas de la fibra sobre la mampostería</h3>
<p>Las piscinas de fibra de vidrio tienen varias ventajas respecto a las de hormigón o mampostería. La principal es el tiempo de instalación: una piscina de fibra se instala en 2 a 5 días, mientras que una de mampostería puede tomar 30 a 60 días. Además, el mantenimiento es menor, ya que la superficie lisa de la fibra no favorece el desarrollo de algas.</p>

<h3>Financiación sin banco</h3>
<p>En Eco Módulos ofrecemos planes de financiación propios para nuestras piscinas. Podés acceder a cuotas fijas desde 3 hasta 120 cuotas, sin necesidad de crédito bancario. El proceso de aprobación es simple y rápido.</p>

<h3>¿Cómo empezar?</h3>
<p>El primer paso es elegir el modelo que más se adapta a tu espacio y presupuesto. Te recomendamos usar nuestro simulador de cuotas online para tener una idea del costo mensual antes de consultar. Luego, agendá una videollamada gratuita con nuestro equipo para ajustar los detalles.</p>`,
      publicado: true,
    },
    {
      titulo: 'Cómo financiar una vivienda sin crédito bancario',
      slug: 'financiar-vivienda-sin-banco',
      resumen: 'Guía completa sobre las opciones de financiación directa para comprar o construir una vivienda en Argentina sin depender de créditos bancarios.',
      categoria: 'financiacion',
      contenido: `<h2>Cómo financiar una vivienda sin crédito bancario en Argentina</h2>
<p>En un contexto donde el acceso al crédito hipotecario es difícil para gran parte de los argentinos, existen alternativas reales para financiar tu vivienda sin depender de un banco. En Eco Módulos & Piscinas desarrollamos nuestro propio sistema de financiación directa para que cualquier familia pueda acceder a una vivienda de calidad.</p>

<h3>El problema del crédito hipotecario en Argentina</h3>
<p>Obtener un crédito hipotecario en Argentina requiere, en general, una serie de requisitos que excluyen a una gran parte de la población: ingresos formales demostrables, historial crediticio impecable, relación cuota-ingreso del 25-30%, y un enganche inicial significativo. Muchas familias que necesitan una vivienda simplemente no califican.</p>

<h3>Financiación directa: cómo funciona</h3>
<p>En Eco Módulos ofrecemos financiación directa: nosotros somos quien financia, sin intermediarios bancarios. Esto nos permite ser más flexibles en los requisitos y en los plazos. Los planes disponibles van desde 3 cuotas (sin interés) hasta 120 cuotas en el Plan PMI.</p>

<h3>Plan PMI: 120 cuotas</h3>
<p>El Plan PMI (Plan de Módulo Integral) es nuestra opción de financiación más extendida. Permite acceder a un módulo habitacional o una piscina en hasta 120 cuotas mensuales fijas. Es el plan elegido por familias que buscan cuotas accesibles y prefieren pagar en el largo plazo.</p>

<h3>Contado con descuento</h3>
<p>Para quienes tienen el capital disponible, el pago de contado ofrece un descuento significativo sobre el precio de lista. Este es el camino más económico en el largo plazo, aunque requiere contar con los fondos completos al momento de la compra.</p>

<h3>¿Cómo acceder?</h3>
<p>El proceso es simple: simulá tu cuota en nuestra calculadora online, agendá una videollamada con uno de nuestros asesores, y en esa reunión acordamos los detalles del plan. No necesitás garante ni historial crediticio para la mayoría de nuestros planes.</p>`,
      publicado: true,
    },
    {
      titulo: 'Qué es la tecnología NCE y por qué importa',
      slug: 'tecnologia-nce-que-es',
      resumen: 'Explicación detallada de la tecnología NCE (No Convencional de Eficiencia energética) usada en los módulos habitacionales de Eco Módulos.',
      categoria: 'vivienda',
      contenido: `<h2>¿Qué es la tecnología NCE y por qué es superior a la construcción convencional?</h2>
<p>Cuando hablamos de tecnología NCE (No Convencional de Eficiencia energética), nos referimos al sistema constructivo que utilizamos en Eco Módulos & Piscinas para fabricar nuestros módulos habitacionales. En este artículo te explicamos en detalle en qué consiste y por qué representa una evolución respecto a la construcción tradicional.</p>

<h3>Las 5 capas del sistema NCE</h3>
<p><strong>1. Estructura metálica galvanizada:</strong> La base del módulo es un esqueleto de perfiles de acero galvanizado de alta resistencia. Este material no se oxida, no le entra la humedad, y tiene una vida útil mínima de 50 años sin mantenimiento especial.</p>
<p><strong>2. Panel SIP (Structural Insulated Panel):</strong> Las paredes están compuestas por paneles SIP: dos láminas de OSB (madera estructural) que sandwichean un núcleo de poliestireno expandido de alta densidad. Este sistema ofrece aislación térmica y acústica muy superior al ladrillo convencional.</p>
<p><strong>3. Membrana hidrófuga:</strong> Por fuera del panel SIP se coloca una membrana que impide el paso de la humedad hacia el interior, protegiéndolo de las inclemencias climáticas.</p>
<p><strong>4. Revestimiento exterior:</strong> El exterior puede terminarse en chapa prepintada, revestimiento símil piedra, madera compuesta u otros materiales según la elección del cliente.</p>
<p><strong>5. Terminaciones interiores:</strong> Por dentro, el módulo se termina con durlock o revestimiento de madera según el modelo elegido, listo para pintar o decorar a gusto.</p>

<h3>¿Por qué es más eficiente energéticamente?</h3>
<p>La aislación del sistema NCE reduce drásticamente la transferencia de calor entre el interior y el exterior. En la práctica, esto significa que en verano el módulo permanece más fresco sin aire acondicionado, y en invierno retiene el calor por más tiempo. Las familias que viven en módulos NCE reportan ahorros significativos en consumo energético respecto a casas de ladrillo del mismo tamaño.</p>`,
      publicado: true,
    },
    {
      titulo: 'Módulo habitacional: el negocio del glamping en Argentina',
      slug: 'glamping-modulo-habitacional',
      resumen: 'Cómo los módulos habitacionales de Eco Módulos se están convirtiendo en la opción preferida para proyectos de glamping en Argentina.',
      categoria: 'inspiracion',
      contenido: `<h2>Módulos habitacionales para glamping: el negocio del turismo de lujo en Argentina</h2>
<p>El glamping (glamorous camping) es una de las tendencias de turismo que más está creciendo en Argentina. Emprendedores de todo el país descubren en los módulos habitacionales de Eco Módulos & Piscinas la herramienta perfecta para lanzar proyectos de alojamiento turístico de alta gama sin necesidad de grandes inversiones en construcción tradicional.</p>

<h3>¿Por qué elegir módulos para glamping?</h3>
<p>Las ventajas son múltiples. En primer lugar, la velocidad de instalación: en cuestión de semanas podés tener tu emprendimiento de glamping funcionando y generando ingresos, en lugar de esperar meses por una construcción de ladrillo. Segundo, la escalabilidad: podés comenzar con 2 o 3 módulos y agregar más a medida que el negocio crece. Tercero, la estética: los módulos NCE tienen un diseño moderno y atractivo que funciona muy bien para el mercado de turismo de lujo.</p>

<h3>El negocio en números</h3>
<p>Un módulo de 18 m² en un destino turístico de primer nivel puede generar entre $80.000 y $150.000 pesos por noche en 2026. Con una ocupación promedio del 50%, un solo módulo puede generar más de $1.000.000 pesos mensuales de ingresos brutos. En ese escenario, el retorno de la inversión inicial puede alcanzarse en 18 a 36 meses.</p>

<h3>Combinación módulo + piscina</h3>
<p>Muchos emprendedores de glamping optan por el combo módulo + piscina que ofrecemos con un 25% de descuento especial. Una cabaña modular con piscina privada es uno de los productos más demandados en las plataformas de alquiler turístico de corto plazo.</p>

<h3>Financiación para emprendedores</h3>
<p>Ofrecemos planes especiales de financiación para proyectos de glamping. Podés financiar tus módulos en hasta 60 o 120 cuotas, comenzar a generar ingresos desde el primer mes, y usar esos ingresos para pagar las cuotas. Agendá una videollamada con nuestro equipo para diseñar un plan personalizado para tu proyecto.</p>`,
      publicado: true,
    },
    {
      titulo: '¿Cuánto tarda instalar una piscina de fibra de vidrio?',
      slug: 'tiempo-instalacion-piscina-fibra',
      resumen: 'Guía completa del proceso de instalación de una piscina de fibra de vidrio: tiempos, etapas y lo que necesitás preparar.',
      categoria: 'piscinas',
      contenido: `<h2>¿Cuánto tarda instalar una piscina de fibra de vidrio? Proceso completo</h2>
<p>Una de las preguntas más frecuentes de nuestros clientes es sobre el tiempo que demora la instalación de una piscina de fibra de vidrio. La respuesta corta es: mucho menos de lo que imaginás. En este artículo te explicamos el proceso completo, etapa por etapa.</p>

<h3>Etapa 1: Preparación del terreno (1-2 días)</h3>
<p>Antes de que llegue la piscina, el terreno debe estar preparado. Esto implica la excavación (para modelos que la requieren), el nivelado del suelo, y la preparación de la cama de arena o gravilla sobre la que descansará la piscina. Esta etapa la puede realizar un contratista local o nuestro equipo, según la zona.</p>

<h3>Etapa 2: Entrega y colocación (1 día)</h3>
<p>El día de la instalación, el camión grúa trae la piscina desde nuestra planta en Zárate y la coloca en el pozo preparado. Este proceso, para la mayoría de los modelos, se realiza en pocas horas. La piscina llega completamente terminada desde fábrica, sin necesidad de trabajos de terminación en sitio.</p>

<h3>Etapa 3: Conexiones hidráulicas (1 día)</h3>
<p>Una vez colocada la piscina, se realizan las conexiones hidráulicas: cañerías de entrada y salida de agua, conexión al sistema de filtrado y bomba. Esta etapa requiere un plomero o gasista matriculado, que puede ser provisto por nosotros o contratado localmente.</p>

<h3>Etapa 4: Conexión eléctrica (1 día)</h3>
<p>El sistema de filtrado y la iluminación de la piscina requieren conexión eléctrica profesional. Esta etapa la realiza un electricista matriculado.</p>

<h3>Etapa 5: Llenado y puesta en marcha (1-2 días)</h3>
<p>El llenado de la piscina con agua lleva varias horas según el tamaño del modelo. Una vez llena, se realiza la puesta en marcha del sistema de filtrado, el ajuste de pH y el tratamiento inicial del agua.</p>

<h3>Total: 3 a 5 días hábiles</h3>
<p>En condiciones normales, desde el inicio de la excavación hasta poder usar la piscina, el proceso demora entre 3 y 5 días hábiles. Esto es radicalmente diferente a los 30-60 días que puede tomar una piscina de mampostería. ¿Querés saber más? Consultanos por WhatsApp o agendá una videollamada gratuita.</p>`,
      publicado: true,
    },
  ]

  for (const a of articulos) {
    await prisma.articuloBlog.upsert({
      where: { slug: a.slug },
      update: {},
      create: {
        ...a,
        publicado: true,
      },
    })
  }
  console.log('✅ 6 artículos de blog creados')

  // ─── CONFIG SITIO ───
  const config = [
    { clave: 'hero_titulo',                  valor: 'TU VIVIENDA O PISCINA. SIN BANCO. HASTA 120 CUOTAS.' },
    { clave: 'hero_subtitulo',               valor: 'Fabricación directa. Financiación propia. Todo el país.' },
    { clave: 'empresa_telefono',             valor: '+54 9 11 4449-8854' },
    { clave: 'empresa_email',                valor: 'info@ecomodulosypiscinas.com.ar' },
    { clave: 'empresa_direccion_planta',     valor: 'Zárate, Provincia de Buenos Aires' },
    { clave: 'empresa_direccion_showroom',   valor: 'Av. Paseo Colón 1013, CABA' },
    { clave: 'empresa_instagram',            valor: 'https://instagram.com/ecomodulosypiscinas' },
    { clave: 'flete_precio_km',              valor: '3000' },
    { clave: 'flete_miniportante_km',        valor: '2000' },
    { clave: 'combo_descuento',              valor: '25' },
    { clave: 'precio_lista_multiplicador',   valor: '1.40' },
    { clave: 'horarios',                     valor: 'Lun–Vie 9–18hs · Sáb 9–13hs' },
  ]

  for (const c of config) {
    await prisma.configSitio.upsert({
      where: { clave: c.clave },
      update: {},
      create: c,
    })
  }
  console.log('✅ Configuración inicial cargada')

  console.log('🎉 Seed completado!')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
