import { config } from 'dotenv'
config({ path: '.env.local' })
import { createClient, type InStatement } from '@libsql/client'
import bcrypt from 'bcryptjs'

const db = createClient({
  url: process.env.TURSO_DATABASE_URL!,
  authToken: process.env.TURSO_AUTH_TOKEN,
})

async function run() {
  console.log('🌱 Seed directo en Turso (modo batch)...')

  const adminEmail = process.env.ADMIN_EMAIL || 'admin@ecomodulosypiscinas.com.ar'
  const adminPassword = process.env.ADMIN_PASSWORD || 'Admin2024Eco!'
  const hash = await bcrypt.hash(adminPassword, 12)
  const now = new Date().toISOString()

  const descModulo = 'Módulo habitacional con sistema constructivo Wood Frame: estructura de madera, revestimiento exterior en placas cementicias y terminación interior en Durlock. Eficiencia térmica y acústica superior. Llave en mano en Obra Blanca.'
  const usosModulo = JSON.stringify(['Vivienda', 'Ampliación', 'Oficina', 'Quincho', 'Glamping', 'Inversión'])
  const descPiscina = 'Piscina de fibra de vidrio de alta resistencia. Resistente a rayos UV, químicos y temperatura. Instalación rápida y limpia.'
  const usosPiscina = JSON.stringify(['Residencial', 'Comercial', 'Glamping', 'Hotel', 'Club'])

  const statements: InStatement[] = [
    // Usuario admin
    { sql: `INSERT OR IGNORE INTO usuarios (id, email, password, nombre, rol, activo, creadoEn) VALUES (?, ?, ?, ?, ?, 1, ?)`,
      args: ['admin-1', adminEmail, hash, 'Administrador', 'admin', now] },

    // Módulos
    ...([
      ['modulo-1',  'Módulo 6 m²',  '6 m²',  2990000,  4140000,  0],
      ['modulo-2',  'Módulo 12 m²', '12 m²', 4980000,  8280000,  1],
      ['modulo-3',  'Módulo 18 m²', '18 m²', 7470000,  12420000, 2],
      ['modulo-4',  'Módulo 24 m²', '24 m²', 9960000,  16560000, 3],
      ['modulo-5',  'Módulo 30 m²', '30 m²', 12450000, 20700000, 4],
      ['modulo-6',  'Módulo 36 m²', '36 m²', 14940000, 24840000, 5],
      ['modulo-7',  'Módulo 42 m²', '42 m²', 17430000, 28980000, 6],
      ['modulo-8',  'Módulo 48 m²', '48 m²', 19920000, 33120000, 7],
      ['modulo-9',  'Módulo 54 m²', '54 m²', 22410000, 37260000, 8],
      ['modulo-10', 'Módulo 60 m²', '60 m²', 24900000, 41400000, 9],
      ['modulo-11', 'Módulo 66 m²', '66 m²', 27390000, 45540000, 10],
      ['modulo-12', 'Módulo 72 m²', '72 m²', 29880000, 49680000, 11],
    ] as [string, string, string, number, number, number][]).map(([id, nombre, medida, pc, pl, orden]) => ({
      sql: `INSERT OR IGNORE INTO modulos (id, nombre, medida, descripcion, usos, precio_contado, precio_lista, activo, orden, actualizadoEn) VALUES (?,?,?,?,?,?,?,1,?,?)`,
      args: [id, nombre, medida, descModulo, usosModulo, pc, pl, orden, now],
    })),

    // Piscinas
    ...([
      ['piscina-1',  'Minideck',                       '3,00×2,00×0,70m',        3000000, 4370000, 0, 0],
      ['piscina-2',  'Miniportante',                   '2,50×2,10×0,70m',        2500000, 3640000, 1, 1],
      ['piscina-3',  'Autoportante',                   '4,10×2,10×0,70m',        3000000, 4370000, 0, 2],
      ['piscina-4',  'Arco Romano Chico Recto',        '4,60×2,47×1,20m',        3000000, 4370000, 0, 3],
      ['piscina-5',  'Arco Romano Chico C/Desnivel',   '4,60×2,35×1,10 a 1,30m', 2990000, 4350000, 0, 4],
      ['piscina-6',  'Arco Romano Mediano Recto',      '6,40×2,94×1,40m',        4900000, 7130000, 0, 5],
      ['piscina-7',  'Arco Romano Mediano C/Desnivel', '7,00×3,35×1,25 a 1,70m', 4900000, 7130000, 0, 6],
      ['piscina-8',  'Arco Romano Grande',             '8,10×3,35×1,25 a 1,80m', 4800000, 6990000, 0, 7],
      ['piscina-9',  'Playa Húmeda',                   '5,20×2,45×1,10 a 1,30m', 3290000, 4790000, 0, 8],
      ['piscina-10', 'Minimalista Chica',              '3,97×2,46×1,20m',        2800000, 4080000, 0, 9],
      ['piscina-11', 'Minimalista Mediana',            '5,50×2,90×1,50m',        4425000, 6440000, 0, 10],
      ['piscina-12', 'Minimalista Grande',             '6,40×3,00×1,40m',        3690000, 5370000, 0, 11],
      ['piscina-13', 'Recta C/Mini Escalera',          '4,63×2,48×1,25m',        3375000, 4910000, 0, 12],
      ['piscina-14', 'Playa Húmeda Chica C/Escalera',  '4,10×2,40×1,20m',        2850000, 4150000, 0, 13],
      ['piscina-15', 'Semi Playa Húmeda C/Escalera',   '6,70×2,95×1,50m',        3990000, 5810000, 0, 14],
      ['piscina-16', 'Playa y Abanico',                '9,20×3,80×1,25 a 1,80m', 5500000, 8000000, 0, 15],
    ] as [string, string, string, number, number, number, number][]).map(([id, nombre, medida, pc, pl, dest, orden]) => ({
      sql: `INSERT OR IGNORE INTO piscinas (id, nombre, medida, descripcion, usos, precio_contado, precio_lista, destacada, activo, orden, actualizadoEn) VALUES (?,?,?,?,?,?,?,?,1,?,?)`,
      args: [id, nombre, medida, descPiscina, usosPiscina, pc, pl, dest, orden, now],
    })),

    // Coeficientes
    ...([[3,1.00,'Hasta 3 cuotas sin interés'],[6,1.00,'Hasta 6 cuotas sin interés'],[12,1.15,'Hasta 12 cuotas'],[18,1.22,'Hasta 18 cuotas'],[24,1.30,'Hasta 24 cuotas'],[36,1.50,'Hasta 36 cuotas'],[48,1.62,'Hasta 48 cuotas'],[60,1.75,'Hasta 60 cuotas'],[72,1.87,'Hasta 72 cuotas'],[84,1.95,'Hasta 84 cuotas'],[96,2.02,'Hasta 96 cuotas'],[108,2.07,'Hasta 108 cuotas'],[120,2.10,'Plan PMI — 120 cuotas']] as [number, number, string][]).map(([c, coef, label]) => ({
      sql: `INSERT OR IGNORE INTO coeficientes_cuota (id, cuotas, coef, label, activo) VALUES (?,?,?,?,1)`,
      args: [`coef-${c}`, c, coef, label],
    })),

    // Testimonios
    { sql: `INSERT OR IGNORE INTO testimonios (id, nombre, localidad, producto, texto, estrellas, activo, orden, creadoEn) VALUES (?,?,?,?,?,5,1,0,?)`,
      args: ['test-1','María González','Pilar, Buenos Aires','Módulo 36 m²','Increíble la calidad y velocidad de instalación. En menos de una semana tenía mi local funcionando.',now] },
    { sql: `INSERT OR IGNORE INTO testimonios (id, nombre, localidad, producto, texto, estrellas, activo, orden, creadoEn) VALUES (?,?,?,?,?,5,1,1,?)`,
      args: ['test-2','Roberto Fernández','Córdoba Capital','Piscina Minimalista Mediana','La piscina superó todas mis expectativas. La fibra se mantiene perfecta después de dos temporadas.',now] },
    { sql: `INSERT OR IGNORE INTO testimonios (id, nombre, localidad, producto, texto, estrellas, activo, orden, creadoEn) VALUES (?,?,?,?,?,5,1,2,?)`,
      args: ['test-3','Laura Martínez','Mendoza','Combo Módulo 48 m² + Piscina','Compramos el combo en un solo plan de financiación. Hoy tenemos nuestro espacio de glamping generando ingresos.',now] },

    // Config
    ...([
      ['hero_titulo','TU VIVIENDA O PISCINA. SIN BANCO. HASTA 120 CUOTAS.'],
      ['hero_subtitulo','Fabricación directa. Financiación propia. Todo el país.'],
      // Precios editables desde el hero de la home
      ['hero_modulos_desde','Desde $2.990.000'],
      ['hero_modulos_cuota','Cuotas desde $28.650/mes'],
      ['hero_piscinas_desde','Desde $2.000.000'],
      ['hero_piscinas_cuota','Cuotas desde $19.200/mes'],
      ['hero_combo_desde','Módulo + Piscina'],
      ['hero_combo_cuota','Hasta 120 cuotas, ajustadas por ICC'],
      ['empresa_telefono','+54 9 11 6873-3406'],
      ['empresa_email','info@ecomodulosypiscinas.com.ar'],
      ['empresa_direccion','Zárate, Provincia de Buenos Aires'],
      ['social_instagram','https://instagram.com/ecomodulosypiscinas'],
      ['combo_descuento','0'],
      ['precio_lista_multiplicador','1.40'],
      ['horarios','Lun–Vie 9–18hs · Sáb 9–13hs'],
    ] as [string, string][]).map(([clave, valor]) => ({
      sql: `INSERT OR IGNORE INTO config_sitio (id, clave, valor) VALUES (?,?,?)`,
      args: [`cfg-${clave}`, clave, valor],
    })),

    // Blog
    { sql: `INSERT OR IGNORE INTO articulos_blog (id, titulo, slug, resumen, contenido, categoria, publicado, creadoEn, actualizadoEn) VALUES (?,?,?,?,?,?,1,?,?)`,
      args: ['blog-1','Casa modular vs ladrillo: comparativa real 2026','casa-modular-vs-ladrillo','Costos, tiempos y calidad de vivienda modular Wood Frame versus ladrillo en Argentina 2026.','<h2>Casa modular vs ladrillo en Argentina</h2><p>Los módulos Wood Frame se instalan en 5-10 días versus 12-24 meses del ladrillo. Financiación directa sin banco, hasta 120 cuotas ajustadas por ICC.','modulos',now,now] },
    { sql: `INSERT OR IGNORE INTO articulos_blog (id, titulo, slug, resumen, contenido, categoria, publicado, creadoEn, actualizadoEn) VALUES (?,?,?,?,?,?,1,?,?)`,
      args: ['blog-2','¿Cuánto cuesta una piscina de fibra en Argentina?','costo-piscina-fibra-argentina','Precios actualizados de piscinas de fibra de vidrio. Modelos, tamaños y financiación.','<h2>Precios de piscinas de fibra en Argentina</h2><p>Desde $2.500.000 la Miniportante hasta $4.900.000 la Arco Romano Mediano. Instalación en 3-5 días.','piscinas',now,now] },
    { sql: `INSERT OR IGNORE INTO articulos_blog (id, titulo, slug, resumen, contenido, categoria, publicado, creadoEn, actualizadoEn) VALUES (?,?,?,?,?,?,1,?,?)`,
      args: ['blog-3','Cómo financiar una vivienda sin crédito bancario','financiar-vivienda-sin-banco','Opciones de financiación directa para vivienda en Argentina sin banco ni garante.','<h2>Financiar tu vivienda sin banco</h2><p>Planes de 3 a 120 cuotas sin banco, sin garante, aprobación simple.','financiacion',now,now] },
  ]

  console.log(`Enviando ${statements.length} inserts en un batch...`)
  await db.batch(statements, 'write')
  console.log('🎉 Seed completado!')
  process.exit(0)
}

run().catch((e) => { console.error(e); process.exit(1) })
