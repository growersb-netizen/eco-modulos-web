import { ExternalLink, Info } from 'lucide-react'

const CRM_URL = 'https://eco-crm-dawn-fog-5476.fly.dev'

export default function AdminLeadsPage() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-eco-text" style={{ fontFamily: 'var(--font-display)' }}>
        Leads
      </h1>

      <div className="bg-eco-bg-card border border-eco-teal/30 rounded-2xl p-8 flex flex-col items-center text-center gap-6 max-w-xl mx-auto">
        <div className="w-16 h-16 rounded-2xl bg-eco-teal/10 flex items-center justify-center">
          <Info className="w-8 h-8 text-eco-teal" />
        </div>
        <div>
          <h2 className="text-xl font-bold text-eco-text mb-2" style={{ fontFamily: 'var(--font-display)' }}>
            Los leads se gestionan en el CRM
          </h2>
          <p className="text-eco-text-muted text-sm leading-relaxed">
            Todos los leads, conversaciones, seguimientos, ventas y cobranzas
            están centralizados en el sistema CRM. Este panel de administración
            gestiona únicamente el contenido del sitio web.
          </p>
        </div>
        <a
          href={CRM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 bg-eco-teal hover:bg-eco-teal-light text-white font-semibold px-8 py-3 rounded-xl transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
          Abrir el CRM
        </a>
        <p className="text-eco-text-muted text-xs">
          {CRM_URL}
        </p>
      </div>
    </div>
  )
}
