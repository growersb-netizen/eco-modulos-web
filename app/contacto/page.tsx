import SectionTitle from '@/components/shared/SectionTitle'
import ContactForm from '@/components/shared/ContactForm'
import VideoCallButton from '@/components/shared/VideoCallButton'
import { MessageCircle, MapPin, Clock, Phone } from 'lucide-react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Contacto | WhatsApp y Videollamada | Eco Módulos & Piscinas',
  description: 'Contactanos por WhatsApp, email o agendá una videollamada gratuita. Asesores especializados en módulos habitacionales y piscinas de fibra de vidrio. Respondemos en menos de 2 horas.',
  keywords: [
    'contacto eco módulos piscinas',
    'WhatsApp módulos habitacionales',
    'asesoramiento piscinas fibra vidrio',
    'videollamada gratuita módulos',
    'consulta viviendas modulares',
  ],
  alternates: { canonical: 'https://ecomodulosypiscinas.com.ar/contacto' },
  openGraph: {
    title: 'Contacto | Eco Módulos & Piscinas',
    description: 'Escribinos por WhatsApp o agendá una videollamada gratuita con nuestros asesores.',
    url: 'https://ecomodulosypiscinas.com.ar/contacto',
  },
}

const WA_LINKS = [
  {
    icono: '🏠',
    titulo: 'Módulos habitacionales',
    desc: 'Consultas sobre viviendas modulares, medidas, precios y financiación',
    tel: '5491168733406',
    text: 'Hola, quiero consultar por módulos habitacionales',
  },
  {
    icono: '🏊',
    titulo: 'Piscinas de fibra de vidrio',
    desc: 'Modelos, instalación, garantía y planes de financiación de piscinas',
    tel: '5491168733406',
    text: 'Hola, quiero consultar por piscinas de fibra de vidrio',
  },
  {
    icono: '📋',
    titulo: 'Consulta general',
    desc: 'Cualquier consulta, combo módulo + piscina o información general',
    tel: '5491168733406',
    text: 'Hola, quiero consultar sobre Eco Módulos & Piscinas',
  },
]

export default function ContactoPage() {
  return (
    <>
      {/* Hero */}
      <section className="pt-28 pb-12 bg-gradient-to-b from-eco-green-dark to-eco-bg">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <span className="inline-block bg-eco-green/10 text-eco-green text-xs font-semibold uppercase tracking-widest px-3 py-1 rounded-full mb-4">Contacto</span>
          <h1 className="text-5xl sm:text-6xl font-extrabold text-white uppercase mb-4" style={{ fontFamily: 'var(--font-display)' }}>
            Hablemos
          </h1>
          <p className="text-gray-300 text-lg max-w-xl mx-auto">
            Respondemos en menos de 2 horas de lunes a sábado de 9 a 18hs.
          </p>
        </div>
      </section>

      {/* Datos rápidos */}
      <section className="bg-eco-bg-card border-b border-eco-border py-8">
        <div className="max-w-5xl mx-auto px-4 grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-eco-green mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-eco-text font-semibold text-sm">Planta y showroom</p>
              <p className="text-eco-text-muted text-sm">Zárate, Buenos Aires, Argentina</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Clock className="w-5 h-5 text-eco-teal mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-eco-text font-semibold text-sm">Horario de atención</p>
              <p className="text-eco-text-muted text-sm">Lunes a sábado — 9 a 18hs</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <Phone className="w-5 h-5 text-eco-green mt-0.5 flex-shrink-0" />
            <div>
              <p className="text-eco-text font-semibold text-sm">WhatsApp directo</p>
              <p className="text-eco-text-muted text-sm">Respuesta en menos de 2 horas</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contenido principal */}
      <section className="py-16 max-w-6xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Formulario */}
          <div>
            <h2 className="text-2xl font-extrabold text-eco-text mb-2" style={{ fontFamily: 'var(--font-display)' }}>Dejanos tus datos</h2>
            <p className="text-eco-text-muted text-sm mb-6">Te contactamos en menos de 2 horas para darte toda la información que necesitás.</p>
            <ContactForm />
          </div>

          {/* Contacto directo */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-extrabold text-eco-text mb-2" style={{ fontFamily: 'var(--font-display)' }}>O escribinos por WhatsApp</h2>
              <p className="text-eco-text-muted text-sm mb-6">Elegí el tema de tu consulta y te responde un asesor especializado.</p>
              <div className="space-y-4">
                {WA_LINKS.map((v) => (
                  <a
                    key={v.titulo}
                    href={`https://wa.me/${v.tel}?text=${encodeURIComponent(v.text)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-4 bg-eco-bg-card border border-eco-border hover:border-eco-green rounded-xl p-4 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-eco-green/10 flex items-center justify-center flex-shrink-0 text-xl">
                      {v.icono}
                    </div>
                    <div className="flex-1">
                      <p className="text-eco-text font-semibold text-sm">{v.titulo}</p>
                      <p className="text-eco-text-muted text-xs">{v.desc}</p>
                    </div>
                    <MessageCircle className="w-5 h-5 text-eco-green opacity-60 group-hover:opacity-100 transition-opacity flex-shrink-0" />
                  </a>
                ))}
              </div>
            </div>

            {/* Calendly */}
            <div className="bg-eco-bg-card border border-eco-border rounded-xl p-6">
              <h3 className="font-bold text-eco-text mb-2" style={{ fontFamily: 'var(--font-display)' }}>Videollamada gratuita</h3>
              <p className="text-eco-text-muted text-sm mb-4">Agendá 30 minutos con nuestro equipo para ver catálogos, hacer preguntas y obtener una cotización personalizada.</p>
              <VideoCallButton label="Agendar videollamada" />
            </div>

            {/* Mapa embed */}
            <div className="rounded-xl overflow-hidden border border-eco-border">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d52648!2d-59.033!3d-34.1!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bbf97e88e9fb51%3A0x9d1df6f5e5edf2c7!2sZ%C3%A1rate%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1"
                width="100%"
                height="200"
                style={{ border: 0 }}
                allowFullScreen={false}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Ubicación Eco Módulos en Zárate"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
