import { NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { isAdminAuth } from '@/lib/admin-auth'
import { slugify } from '@/lib/utils'

export async function GET() {
  if (!await isAdminAuth()) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const articulos = await prisma.articuloBlog.findMany({ orderBy: { creadoEn: 'desc' } })
  return NextResponse.json(articulos)
}

export async function POST(req: Request) {
  if (!await isAdminAuth(req)) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  const body = await req.json()
  const slug = body.slug || slugify(body.titulo)

  const articulo = await prisma.articuloBlog.create({
    data: {
      titulo: body.titulo,
      slug,
      resumen: body.resumen || body.descripcion || null,
      contenido: body.contenido || '',
      imagen: body.imagen || null,
      categoria: body.categoria || 'general',
      publicado: body.publicado === true,
    },
  })
  return NextResponse.json(articulo)
}
