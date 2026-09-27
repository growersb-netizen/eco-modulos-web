import { prisma } from '@/lib/db'
import SectionTitle from '@/components/shared/SectionTitle'
import HeroCarousel from '@/components/shared/HeroCarousel'
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

  return (
    <>
      <HeroCarousel />

      {/* ═══════════════════════════════════════════
          TRUST BAR
      ════════════════════════════════════════════ */}
      <section className="bg-eco-bg-card border-b border-eco-border py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-2">
            {[
              'Más de 15 años de trayectoria',
              'Líderes en módulos Wood Frame',
              'Cooperativa INAES',
              'Logística propia · Todo el país',
              'Financiación directa · piscinas fijas, módulos por ICC',
            ].map((item) => (
              <div key={item} className="flex items-center gap-2 text-eco-text-muted text-sm py-1">
                <div className="w-1 h-1 rounded-full bg-eco-green flex-shrink-0" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          TIENDA — MODELOS DESTACADOS
      ════════════════════════════════════════════ */}
      <section className="py-10 bg-eco-bg-card border-b border-eco-border">
        <div className="max-w-7xl mx-auto">
          <div className="px-4 flex items-baseline justify-between mb-6">
            <div>
              <p className="text-eco-teal text-xs font-bold uppercase tracking-widest mb-1">Tienda virtual</p>
              <h2 className="text-2xl font-extrabold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>
                Modelos disponibles ahora
              </h2>
            </div>
          </div>

          {/* Piscinas */}
          <div className="mb-8">
            <div className="px-4 flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-eco-text-muted">🏊 Piscinas de fibra</p>
              <Link href="/piscinas" className="text-xs font-semibold text-eco-green hover:underline">Ver todas →</Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-3 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {piscinasDestacadas.map(p => (
                <Link
                  key={p.id}
                  href={`/piscinas/${p.id}`}
                  className="flex-shrink-0 w-44 card-premium overflow-hidden group"
                >
                  <div className="relative h-32 bg-eco-bg-surface overflow-hidden">
                    {p.imagen ? (
                      <Image src={p.imagen} alt={p.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="176px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-eco-text-muted text-xs">Sin imagen</div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-eco-text text-xs leading-tight line-clamp-2">{p.nombre}</p>
                    {p.medida && <p className="text-eco-text-muted text-[11px] mt-0.5">{p.medida}</p>}
                    {p.precio_contado && (
                      <div className="mt-1.5">
                        <p className="text-eco-teal font-extrabold text-sm leading-none">
                          ${Number(p.precio_contado).toLocaleString('es-AR')}
                        </p>
                        <p className="text-eco-text-muted text-[10px] mt-0.5">+ flete según zona</p>
                      </div>
                    )}
                    <span className="mt-2 flex items-center text-[11px] font-semibold text-eco-green gap-1 group-hover:gap-2 transition-all">
                      Reservar <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </Link>
              ))}
              <Link
                href="/piscinas"
                className="flex-shrink-0 w-32 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-eco-border hover:border-eco-green text-eco-text-muted hover:text-eco-green transition-colors p-4"
              >
                <span className="text-xl font-bold">+</span>
                <span className="text-xs font-semibold text-center leading-tight">Ver todos los modelos</span>
              </Link>
            </div>
          </div>

          {/* Módulos */}
          <div>
            <div className="px-4 flex items-center justify-between mb-3">
              <p className="text-xs font-bold uppercase tracking-widest text-eco-text-muted">🏠 Módulos Wood Frame</p>
              <Link href="/modulos" className="text-xs font-semibold text-eco-green hover:underline">Ver todos →</Link>
            </div>
            <div className="flex gap-4 overflow-x-auto pb-3 px-4" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {modulosDestacados.map(m => (
                <Link
                  key={m.id}
                  href={`/modulos/${m.id}`}
                  className="flex-shrink-0 w-44 card-premium overflow-hidden group"
                >
                  <div className="relative h-32 bg-eco-bg-surface overflow-hidden">
                    {m.imagen ? (
                      <Image src={m.imagen} alt={m.nombre} fill className="object-cover group-hover:scale-105 transition-transform duration-500" sizes="176px" />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-eco-text-muted text-xs">Sin imagen</div>
                    )}
                  </div>
                  <div className="p-3">
                    <p className="font-bold text-eco-text text-xs leading-tight line-clamp-2">{m.nombre}</p>
                    {m.medida && <p className="text-eco-text-muted text-[11px] mt-0.5">{m.medida}</p>}
                    {m.precio_contado && (
                      <div className="mt-1.5">
                        <p className="text-eco-teal font-extrabold text-sm leading-none">
                          ${Number(m.precio_contado).toLocaleString('es-AR')}
                        </p>
                        <p className="text-eco-text-muted text-[10px] mt-0.5">+ flete según zona</p>
                      </div>
                    )}
                    <span className="mt-2 flex items-center text-[11px] font-semibold text-eco-green gap-1 group-hover:gap-2 transition-all">
                      Reservar <ArrowRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </Link>
              ))}
              <Link
                href="/modulos"
                className="flex-shrink-0 w-32 flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-eco-border hover:border-eco-green text-eco-text-muted hover:text-eco-green transition-colors p-4"
              >
                <span className="text-xl font-bold">+</span>
                <span className="text-xs font-semibold text-center leading-tight">Ver todos los modelos</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

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
                desc: 'Explore nuestro catálogo de módulos y piscinas. Simule su cuota en segundos sin ningún compromiso.',
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
      <section className="py-28 bg-eco-green-dark">
        <div className="max-w-3xl mx-auto px-4 text-center">
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
              className="flex items-center justify-center gap-2 bg-white text-eco-green-dark font-bold text-base px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              <MessageCircle className="w-5 h-5" />
              Consultar por WhatsApp
            </a>
            <a
              href="/financiacion"
              className="flex items-center justify-center gap-2 bg-white/8 border border-white/20 hover:bg-white/15 text-white font-bold text-base px-8 py-4 rounded-xl transition-all backdrop-blur-sm"
            >
              Ver financiación
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
