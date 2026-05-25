import { NextResponse } from 'next/server'

// Los leads se gestionan exclusivamente en el CRM (eco-crm-dawn-fog-5476.fly.dev).
// Este endpoint ya no almacena ni lee leads desde Turso.
export async function GET() {
  return NextResponse.json(
    { error: 'Los leads se gestionan en el CRM. Ver: https://eco-crm-dawn-fog-5476.fly.dev' },
    { status: 410 }
  )
}
