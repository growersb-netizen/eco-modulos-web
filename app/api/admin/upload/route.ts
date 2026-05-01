import { NextResponse } from 'next/server'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/app/api/auth/[...nextauth]/route'
import { uploadImagen } from '@/lib/r2'
import sharp from 'sharp'

const TIPOS_PERMITIDOS = ['image/jpeg', 'image/png', 'image/webp']
const MAX_SIZE = 5 * 1024 * 1024 // 5MB

export async function POST(req: Request) {
  const session = await getServerSession(authOptions)
  if (!session) return NextResponse.json({ error: 'No autorizado' }, { status: 401 })

  if (!process.env.R2_ACCOUNT_ID || !process.env.R2_ACCESS_KEY_ID) {
    return NextResponse.json(
      { error: 'Almacenamiento de imágenes no configurado. Configure las variables R2 en Vercel.' },
      { status: 503 }
    )
  }

  const formData = await req.formData()
  const file = formData.get('file') as File | null
  if (!file) return NextResponse.json({ error: 'No se recibió ningún archivo' }, { status: 400 })

  if (!TIPOS_PERMITIDOS.includes(file.type)) {
    return NextResponse.json({ error: 'Solo JPG, PNG o WebP' }, { status: 400 })
  }

  if (file.size > MAX_SIZE) {
    return NextResponse.json({ error: 'El archivo no puede superar 5MB' }, { status: 400 })
  }

  const buffer = Buffer.from(await file.arrayBuffer())

  // Optimizar con sharp
  const optimizado = await sharp(buffer)
    .resize({ width: 1920, withoutEnlargement: true })
    .jpeg({ quality: 85 })
    .toBuffer()

  const filename = file.name.replace(/[^a-z0-9.-]/gi, '-').toLowerCase()
  const url = await uploadImagen(optimizado, filename, 'image/jpeg')

  return NextResponse.json({ url })
}
