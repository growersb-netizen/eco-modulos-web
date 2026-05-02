/**
 * Seed script — inserta 6 obras de ejemplo en la DB de producción (Turso)
 * Ejecutar con: npx tsx scripts/seed-obras.ts
 * Requiere .env.local con TURSO_DATABASE_URL y TURSO_AUTH_TOKEN
 */

import { config } from 'dotenv'
import { resolve } from 'path'
config({ path: resolve(process.cwd(), '.env.local') })
config() // also load .env as fallback
import { PrismaClient } from '@prisma/client'
import { PrismaLibSql } from '@prisma/adapter-libsql'

function clean(str: string | undefined): string {
  return (str || '').replace(/^﻿/, '').trim()
}

function createPrismaClient() {
  const rawUrl = clean(process.env.TURSO_DATABASE_URL)
  const url = rawUrl.startsWith('libsql://')
    ? rawUrl.replace('libsql://', 'https://')
    : rawUrl
  const adapter = new PrismaLibSql({
    url,
    authToken: clean(process.env.TURSO_AUTH_TOKEN) || undefined,
  })
  return new PrismaClient({ adapter })
}

// Imágenes de Picsum: fotografías arquitectónicas/residenciales de libre uso
// Usar IDs fijos para consistencia: https://picsum.photos/id/NNN/800/600
const OBRAS = [
  {
    titulo: 'Módulo estudio 6×6 m — Living, dormitorio y baño completo',
    localidad: 'Pilar',
    provincia: 'Buenos Aires',
    tipo: 'modulo',
    descripcion: 'Instalación en lote propio. Terminación exterior con chapa prepintada color champagne. Entrega en 21 días desde el pedido.',
    imagen: 'https://picsum.photos/id/164/800/600',
  },
  {
    titulo: 'Piscina Miniportante 3×6 m — instalación sin excavación',
    localidad: 'Tigre',
    provincia: 'Buenos Aires',
    tipo: 'piscina',
    descripcion: 'Modelo Miniportante en color celeste. Instalada en 72 horas sobre superficie plana. Sistema de filtración Pentair incluido.',
    imagen: 'https://picsum.photos/id/318/800/600',
  },
  {
    titulo: 'Combo Módulo 9×6 m + Piscina Estándar 4×8 m',
    localidad: 'Mar del Plata',
    provincia: 'Buenos Aires',
    tipo: 'combo',
    descripcion: 'Proyecto integral: módulo de 54 m² con 2 dormitorios + piscina de fibra de vidrio. Financiación en 60 cuotas fijas.',
    imagen: 'https://picsum.photos/id/28/800/600',
  },
  {
    titulo: 'Módulo dormitorio 3×6 m — ampliación familiar',
    localidad: 'Rosario',
    provincia: 'Santa Fe',
    tipo: 'modulo',
    descripcion: 'Ampliación de vivienda existente. Módulo de 18 m² con baño integrado. Terminación interior en durlock pintado.',
    imagen: 'https://picsum.photos/id/1078/800/600',
  },
  {
    titulo: 'Piscina Recreativa 3×5 m — uso familiar intensivo',
    localidad: 'Mendoza',
    provincia: 'Mendoza',
    tipo: 'piscina',
    descripcion: 'Modelo Recreativa color turquesa. Escalera de acceso lateral. Sistema de calefacción solar opcional agregado por el cliente.',
    imagen: 'https://picsum.photos/id/58/800/600',
  },
  {
    titulo: 'Módulo oficina 6×3 m — espacio de trabajo independiente',
    localidad: 'Córdoba',
    provincia: 'Córdoba',
    tipo: 'modulo',
    descripcion: 'Módulo de 18 m² adaptado para oficina con aislación acústica reforzada. Instalación eléctrica trifásica. Entregado en 15 días.',
    imagen: 'https://picsum.photos/id/106/800/600',
  },
]

async function main() {
  const prisma = createPrismaClient()

  console.log('🌱 Insertando obras de ejemplo...')

  for (const obra of OBRAS) {
    const existing = await prisma.obra.findFirst({
      where: { titulo: obra.titulo },
    })
    if (existing) {
      console.log(`  ⏭ Ya existe: ${obra.titulo}`)
      continue
    }
    await prisma.obra.create({ data: { ...obra, activo: true } })
    console.log(`  ✅ Creada: ${obra.titulo}`)
  }

  console.log('\n✨ Seed de obras completado.')
  await prisma.$disconnect()
}

main().catch((e) => {
  console.error(e)
  process.exit(1)
})
