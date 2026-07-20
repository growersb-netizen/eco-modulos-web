import { config } from 'dotenv'
config({ path: '.env.local' })

const slugs = [
  'eco-modulos-y-piscinas-cooperativa-eco-zarate',
  'ecomodulos-piscinas-catalogo-precios-financiacion-2026',
  'cooperativa-eco-zarate-limitada-modulos-piscinas-argentina',
]

function rebrand(text: string): string {
  return text.replace(/Eco Módulos y Piscinas/g, 'EcoFiver').replace(/EcoModulos y Piscinas/g, 'EcoFiver')
}

async function main() {
  const { prisma } = await import('../lib/db')

  for (const slug of slugs) {
    const a = await prisma.articuloBlog.findUnique({ where: { slug } })
    if (!a) {
      console.log(`NO ENCONTRADO: ${slug}`)
      continue
    }
    const nuevoTitulo = rebrand(a.titulo)
    const nuevoResumen = a.resumen ? rebrand(a.resumen) : a.resumen
    const nuevoContenido = rebrand(a.contenido)
    await prisma.articuloBlog.update({
      where: { id: a.id },
      data: { titulo: nuevoTitulo, resumen: nuevoResumen, contenido: nuevoContenido },
    })
    console.log(`Patcheado: ${slug} -> titulo: "${nuevoTitulo}"`)
  }
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
