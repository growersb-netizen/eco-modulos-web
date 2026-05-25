import { NextResponse } from 'next/server'

// La exportación de leads se realiza desde el CRM (eco-crm-dawn-fog-5476.fly.dev).
export async function GET() {
  return NextResponse.json(
    { error: 'Los leads se gestionan en el CRM. Ver: https://eco-crm-dawn-fog-5476.fly.dev' },
    { status: 410 }
  )
}
