import { prisma } from '@/lib/db'
import SectionTitle from '@/components/shared/SectionTitle'
import LoanSimulator from '@/components/shared/LoanSimulator'
import VideoCallButton from '@/components/shared/VideoCallButton'
import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, Shield, Truck, Wrench, Award, CheckCircle, Star } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'Eco Módulos & Piscinas | Viviendas Modulares y Piscinas de Fibra en Argentina',
  description: 'Fabricamos viviendas modulares NCE y piscinas de fibra de vidrio con financiación propia hasta 120 cuotas sin banco ni garante. Cooperativa INAES. Planta en Zárate, showroom en Buenos Aires.',
  keywords: [
    'viviendas modulares argentina',
    'casas modulares precio',
    'módulos habitacionales',
    'piscinas fibra de vidrio argentina',
    'piscinas prefabricadas precio',
    'financiación sin banco modulos',
    'eco módulos piscinas',
    'cooperativa viviendas modulares',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar' },
  openGraph: {
    title: 'Eco Módulos & Piscinas | Viviendas Modulares y Piscinas de Fibra',
    description: 'Módulos habitacionales y piscinas de fibra con financiación directa hasta 120 cuotas. Sin banco ni garante. Todo el país.',
    url: 'https://ecomodulosypiscinas.com.ar',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default async function HomePage() {
  const [configs, obras, testimonios] = await Promise.all([
    prisma.configSitio.findMany({ where: { clave: { in: ['hero_titulo', 'hero_subtitulo'] } } }),
    prisma.obra.findMany({ where: { activo: true }, take: 6, orderBy: { creadoEn: 'desc' } }),
    prisma.testimonio.findMany({ where: { activo: true }, take: 3, orderBy: { orden: 'asc' } }),
  ])

  const cfg: Record<string, string> = {}
  for (const c of configs) cfg[c.clave] = c.valor

  const heroTitulo = cfg.hero_titulo || 'SOLUCIONES MODULARES Y PISCINAS. FABRICACIÓN DIRECTA.'
  const heroSubtitulo = cfg.hero_subtitulo || 'Obradores, campamentos, unidades habitacionales y piscinas de fibra. Sin obra civil. Sin banco. Todo el país.'
  const waLink = 'https://wa.me/5491144498854?text=' + encodeURIComponent('Hola, me interesa consultar por módulos y piscinas')

  return (
    <>
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-br from-eco-green-dark via-[#0d1f0d] to-eco-bg">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-eco-bg/40 to-eco-bg" />
        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-24 pb-16">
          <div className="inline-flex items-center gap-2 bg-eco-green/10 border border-eco-green/30 text-eco-green text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-6">
            <CheckCircle className="w-3.5 h-3.5" />
            Cooperativa INAES · +15 años de experiencia
          </div>
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white uppercase tracking-tight leading-none mb-6"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {heroTitulo}
          </h1>
          <p className="text-xl sm:text-2xl text-gray-300 mb-10 max-w-3xl mx-auto">
            {heroSubtitulo}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Consultar por WhatsApp
            </a>
            <Link
              href="/financiacion"
              className="flex items-center justify-center gap-2 border-2 border-white/30 hover:border-eco-green text-white hover:text-eco-green font-bold text-lg px-8 py-4 rounded-xl transition-colors"
            >
              Ver planes de financiación
            </Link>
          </div>
        </div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-white/30 rounded-full flex items-start justify-center pt-2">
            <div className="w-1 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <section className="bg-eco-bg-card border-y border-eco-border py-5">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-6 lg:gap-10">
            {['+15 Años de experiencia', 'Líderes en módulos NCE', 'Cooperativa INAES', 'Logística propia en todo el país', 'Financiación directa hasta 120 cuotas'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-eco-text-muted text-sm">
                <CheckCircle className="w-4 h-4 text-eco-green flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUCTOS */}
      <section className="py-20 max-w-7xl mx-auto px-4">
        <SectionTitle titulo="Nuestros productos" subtitulo="Fabricamos todo en planta propia. Sin intermediarios. Financiación directa." badge="Catálogo" />
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { titulo: 'Módulos NCE', sub: 'Llave en mano · Instalación el mismo día', desde: 'Desde $2.990.000', cuota: 'Cuotas desde $28.650/mes', href: '/modulos', desc: 'Viviendas, quinchos, obradores, campamentos y más. Stock disponible — entrega e instalación inmediata. Logística propia en todo el país.' },
            { titulo: 'Piscinas de Fibra', sub: 'Stock disponible · Instalación en el día', desde: 'Desde $2.000.000', cuota: 'Cuotas desde $19.200/mes', href: '/piscinas', desc: 'Sin excavación con la Miniportante. Instalación el mismo día. Financiación hasta 120 cuotas.' },
            { titulo: 'Combo Especial', sub: '25% de descuento', desde: 'Módulo + Piscina', cuota: '60 cuotas fijas', href: '/combo', desc: 'Combiná tu módulo con una piscina y ahorrá 25% sobre el precio total.', badge: '25% OFF' },
          ].map((prod) => (
            <Link key={prod.href} href={prod.href} className="group bg-eco-bg-card border border-eco-border hover:border-eco-green/40 rounded-2xl p-8 flex flex-col gap-4 transition-all hover:shadow-lg hover:shadow-eco-green/5">
              {prod.badge && <span className="self-start bg-yellow-400/10 text-yellow-400 text-xs font-bold px-2 py-1 rounded-full">{prod.badge}</span>}
              <div>
                <p className="text-eco-text-muted text-xs uppercase tracking-widest mb-1">{prod.sub}</p>
                <h3 className="text-2xl font-extrabold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>{prod.titulo}</h3>
              </div>
              <p className="text-eco-text-muted text-sm flex-1">{prod.desc}</p>
              <div>
                <p className="text-eco-green text-xl font-bold" style={{ fontFamily: 'var(--font-display)' }}>{prod.desde}</p>
                <p className="text-eco-text-muted text-xs">{prod.cuota}</p>
              </div>
              <span className="text-eco-green text-sm font-semibold group-hover:underline">Ver catálogo →</span>
            </Link>
          ))}
        </div>
      </section>

      {/* CÓMO FUNCIONA */}
      <section className="py-20 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle titulo="Cómo funciona" subtitulo="El proceso más directo para tener tu solución modular o piscina instalada" />
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { n: '01', titulo: 'Elegís tu modelo', desc: 'Explorá nuestro catálogo de módulos y piscinas. Simulá tu cuota en segundos sin comprometerte a nada.' },
              { n: '02', titulo: 'Agendamos una videollamada', desc: 'Un asesor del equipo te explica todo: financiación, plazos, transporte e instalación. Sin costo.' },
              { n: '03', titulo: 'Lo instalamos en tu terreno', desc: 'Contado: coordinamos entrega e instalación de inmediato — módulos hasta 18 m² y piscinas se instalan en el día. Financiado: se acuerda el plazo de fabricación al confirmar el pedido.' },
            ].map((paso) => (
              <div key={paso.n} className="flex gap-4">
                <span className="text-5xl font-extrabold text-eco-green/20 leading-none flex-shrink-0" style={{ fontFamily: 'var(--font-display)' }}>{paso.n}</span>
                <div>
                  <h3 className="text-lg font-bold text-eco-text mb-2" style={{ fontFamily: 'var(--font-display)' }}>{paso.titulo}</h3>
                  <p className="text-eco-text-muted text-sm">{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SIMULADOR */}
      <section className="py-20 max-w-4xl mx-auto px-4">
        <SectionTitle titulo="Simulá tu cuota" subtitulo="Sin banco. Sin requisitos imposibles. Elegí el plan que más te conviene." />
        <div className="mt-10"><LoanSimulator /></div>
      </section>

      {/* GALERÍA OBRAS */}
      {obras.length > 0 && (
        <section className="py-20 bg-eco-bg-card border-y border-eco-border">
          <div className="max-w-7xl mx-auto px-4">
            <SectionTitle titulo="Nuestras obras" subtitulo="Proyectos reales en todo el país" badge="Galería" />
            <div className="mt-10 grid grid-cols-2 lg:grid-cols-3 gap-4">
              {obras.map((obra) => (
                <div key={obra.id} className="relative aspect-video bg-eco-bg-surface rounded-xl overflow-hidden group">
                  {obra.imagen && <Image src={obra.imagen} alt={`${obra.titulo} — ${obra.localidad}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="(max-width: 768px) 50vw, 33vw" />}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                    <div>
                      <p className="text-white font-semibold text-sm">{obra.titulo}</p>
                      <p className="text-gray-300 text-xs">{obra.localidad}, {obra.provincia}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link href="/obras" className="text-eco-green hover:text-eco-green-light font-semibold transition-colors">Ver galería completa →</Link>
            </div>
          </div>
        </section>
      )}

      {/* TESTIMONIOS */}
      {testimonios.length > 0 && (
        <section className="py-20 max-w-7xl mx-auto px-4">
          <SectionTitle titulo="Lo que dicen nuestros clientes" badge="Testimonios" />
          <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonios.map((t) => (
              <div key={t.id} className="bg-eco-bg-card border border-eco-border rounded-xl p-6">
                <div className="flex mb-3">{Array.from({ length: t.estrellas }).map((_, i) => <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />)}</div>
                <p className="text-eco-text text-sm leading-relaxed mb-4">"{t.texto}"</p>
                <div>
                  <p className="text-eco-text font-semibold text-sm">{t.nombre}</p>
                  <p className="text-eco-text-muted text-xs">{t.localidad} · {t.producto}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* POR QUÉ ELEGIRNOS */}
      <section className="py-20 bg-eco-bg-card border-y border-eco-border">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle titulo="Por qué elegirnos" />
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Wrench, titulo: 'Fabricación propia', desc: 'Planta de 7.000 m² en Zárate. Controlamos todo el proceso productivo.' },
              { icon: Shield, titulo: 'Financiación directa', desc: 'Sin banco, sin garante. Hasta 120 cuotas con aprobación simple.' },
              { icon: Truck, titulo: 'Instalación inmediata', desc: 'Stock disponible. Módulos hasta 18 m² y piscinas instalados en el día. Logística propia en todo el país.' },
              { icon: Award, titulo: 'Garantía cooperativa', desc: 'Cooperativa INAES con +15 años. Solidez y transparencia garantizadas.' },
            ].map(({ icon: Icon, titulo, desc }) => (
              <div key={titulo} className="flex flex-col items-center text-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-eco-green/10 flex items-center justify-center">
                  <Icon className="w-6 h-6 text-eco-green" />
                </div>
                <h3 className="font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>{titulo}</h3>
                <p className="text-eco-text-muted text-sm">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="py-24 bg-eco-green-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 uppercase" style={{ fontFamily: 'var(--font-display)' }}>
            ¿Listo para empezar?
          </h2>
          <p className="text-gray-300 text-lg mb-10">Consultá ahora por WhatsApp o agendá una videollamada gratuita con nuestro equipo.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a href={waLink} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold text-lg px-8 py-4 rounded-xl transition-colors">
              <MessageCircle className="w-5 h-5" />Consultar por WhatsApp
            </a>
            <VideoCallButton variant="outline" />
          </div>
        </div>
      </section>
    </>
  )
}
