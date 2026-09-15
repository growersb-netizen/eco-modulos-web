import { NextResponse } from 'next/server'

// La exportación de leads se realiza desde el CRM.
export async function GET() {
  return NextResponse.json(
    { error: 'Los leads se gestionan en el CRM. Ver: https://eco-crm-production.up.railway.app' },
    { status: 410 }
  )
}
