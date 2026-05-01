import type { Metadata } from 'next'
import VideoCallModal from '@/components/shared/VideoCallModal'
import VideoCallPageClient from './VideoCallPageClient'

export const metadata: Metadata = {
  title: 'Videollamada Gratuita | Evaluación de Módulos y Piscinas',
  description: 'Agendá una videollamada gratuita con nuestros asesores. Te asesoramos sobre módulos habitacionales, piscinas de fibra de vidrio o el combo. Sin compromiso.',
  alternates: {
    canonical: 'https://ecomodulosypiscinas.com.ar/videollamada',
  },
  robots: { index: false }, // no indexar la landing de formulario
}

export default function VideollamadaPage() {
  return <VideoCallPageClient />
}
