import { NextResponse } from 'next/server'

// Los leads se gestionan exclusivamente en el CRM.
// Este endpoint ya no almacena ni lee leads desde Turso.
export async function GET() {
  return NextResponse.json(
    { error: 'Los leads se gestionan en el CRM. Ver: https://eco-crm-production.up.railway.app' },
    { status: 410 }
  )
}
