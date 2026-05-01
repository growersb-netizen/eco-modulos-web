import { NextResponse } from 'next/server'

/**
 * Proxy to eco-multiagente /chat/web
 * Hides the internal Fly.io URL and prevents CORS issues.
 */
export async function POST(req: Request) {
  const agentUrl = process.env.MULTIAGENTE_URL
  if (!agentUrl) {
    return NextResponse.json({ error: 'Servicio de chat no configurado.' }, { status: 503 })
  }

  let body: { session_id?: string; message?: string }
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ error: 'JSON inválido' }, { status: 400 })
  }

  if (!body.message?.trim()) {
    return NextResponse.json({ error: 'Mensaje vacío' }, { status: 400 })
  }

  try {
    const res = await fetch(`${agentUrl}/chat/web`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ session_id: body.session_id, message: body.message }),
      signal: AbortSignal.timeout(30_000), // 30s timeout (AI can be slow)
    })

    if (!res.ok) {
      const text = await res.text()
      console.error('[chat proxy] upstream error', res.status, text)
      return NextResponse.json({ error: 'Error en el servicio de IA.' }, { status: 502 })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (e) {
    console.error('[chat proxy] fetch error', e)
    return NextResponse.json({ error: 'No se pudo conectar al asistente.' }, { status: 503 })
  }
}
