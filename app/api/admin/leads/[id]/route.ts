import { NextResponse } from 'next/server'

// Los leads se gestionan exclusivamente en el CRM.
export async function PUT() {
  return NextResponse.json(
    { error: 'Los leads se gestionan en el CRM. Ver: https://eco-crm-production.up.railway.app' },
    { status: 410 }
  )
}
