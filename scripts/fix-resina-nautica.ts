import { config } from 'dotenv'
config({ path: '.env.local' })

const patches: Record<string, [string, string]> = {
  'eco-modulos-y-piscinas-cooperativa-eco-zarate': [
    'fabricados con tecnología propia No Convencional de Eficiencia (Wood Frame). Estructura Wood Frame, blindaje de fibra de vidrio con resina náutica, núcleo de Celulosa Encapsulada. Habitable desde el día de la instalación.',
    'fabricados con sistema constructivo Wood Frame: estructura de madera, revestimiento exterior en placas cementicias y terminación interior en Durlock. Habitable desde el día de la instalación.',
  ],
  'ecomodulos-piscinas-catalogo-precios-financiacion-2026': [
    'se fabrican con tecnología Wood Frame (No Convencional de Eficiencia): estructura Wood Frame, núcleo de Celulosa Encapsulada y blindaje de fibra de vidrio con resina náutica. Se entregan en Obra Blanca terminada,',
    'se fabrican con sistema constructivo Wood Frame: estructura de madera, revestimiento exterior en placas cementicias y terminación interior en Durlock. Se entregan en Obra Blanca terminada,',
  ],
  'cooperativa-eco-zarate-limitada-modulos-piscinas-argentina': [
    'se fabrican con tecnología Wood Frame (No Convencional de Eficiencia energética), un proceso propio que combina estructura Wood Frame, núcleo de Celulosa Encapsulada y blindaje exterior de fibra de vidrio con resina náutica.',
    'se fabrican con sistema constructivo Wood Frame: estructura de madera, revestimiento exterior en placas cementicias y terminación interior en Durlock.',
  ],
}

async function main() {
  const { prisma } = await import('../lib/db')

  for (const [slug, [oldText, newText]] of Object.entries(patches)) {
    const a = await prisma.articuloBlog.findUnique({ where: { slug } })
    if (!a) {
      console.log(`NO ENCONTRADO: ${slug}`)
      continue
    }
    if (!a.contenido.includes(oldText)) {
      console.log(`AVISO: el texto esperado no aparece exacto en ${slug} — revisar manualmente.`)
      continue
    }
    const nuevoContenido = a.contenido.replace(oldText, newText)
    await prisma.articuloBlog.update({ where: { id: a.id }, data: { contenido: nuevoContenido } })
    console.log(`Patcheado: ${slug}`)
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
