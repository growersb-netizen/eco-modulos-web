import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/db'
import { z } from 'zod'

const CRM_URL = process.env.CRM_API_URL
const CRM_KEY = process.env.CRM_API_KEY

const schema = z.object({
  productoTipo:     z.enum(['PISCINA', 'MODULO']),
  productoId:       z.string().min(1),
  productoNombre:   z.string().min(1),
  productoMedida:   z.string().min(1),
  precioContado:    z.number().int().positive(),
  precioLista:      z.number().int().positive(),

  clienteNombre:    z.string().min(2),
  clienteTelefono:  z.string().min(7),
  clienteEmail:     z.string().email(),
  clienteDni:       z.string().min(6),

  calle:            z.string().min(3),
  pisoDpto:         z.string().optional(),
  localidad:        z.string().min(2),
  partido:          z.string().min(2),
  codigoPostal:     z.string().min(4),

  fechaInstalacion: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  formaPago:        z.enum(['efectivo', 'transferencia', 'consultar_financiacion']),
  notas:            z.string().optional(),

  dejaSeña:         z.boolean().default(false),
})

async function syncCRM(data: z.infer<typeof schema>, pedidoId: string) {
  if (!CRM_URL || !CRM_KEY) return
  const formaPagoLabel: Record<string, string> = {
    efectivo:                 'Efectivo en domicilio',
    transferencia:            'Transferencia bancaria',
    consultar_financiacion:   'Consultar financiación',
  }
  try {
    await fetch(`${CRM_URL}/api/leads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', 'X-Api-Key': CRM_KEY },
      body: JSON.stringify({
        nombre:              data.clienteNombre,
        telefono:            data.clienteTelefono,
        email:               data.clienteEmail,
        dni_cliente:         data.clienteDni,
        localidad:           data.localidad,
        partido:             data.partido,
        codigo_postal:       data.codigoPostal,
        direccion:           `${data.calle}${data.pisoDpto ? ' ' + data.pisoDpto : ''}`,
        producto_interes:    data.productoTipo,
        modelo_especifico:   data.productoNombre,
        forma_pago:          formaPagoLabel[data.formaPago] || data.formaPago,
        precio_contado:      data.precioContado,
        fecha_instalacion:   data.fechaInstalacion,
        notas:               data.notas || '',
        origen:              'PEDIDO_WEB',
        estado:              'NUEVO',
        pedido_web_id:       pedidoId,
        deja_seña:           data.dejaSeña,
      }),
    })
  } catch (e) {
    console.error('[pedidos] CRM sync error:', e)
  }
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json()
    const data = schema.parse(raw)

    const pedido = await prisma.pedido.create({
      data: {
        productoTipo:     data.productoTipo,
        productoId:       data.productoId,
        productoNombre:   data.productoNombre,
        productoMedida:   data.productoMedida,
        precioContado:    data.precioContado,
        precioLista:      data.precioLista,
        clienteNombre:    data.clienteNombre,
        clienteTelefono:  data.clienteTelefono,
        clienteEmail:     data.clienteEmail,
        clienteDni:       data.clienteDni,
        calle:            data.calle,
        pisoDpto:         data.pisoDpto,
        localidad:        data.localidad,
        partido:          data.partido,
        codigoPostal:     data.codigoPostal,
        fechaInstalacion: new Date(data.fechaInstalacion),
        formaPago:        data.formaPago,
        notas:            data.notas,
        dejaSeña:         data.dejaSeña,
      },
    })

    // Fire-and-forget CRM sync (includes WA notification via CRM)
    syncCRM(data, pedido.id)

    return NextResponse.json({ ok: true, id: pedido.id })
  } catch (e: unknown) {
    console.error('[pedidos] error:', e)
    const msg = e instanceof Error ? e.message : 'Error al procesar el pedido'
    return NextResponse.json({ error: msg }, { status: 400 })
  }
}
