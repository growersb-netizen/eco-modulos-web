/**
 * One-off patch: corrige valores ya sembrados en la Turso real que el
 * seed original (upsert con update: {}) no actualiza al re-ejecutarse.
 * - hero_combo_cuota: "60 cuotas fijas" -> "Hasta 120 cuotas, ajustadas por ICC"
 * - combo_descuento: "25" -> "0" (el combo ya no tiene descuento adicional)
 * - testimonio de Laura Martínez: saca la mención a "60 cuotas"
 * - artículo de blog "tecnologia-nce-que-es": reemplazado por contenido real (Wood Frame)
 * - cualquier artículo de blog con menciones a "NCE" en el contenido: reemplazadas por "Wood Frame"
 */
import { config } from 'dotenv'
config({ path: '.env.local' })

const NUEVO_ARTICULO_WOOD_FRAME = {
  titulo: 'Qué es el sistema Wood Frame y por qué importa',
  slug: 'sistema-wood-frame-que-es',
  resumen: 'Explicación detallada del sistema constructivo Wood Frame usado en los módulos habitacionales de EcoFiver.',
  categoria: 'vivienda',
  contenido: `<h2>¿Qué es el sistema Wood Frame y por qué es superior a la construcción convencional?</h2>
<p>Cuando hablamos de Wood Frame, nos referimos al sistema constructivo que utilizamos en EcoFiver para fabricar nuestros módulos habitacionales. En este artículo te explicamos en detalle en qué consiste y por qué representa una evolución respecto a la construcción tradicional.</p>

<h3>El proceso constructivo Wood Frame: 5 etapas</h3>
<p><strong>1. Estructura Wood Frame:</strong> Se utiliza tirante de primera calidad (2×6) que se cepilla y endereza mecánicamente hasta obtener tirantes de 2×2. Estructura liviana y extremadamente resistente, sin perfiles metálicos ni riesgo de corrosión.</p>
<p><strong>2. Ensamble triple:</strong> Los paneles se ensamblan con triple fijación: encolado industrial, pegado químico y atornillado estructural. Esta combinación garantiza la rigidez del módulo tanto durante el transporte como a lo largo de toda su vida útil.</p>
<p><strong>3. Revestimiento exterior en placas cementicias:</strong> La estructura de madera se reviste por fuera con placas cementicias, un material resistente a la intemperie, de bajo mantenimiento y alta durabilidad. Sin madera vista en el exterior.</p>
<p><strong>4. Terminación interior en Durlock:</strong> El interior se termina en Durlock, con instalación eléctrica y sanitaria ejecutada. Base lista para que el cliente personalice a gusto.</p>
<p><strong>5. Obra Blanca:</strong> El módulo se entrega en Obra Blanca: interior fondeado en blanco, piso gris fondeado. Terminación prolija y profesional, habitable desde el primer día. Disponible en estilo minimalista (techo escondido/plano) o americana (techo a dos aguas).</p>

<h3>Montaje en seco: sin obra en el terreno</h3>
<p>Los tabiques salen de nuestra planta de Zárate con todos los anclajes ya incorporados. El armado en sitio no requiere agua, no genera escombros y no depende de obra civil previa. Un equipo especializado instala el módulo completo en el día (modelos hasta 18 m²), con máximo 5 días para viviendas de mayor metraje.</p>

<h3>¿Por qué es más eficiente energéticamente?</h3>
<p>La combinación de estructura de madera con revestimiento en placas cementicias reduce la transferencia de calor entre el interior y el exterior. En la práctica, en verano el módulo permanece más fresco y en invierno retiene el calor por más tiempo — con ahorros energéticos concretos respecto a casas de ladrillo del mismo tamaño.</p>`,
}

async function main() {
  const { prisma } = await import('../lib/db')

  // 1. config_sitio
  const keys = ['hero_combo_cuota', 'combo_descuento']
  const antesConfig = await prisma.configSitio.findMany({ where: { clave: { in: keys } } })
  console.log('ANTES (config_sitio):', antesConfig)

  await prisma.configSitio.updateMany({
    where: { clave: 'hero_combo_cuota' },
    data: { valor: 'Hasta 120 cuotas, ajustadas por ICC' },
  })
  await prisma.configSitio.updateMany({
    where: { clave: 'combo_descuento' },
    data: { valor: '0' },
  })

  const despuesConfig = await prisma.configSitio.findMany({ where: { clave: { in: keys } } })
  console.log('DESPUES (config_sitio):', despuesConfig)

  // 2. testimonios con "60 cuotas"
  const testimonios = await prisma.testimonio.findMany({
    where: { texto: { contains: '60 cuotas' } },
  })
  console.log('Testimonios con "60 cuotas" (ANTES):', testimonios.map((t) => ({ id: t.id, texto: t.texto })))
  for (const t of testimonios) {
    const nuevoTexto = t.texto.replace(/en 60 cuotas/gi, 'en un solo plan de financiación')
    await prisma.testimonio.update({ where: { id: t.id }, data: { texto: nuevoTexto } })
  }

  // 3. artículo "tecnologia-nce-que-es" -> reemplazar por contenido real de Wood Frame
  const articuloNCE = await prisma.articuloBlog.findUnique({ where: { slug: 'tecnologia-nce-que-es' } })
  if (articuloNCE) {
    console.log('Artículo NCE encontrado, reescribiendo:', articuloNCE.id)
    await prisma.articuloBlog.update({
      where: { id: articuloNCE.id },
      data: NUEVO_ARTICULO_WOOD_FRAME,
    })
  } else {
    console.log('No existe artículo con slug "tecnologia-nce-que-es" en la DB (nada que migrar).')
  }

  // 4. cualquier otro artículo con "NCE" en título/resumen/contenido -> reemplazo textual
  const articulosConNCE = await prisma.articuloBlog.findMany({
    where: {
      OR: [
        { titulo: { contains: 'NCE' } },
        { resumen: { contains: 'NCE' } },
        { contenido: { contains: 'NCE' } },
      ],
    },
  })
  console.log(`Artículos restantes con "NCE" en el contenido: ${articulosConNCE.length}`)
  for (const a of articulosConNCE) {
    await prisma.articuloBlog.update({
      where: { id: a.id },
      data: {
        titulo: a.titulo.replace(/NCE/g, 'Wood Frame'),
        resumen: a.resumen ? a.resumen.replace(/NCE/g, 'Wood Frame') : a.resumen,
        contenido: a.contenido.replace(/NCE/g, 'Wood Frame'),
      },
    })
    console.log(`  - patcheado: ${a.slug}`)
  }

  // 5. cualquier artículo con "25% de descuento" o "25% OFF" en el combo -> texto genérico
  const articulosConDescuento = await prisma.articuloBlog.findMany({
    where: { contenido: { contains: '25%' } },
  })
  console.log(`Artículos con "25%" en el contenido: ${articulosConDescuento.length}`)
  for (const a of articulosConDescuento) {
    console.log(`  - revisar manualmente: ${a.slug} (contiene "25%", no reemplazado automáticamente)`)
  }

  // 6. verificación final
  const chequeoFinal = await prisma.articuloBlog.findMany({
    where: {
      OR: [{ contenido: { contains: 'NCE' } }, { contenido: { contains: '60 cuotas' } }],
    },
  })
  console.log(`Chequeo final — artículos con "NCE" o "60 cuotas" restantes: ${chequeoFinal.length}`)
  if (chequeoFinal.length > 0) {
    console.log(chequeoFinal.map((a) => a.slug))
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
