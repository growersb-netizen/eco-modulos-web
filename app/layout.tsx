import type { Metadata } from 'next'
import { Barlow_Condensed, Inter } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import WhatsAppFAB from '@/components/layout/WhatsAppFAB'
import Providers from '@/components/Providers'
import Script from 'next/script'

const barlowCondensed = Barlow_Condensed({
  weight: ['600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

const inter = Inter({
  weight: ['400', '500'],
  subsets: ['latin'],
  variable: '--font-body',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(
    (process.env.NEXT_PUBLIC_SITE_URL || 'https://ecomodulosypiscinas.com.ar').replace(/^﻿/, '')
  ),
  title: {
    default: 'Eco Módulos & Piscinas | Viviendas Modulares y Piscinas de Fibra en Argentina',
    template: '%s | Eco Módulos & Piscinas',
  },
  description:
    'Fabricamos viviendas modulares (tecnología NCE) y piscinas de fibra de vidrio. Financiación directa hasta 120 cuotas sin banco. Planta en Zárate, showroom en CABA. Cooperativa INAES con +15 años.',
  keywords: [
    'viviendas modulares',
    'piscinas fibra de vidrio',
    'casas modulares argentina',
    'financiacion sin banco',
    'modulos habitacionales',
    'piscinas argentina',
    'eco modulos',
    'NCE tecnologia',
    'cooperativa INAES',
  ],
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    url: 'https://ecomodulosypiscinas.com.ar',
    siteName: 'Eco Módulos & Piscinas',
    title: 'Eco Módulos & Piscinas | Viviendas Modulares y Piscinas de Fibra',
    description:
      'Fabricamos viviendas modulares y piscinas de fibra de vidrio con financiación directa hasta 120 cuotas sin banco.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Eco Módulos & Piscinas',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Eco Módulos & Piscinas',
    description: 'Viviendas modulares y piscinas de fibra. Hasta 120 cuotas sin banco.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  '@id': 'https://ecomodulosypiscinas.com.ar/#business',
  name: 'Eco Módulos & Piscinas',
  alternateName: 'Eco Modulos Piscinas',
  description:
    'Fabricante directo de viviendas modulares (tecnología NCE) y piscinas de fibra de vidrio con financiación propia hasta 120 cuotas sin banco. Cooperativa de trabajo INAES con más de 15 años de trayectoria.',
  url: 'https://ecomodulosypiscinas.com.ar',
  telephone: '+54-9-11-4449-8854',
  email: 'info@ecomodulosypiscinas.com.ar',
  priceRange: '$$',
  currenciesAccepted: 'ARS',
  paymentAccepted: 'Cash, Bank Transfer, Financing',
  areaServed: { '@type': 'Country', name: 'Argentina' },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Av. Paseo Colón 1013',
    addressLocality: 'Buenos Aires',
    addressRegion: 'CABA',
    postalCode: 'C1063',
    addressCountry: 'AR',
  },
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -34.6176,
    longitude: -58.3756,
  },
  hasMap: 'https://maps.google.com/?q=-34.6176,-58.3756',
  openingHoursSpecification: [
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
      opens: '09:00',
      closes: '18:00',
    },
    {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: ['Saturday'],
      opens: '09:00',
      closes: '13:00',
    },
  ],
  sameAs: ['https://instagram.com/ecomodulosypiscinas'],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Módulos habitacionales y piscinas de fibra',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Módulos Habitacionales NCE',
          description: 'Viviendas modulares prefabricadas de 6 a 72 m² con tecnología NCE',
          url: 'https://ecomodulosypiscinas.com.ar/modulos',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Product',
          name: 'Piscinas de Fibra de Vidrio',
          description: '16 modelos de piscinas de fibra de vidrio, desde 2x3m hasta 4x8m',
          url: 'https://ecomodulosypiscinas.com.ar/piscinas',
        },
      },
    ],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gaId = process.env.NEXT_PUBLIC_GA_ID
  const pixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID

  return (
    <html
      lang="es-AR"
      className={`${barlowCondensed.variable} ${inter.variable}`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="min-h-screen flex flex-col bg-eco-bg text-eco-text">
        {gaId && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
              strategy="afterInteractive"
            />
            <Script id="ga4" strategy="afterInteractive">
              {`window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${gaId}');`}
            </Script>
          </>
        )}
        {pixelId && (
          <Script id="meta-pixel" strategy="afterInteractive">
            {`!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${pixelId}');fbq('track','PageView');`}
          </Script>
        )}
        <Providers>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
          <WhatsAppFAB />
        </Providers>
      </body>
    </html>
  )
}
