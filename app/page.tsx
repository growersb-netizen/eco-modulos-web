import { prisma } from '@/lib/db'
import SectionTitle from '@/components/shared/SectionTitle'
import LoanSimulator from '@/components/shared/LoanSimulator'
import VideoCallButton from '@/components/shared/VideoCallButton'
import Link from 'next/link'
import Image from 'next/image'
import { MessageCircle, Shield, Truck, Wrench, Award, CheckCircle, Star, ArrowRight } from 'lucide-react'
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
  const [configs, obras, testimonios] = await Promise.all([
    prisma.configSitio.findMany({
      where: {
        clave: {
          in: [
            'hero_titulo', 'hero_subtitulo',
            'hero_modulos_desde', 'hero_modulos_cuota',
            'hero_piscinas_desde', 'hero_piscinas_cuota',
            'hero_combo_desde', 'hero_combo_cuota',
          ],
        },
      },
    }),
    prisma.obra.findMany({ where: { activo: true }, take: 6, orderBy: { creadoEn: 'desc' } }),
    prisma.testimonio.findMany({ where: { activo: true }, take: 3, orderBy: { orden: 'asc' } }),
  ])

  const cfg: Record<string, string> = {}
  for (const c of configs) cfg[c.clave] = c.valor

  const heroTitulo    = cfg.hero_titulo    || 'VIVIENDAS MODULARES Y PISCINAS. FINANCIACIÓN PROPIA HASTA 120 CUOTAS.'
  const heroSubtitulo = cfg.hero_subtitulo || 'Fabricación industrial propia. Financiación directa. Cobertura en todo el país.'

  const heroModulosDesde  = cfg.hero_modulos_desde  || 'Desde $2.990.000'
  const heroModulosCuota  = cfg.hero_modulos_cuota  || 'Cuotas desde $28.650/mes'
  const heroPiscinasDesde = cfg.hero_piscinas_desde || 'Desde $2.000.000'
  const heroPiscinasCuota = cfg.hero_piscinas_cuota || 'Cuotas desde $19.200/mes'
  const heroComboDesde    = cfg.hero_combo_desde    || 'Módulo + Piscina'
  const heroComboCuota    = cfg.hero_combo_cuota    || 'Hasta 120 cuotas, ajustadas por ICC'

  const waLink = 'https://wa.me/5491168733406?text=' + encodeURIComponent('Hola, me interesa consultar por módulos y piscinas')

  return (
    <>
      {/* ═══════════════════════════════════════════
          HERO — deep forest, premium & architectural
      ════════════════════════════════════════════ */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-eco-green-dark">
        {/* Foto de fondo */}
        <Image src="/hero-home.jpg" alt="Módulo Wood Frame con piscina" fill priority className="object-cover" sizes="100vw" />
        {/* Oscurecido para legibilidad del texto */}
        <div className="absolute inset-0 bg-eco-green-dark/70" />
        {/* Subtle geometric grid overlay */}
        <div className="absolute inset-0 hero-grid-pattern opacity-100" />
        {/* Radial glow — center */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,rgba(11,35,80,0.25),transparent)]" />
        {/* Bottom fade to page bg */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-eco-bg to-transparent" />

        <div className="relative z-10 text-center max-w-5xl mx-auto px-4 pt-28 pb-20 animate-fade-up">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/8 border border-white/15 text-white/70 text-xs font-semibold uppercase tracking-widest px-4 py-2 rounded-full mb-8">
            <CheckCircle className="w-3.5 h-3.5 text-eco-green-light" />
            Cooperativa INAES · Más de 15 años de trayectoria
          </div>

          {/* Headline */}
          <h1
            className="text-5xl sm:text-7xl lg:text-8xl font-extrabold text-white uppercase tracking-tight leading-[0.92] mb-7"
            style={{ fontFamily: 'var(--font-display)' }}
          >
            {heroTitulo}
          </h1>

          <p className="text-lg sm:text-xl text-white/60 mb-10 max-w-2xl mx-auto leading-relaxed">
            {heroSubtitulo}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={waLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 bg-eco-green hover:bg-eco-green-light text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 shadow-[0_4px_20px_rgba(11,35,80,0.4)] hover:shadow-[0_8px_32px_rgba(11,35,80,0.5)]"
            >
              <MessageCircle className="w-5 h-5" />
              Consultar por WhatsApp
            </a>
            <Link
              href="/financiacion"
              className="flex items-center justify-center gap-2 bg-white/8 border border-white/20 hover:bg-white/15 hover:border-white/30 text-white font-bold text-base px-8 py-4 rounded-xl transition-all duration-200 backdrop-blur-sm"
            >
              Ver planes de financiación
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2">
          <div className="w-5 h-8 border border-white/20 rounded-full flex items-start justify-center pt-1.5">
            <div className="w-0.5 h-2 bg-white/40 rounded-full animate-bounce" />
          </div>
        </div>
      </section>

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
          PRODUCTOS
      ════════════════════════════════════════════ */}
      <section className="py-24 bg-eco-bg">
        <div className="max-w-7xl mx-auto px-4">
          <SectionTitle
            titulo="Nuestros productos"
            subtitulo="Producción íntegra en planta propia. Sin intermediarios. Financiación directa."
            badge="Catálogo"
          />
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                titulo: 'Módulos Wood Frame',
                sub: 'Llave en mano · Instalación el mismo día',
                desde: heroModulosDesde,
                cuota: heroModulosCuota,
                href: '/modulos',
                desc: 'Viviendas, quinchos, obradores, campamentos y más. Stock disponible con entrega e instalación inmediata. Logística propia en todo el país.',
              },
              {
                titulo: 'Piscinas de Fibra',
                sub: 'Stock disponible · Instalación en el día',
                desde: heroPiscinasDesde,
                cuota: heroPiscinasCuota,
                href: '/piscinas',
                desc: 'Sin excavación con la Miniportante. Instalación el mismo día. Financiación con cuota fija hasta 36 cuotas.',
              },
              {
                titulo: 'Combo Especial',
                sub: 'Módulo + Piscina',
                desde: heroComboDesde,
                cuota: heroComboCuota,
                href: '/combo',
                desc: 'Combine su módulo con una piscina y financie el valor total en un solo plan, hasta 120 cuotas ajustadas por ICC.',
              },
            ].map((prod) => (
              <Link
                key={prod.href}
                href={prod.href}
                className="card-premium group p-8 flex flex-col gap-5 cursor-pointer"
              >
                <div>
                  <p className="text-eco-text-muted text-[11px] uppercase tracking-widest font-medium mb-1.5">{prod.sub}</p>
                  <h3
                    className="text-2xl font-extrabold text-eco-text"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {prod.titulo}
                  </h3>
                </div>
                <p className="text-eco-text-muted text-sm leading-relaxed flex-1">{prod.desc}</p>
                <div className="border-t border-eco-border pt-4">
                  <p
                    className="text-eco-green text-xl font-extrabold"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {prod.desde}
                  </p>
                  <p className="text-eco-text-muted text-xs mt-0.5">{prod.cuota}</p>
                </div>
                <span className="flex items-center gap-1 text-eco-green text-sm font-semibold group-hover:gap-2 transition-all">
                  Ver catálogo <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            ))}
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
          SIMULADOR
      ════════════════════════════════════════════ */}
      <section className="py-24 bg-eco-bg">
        <div className="max-w-4xl mx-auto px-4">
          <SectionTitle
            titulo="Simule su cuota"
            subtitulo="Sin banco. Sin trámites complejos. Elija el plan que mejor se adapte a su situación."
          />
          <div className="mt-12">
            <LoanSimulator />
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
        <div className="absolute inset-0 hero-grid-pattern opacity-60" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,rgba(11,35,80,0.3),transparent)]" />
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
              className="flex items-center justify-center gap-2 bg-white text-eco-green-dark font-bold text-base px-8 py-4 rounded-xl hover:bg-green-50 transition-colors shadow-[0_4px_20px_rgba(0,0,0,0.15)]"
            >
              <MessageCircle className="w-5 h-5" />
              Consultar por WhatsApp
            </a>
            <VideoCallButton className="flex items-center justify-center gap-2 bg-white/8 border border-white/20 hover:bg-white/15 text-white font-bold text-base px-8 py-4 rounded-xl transition-all backdrop-blur-sm" />
          </div>
        </div>
      </section>
    </>
  )
}
