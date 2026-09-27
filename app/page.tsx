import { prisma } from '@/lib/db'
import SectionTitle from '@/components/shared/SectionTitle'
import HeroCarousel from '@/components/shared/HeroCarousel'
import HomepageCarousel from '@/components/shared/HomepageCarousel'
import LocationModal from '@/components/shared/LocationModal'
import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, Shield, Truck, Wrench, Award, Star, ArrowRight } from 'lucide-react'
import type { Metadata } from 'next'

export const revalidate = 0

export const metadata: Metadata = {
  title: 'EcoFiver | Viviendas Modulares y Piscinas de Fibra en Argentina',
  description: 'Fabricamos viviendas modulares Wood Frame y piscinas de fibra de vidrio con financiación propia sin banco ni garante. Cooperativa de Trabajo Eco Zárate Limitada · CUIT 30-71807393-2 · Inscripta ante INAES.',
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
    title: 'EcoFiver | Viviendas Modulares y Piscinas de Fibra',
    description: 'Módulos habitacionales Wood Frame y piscinas de fibra con financiación directa sin banco ni garante. Todo el país.',
    url: 'https://ecomodulosypiscinas.com.ar',
    images: [{ url: '/og-image.jpg', width: 1200, height: 630 }],
  },
}

export default async function HomePage() {
  const [obras, testimonios, piscinasDestacadas, modulosDestacados] = await Promise.all([
    prisma.obra.findMany({ where: { activo: true }, take: 6, orderBy: { creadoEn: 'desc' } }),
    prisma.testimonio.findMany({ where: { activo: true }, take: 3, orderBy: { orden: 'asc' } }),
    prisma.piscina.findMany({ where: { activo: true }, orderBy: [{ destacada: 'desc' }, { orden: 'asc' }], take: 6 }),
    prisma.modulo.findMany({ where: { activo: true }, orderBy: { orden: 'asc' }, take: 5 }),
  ])

  const waLink = 'https://wa.me/5491126036495?text=' + encodeURIComponent('Hola, me interesa consultar por módulos y piscinas')

  const piscinas = piscinasDestacadas.map(p => ({
    id: p.id,
    nombre: p.nombre,
    medida: p.medida,
    precio_contado: p.precio_contado != null ? Number(p.precio_contado) : null,
    imagen: p.imagen,
  }))

  const modulos = modulosDestacados.map(m => ({
    id: m.id,
    nombre: m.nombre,
    medida: m.medida,
    precio_contado: m.precio_contado != null ? Number(m.precio_contado) : null,
    imagen: m.imagen,
  }))

  return (
    <>
      <LocationModal />
      <HeroCarousel />

      {/* ═══════════════════════════════════════════
          TRUST BAR
      ════════════════════════════════════════════ */}
      <section className="trust-bar-glass border-b border-eco-border py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[
              'Más de 15 años de trayectoria',
              'Líderes en módulos Wood Frame',
              'Cooperativa INAES',
              'Logística propia · Todo el país',
              'Pagás el día de la instalación, en el domicilio',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-eco-text-muted text-sm py-1">
                <div className="trust-dot-gold flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TIENDA — MODELOS DESTACADOS
      ════════════════════════════════════════════ */}
      <HomepageCarousel piscinas={piscinas} modulos={modulos} />

      {/* ═══════════════════════════════════════════
          CÓMO FUNCIONA
      ════════════════════════════════════════════ */}
      <section className="py-24 bg-eco-bg-surface border-y border-eco-border">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            titulo="Cómo funciona"
            subtitulo="El camino más directo para tener su solución modular o piscina instalada"
          />
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                n: '01',
                titulo: 'Selección del modelo',
                desc: 'Explore nuestro catálogo de módulos y piscinas. Elegí el modelo que mejor se adapta a tu espacio y presupuesto.',
              },
              {
                n: '02',
                titulo: 'Asesoramiento personalizado',
                desc: 'Un especialista del equipo le explica en detalle la financiación, los plazos, el transporte y la instalación. Sin costo.',
              },
              {
                n: '03',
                titulo: 'Instalación en su terreno',
                desc: 'Contado: coordinamos la entrega e instalación de forma inmediata. Financiado: el plazo de fabricación se acuerda al confirmar el pedido.',
              },
            ].map((paso, i) => (
              <div key={paso.n} className="flex gap-5">
                <div className="flex-shrink-0">
                  <span
                    className="text-6xl font-extrabold text-eco-green/12 leading-none tabular-nums"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {paso.n}
                  </span>
                </div>
                <div className="pt-2">
                  <div className="w-6 h-0.5 bg-eco-green mb-3" />
                  <h3
                    className="text-lg font-bold text-eco-text mb-2"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {paso.titulo}
                  </h3>
                  <p className="text-eco-text-muted text-sm leading-relaxed">{paso.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          GALERÍA OBRAS
      ════════════════════════════════════════════ */}
      {obras.length > 0 && (
        <section className="py-24 bg-eco-bg-surface border-y border-eco-border">
          <div className="max-w-7xl mx-auto px-4">
            <SectionTitle titulo="Nuestras obras" subtitulo="Proyectos reales en todo el país" badge="Galería" />
            <div className="mt-12 grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
              {obras.map((obra) => (
                <div
                  key={obra.id}
                  className="relative aspect-video bg-eco-bg rounded-xl overflow-hidden group border border-eco-border"
                >
                  {obra.imagen && (
                    <Image
                      src={obra.imagen}
                      alt={`${obra.titulo} — ${obra.localidad}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                      sizes="(max-width: 768px) 50vw, 33vw"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-eco-green-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                    <div>
                      <p className="text-white font-semibold text-sm">{obra.titulo}</p>
                      <p className="text-white/60 text-xs">{obra.localidad}, {obra.provincia}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link
                href="/obras"
                className="inline-flex items-center gap-2 text-eco-green hover:text-eco-green-light font-semibold transition-colors text-sm"
              >
                Ver galería completa <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          TESTIMONIOS
      ════════════════════════════════════════════ */}
      {testimonios.length > 0 && (
        <section className="py-24 bg-eco-bg">
          <div className="max-w-7xl mx-auto px-4">
            <SectionTitle titulo="Lo que dicen nuestros clientes" badge="Testimonios" />
            <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
              {testimonios.map((t) => (
                <div key={t.id} className="card-premium p-6 flex flex-col gap-4">
                  <div className="flex gap-0.5">
                    {Array.from({ length: t.estrellas }).map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    ))}
                  </div>
                  <p className="text-eco-text text-sm leading-relaxed flex-1">"{t.texto}"</p>
                  <div className="border-t border-eco-border pt-4">
                    <p className="text-eco-text font-semibold text-sm">{t.nombre}</p>
                    <p className="text-eco-text-muted text-xs mt-0.5">{t.localidad} · {t.producto}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════
          POR QUÉ ELEGIRNOS
      ════════════════════════════════════════════ */}
      <section className="py-24 bg-eco-bg-surface border-y border-eco-border">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle titulo="Por qué elegirnos" />
          <div className="mt-14 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Wrench, titulo: 'Fabricación propia', desc: 'Planta de 7.000 m² en Zárate. Controlamos todo el proceso productivo.' },
              { icon: Shield, titulo: 'Financiación directa', desc: 'Sin banco ni garante. Piscinas con cuota fija; módulos y combos hasta 120 cuotas ajustadas por ICC.' },
              { icon: Truck, titulo: 'Instalación inmediata', desc: 'Stock disponible. Módulos y piscinas instalados en el día. Logística propia.' },
              { icon: Award, titulo: 'Respaldo cooperativo', desc: 'Cooperativa INAES · CUIT 30-71807393-2 · Más de 15 años de trayectoria.' },
            ].map(({ icon: Icon, titulo, desc }) => (
              <div key={titulo} className="flex flex-col items-start gap-4">
                <div className="w-11 h-11 rounded-xl bg-eco-green/10 flex items-center justify-center flex-shrink-0">
                  <Icon className="w-5 h-5 text-eco-green" />
                </div>
                <div>
                  <h3
                    className="font-bold text-eco-text mb-1.5"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {titulo}
                  </h3>
                  <p className="text-eco-text-muted text-sm leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CTA FINAL
      ════════════════════════════════════════════ */}
      <section className="py-28 bg-eco-green-dark relative overflow-hidden">
        <div className="absolute inset-0 hero-grid-pattern opacity-50" />
        <div className="light-orb orb-teal absolute" style={{ width: '500px', height: '500px', top: '-100px', left: '-80px', animationDelay: '0s' }} />
        <div className="light-orb orb-gold absolute" style={{ width: '320px', height: '320px', bottom: '-60px', right: '-40px', animationDelay: '2s' }} />
        <div className="relative z-10 max-w-3xl mx-auto px-4 text-center">
          <h2
            className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white mb-5 leading-tight"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            ¿Tiene un proyecto en mente?
          </h2>
          <p className="text-lg text-white/60 mb-10 leading-relaxed">
            Contáctenos sin compromiso. Financiación directa sin banco: piscinas con cuota fija, módulos y combos hasta 120 cuotas ajustadas por ICC.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-white text-eco-green-dark font-bold text-base px-8 py-4 rounded-xl hover:bg-green-50 transition-all shadow-[0_4px_20px_rgba(0,0,0,0.18)] hover:shadow-[0_8px_36px_rgba(0,0,0,0.28)] hover:-translate-y-0.5"
            >
              <MessageCircle className="w-5 h-5" />
              Consultar por WhatsApp
            </a>
            <a
              href="/financiacion"
              className="flex items-center justify-center gap-2 bg-white/8 border border-white/20 hover:bg-white/15 text-white font-bold text-base px-8 py-4 rounded-xl transition-all backdrop-blur-sm hover:-translate-y-0.5"
            >
              Ver financiación
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
