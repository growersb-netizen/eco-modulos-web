import { prisma } from '@/lib/db'
import type { MetadataRoute } from 'next'

export const dynamic = 'force-dynamic'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'https://ecomodulosypiscinas.com.ar'

  let articulos: { slug: string; actualizadoEn: Date }[] = []
  try {
    articulos = await prisma.articuloBlog.findMany({
      where: { publicado: true },
      select: { slug: true, actualizadoEn: true },
    })
  } catch {
    // If DB is unreachable, return static routes only
  }

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base, lastModified: new Date(), changeFrequency: 'daily', priority: 1 },
    { url: `${base}/modulos`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/piscinas`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${base}/combo`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/financiacion`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${base}/obras`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
    { url: `${base}/nosotros`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${base}/contacto`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${base}/blog`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.7 },
  ]

  const blogRoutes: MetadataRoute.Sitemap = articulos.map((a) => ({
    url: `${base}/blog/${a.slug}`,
    lastModified: a.actualizadoEn,
    changeFrequency: 'monthly',
    priority: 0.6,
  }))

  return [...staticRoutes, ...blogRoutes]
}
