import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { prisma } from '@/lib/db'
import { slugify } from '@/lib/utils'

export async function GET() {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })
  const articulos = await prisma.articuloBlog.findMany({ orderBy: { creadoEn: 'desc' } })
  return NextResponse.json(articulos)
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

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
