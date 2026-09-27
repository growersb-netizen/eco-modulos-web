export interface Ciudad {
  nombre: string
  provincia: string
  km: number
}

export const CIUDADES: Ciudad[] = [
  // ── Fábrica / Sede ──────────────────────────────────────────────
  { nombre: 'Zárate', provincia: 'Buenos Aires', km: 0 },

  // ── Zona inmediata ──────────────────────────────────────────────
  { nombre: 'Campana', provincia: 'Buenos Aires', km: 25 },
  { nombre: 'Lima', provincia: 'Buenos Aires', km: 30 },
  { nombre: 'Capilla del Señor', provincia: 'Buenos Aires', km: 40 },
  { nombre: 'Exaltación de la Cruz', provincia: 'Buenos Aires', km: 45 },
  { nombre: 'Baradero', provincia: 'Buenos Aires', km: 55 },
  { nombre: 'San Pedro', provincia: 'Buenos Aires', km: 60 },
  { nombre: 'Garín', provincia: 'Buenos Aires', km: 52 },
  { nombre: 'Belén de Escobar', provincia: 'Buenos Aires', km: 52 },
  { nombre: 'Escobar', provincia: 'Buenos Aires', km: 54 },
  { nombre: 'Ingeniero Maschwitz', provincia: 'Buenos Aires', km: 58 },
  { nombre: 'Pilar', provincia: 'Buenos Aires', km: 70 },
  { nombre: 'Del Viso', provincia: 'Buenos Aires', km: 72 },
  { nombre: 'Benavídez', provincia: 'Buenos Aires', km: 65 },

  // ── AMBA Norte ──────────────────────────────────────────────────
  { nombre: 'Don Torcuato', provincia: 'Buenos Aires', km: 78 },
  { nombre: 'Nordelta', provincia: 'Buenos Aires', km: 72 },
  { nombre: 'Tigre', provincia: 'Buenos Aires', km: 75 },
  { nombre: 'El Talar', provincia: 'Buenos Aires', km: 70 },
  { nombre: 'General Pacheco', provincia: 'Buenos Aires', km: 73 },
  { nombre: 'Tortuguitas', provincia: 'Buenos Aires', km: 65 },
  { nombre: 'Grand Bourg', provincia: 'Buenos Aires', km: 72 },
  { nombre: 'Los Polvorines', provincia: 'Buenos Aires', km: 78 },
  { nombre: 'Malvinas Argentinas', provincia: 'Buenos Aires', km: 80 },
  { nombre: 'José C. Paz', provincia: 'Buenos Aires', km: 80 },
  { nombre: 'San Miguel', provincia: 'Buenos Aires', km: 83 },
  { nombre: 'San Fernando', provincia: 'Buenos Aires', km: 70 },
  { nombre: 'San Isidro', provincia: 'Buenos Aires', km: 82 },
  { nombre: 'Vicente López', provincia: 'Buenos Aires', km: 88 },
  { nombre: 'Olivos', provincia: 'Buenos Aires', km: 90 },
  { nombre: 'Florida', provincia: 'Buenos Aires', km: 88 },
  { nombre: 'Munro', provincia: 'Buenos Aires', km: 88 },
  { nombre: 'Villa Martelli', provincia: 'Buenos Aires', km: 89 },

  // ── CABA ─────────────────────────────────────────────────────────
  { nombre: 'Ciudad de Buenos Aires', provincia: 'CABA', km: 95 },

  // ── AMBA Oeste ──────────────────────────────────────────────────
  { nombre: 'General Rodríguez', provincia: 'Buenos Aires', km: 95 },
  { nombre: 'Tres de Febrero', provincia: 'Buenos Aires', km: 95 },
  { nombre: 'Ciudadela', provincia: 'Buenos Aires', km: 97 },
  { nombre: 'El Palomar', provincia: 'Buenos Aires', km: 100 },
  { nombre: 'Ramos Mejía', provincia: 'Buenos Aires', km: 100 },
  { nombre: 'San Martín', provincia: 'Buenos Aires', km: 100 },
  { nombre: 'Villa del Parque', provincia: 'Buenos Aires', km: 100 },
  { nombre: 'Hurlingham', provincia: 'Buenos Aires', km: 100 },
  { nombre: 'Haedo', provincia: 'Buenos Aires', km: 103 },
  { nombre: 'Morón', provincia: 'Buenos Aires', km: 105 },
  { nombre: 'Castelar', provincia: 'Buenos Aires', km: 108 },
  { nombre: 'Ituzaingó', provincia: 'Buenos Aires', km: 106 },
  { nombre: 'Lomas del Mirador', provincia: 'Buenos Aires', km: 103 },
  { nombre: 'Merlo', provincia: 'Buenos Aires', km: 115 },
  { nombre: 'Paso del Rey', provincia: 'Buenos Aires', km: 118 },
  { nombre: 'Moreno', provincia: 'Buenos Aires', km: 118 },
  { nombre: 'La Reja', provincia: 'Buenos Aires', km: 120 },
  { nombre: 'Francisco Álvarez', provincia: 'Buenos Aires', km: 122 },
  { nombre: 'Cuartel V', provincia: 'Buenos Aires', km: 125 },
  { nombre: 'Marcos Paz', provincia: 'Buenos Aires', km: 130 },
  { nombre: 'Luján', provincia: 'Buenos Aires', km: 148 },
  { nombre: 'Las Heras', provincia: 'Buenos Aires', km: 160 },
  { nombre: 'Suipacha', provincia: 'Buenos Aires', km: 175 },
  { nombre: 'Mercedes', provincia: 'Buenos Aires', km: 185 },
  { nombre: 'Navarro', provincia: 'Buenos Aires', km: 185 },
  { nombre: 'Alberti', provincia: 'Buenos Aires', km: 200 },
  { nombre: 'Chivilcoy', provincia: 'Buenos Aires', km: 225 },

  // ── AMBA Sur ─────────────────────────────────────────────────────
  { nombre: 'La Matanza', provincia: 'Buenos Aires', km: 108 },
  { nombre: 'Avellaneda', provincia: 'Buenos Aires', km: 105 },
  { nombre: 'Lanús', provincia: 'Buenos Aires', km: 110 },
  { nombre: 'Temperley', provincia: 'Buenos Aires', km: 110 },
  { nombre: 'Isidro Casanova', provincia: 'Buenos Aires', km: 110 },
  { nombre: 'González Catán', provincia: 'Buenos Aires', km: 112 },
  { nombre: 'Almirante Brown', provincia: 'Buenos Aires', km: 112 },
  { nombre: 'Adrogué', provincia: 'Buenos Aires', km: 112 },
  { nombre: 'Lomas de Zamora', provincia: 'Buenos Aires', km: 115 },
  { nombre: 'Quilmes', provincia: 'Buenos Aires', km: 118 },
  { nombre: 'Burzaco', provincia: 'Buenos Aires', km: 118 },
  { nombre: 'Rafael Calzada', provincia: 'Buenos Aires', km: 118 },
  { nombre: 'Gregorio de Laferrere', provincia: 'Buenos Aires', km: 110 },
  { nombre: 'Virrey del Pino', provincia: 'Buenos Aires', km: 125 },
  { nombre: 'Ezeiza', provincia: 'Buenos Aires', km: 120 },
  { nombre: 'Monte Grande', provincia: 'Buenos Aires', km: 120 },
  { nombre: 'El Jagüel', provincia: 'Buenos Aires', km: 122 },
  { nombre: 'Claypole', provincia: 'Buenos Aires', km: 122 },
  { nombre: 'Berazategui', provincia: 'Buenos Aires', km: 125 },
  { nombre: 'Longchamps', provincia: 'Buenos Aires', km: 125 },
  { nombre: 'Glew', provincia: 'Buenos Aires', km: 128 },
  { nombre: 'Tristán Suárez', provincia: 'Buenos Aires', km: 132 },
  { nombre: 'Florencio Varela', provincia: 'Buenos Aires', km: 132 },
  { nombre: 'Presidente Perón', provincia: 'Buenos Aires', km: 138 },
  { nombre: 'San Vicente', provincia: 'Buenos Aires', km: 140 },
  { nombre: 'La Plata', provincia: 'Buenos Aires', km: 145 },
  { nombre: 'Berisso', provincia: 'Buenos Aires', km: 148 },
  { nombre: 'Ensenada', provincia: 'Buenos Aires', km: 150 },
  { nombre: 'Cañuelas', provincia: 'Buenos Aires', km: 155 },
  { nombre: 'Chascomús', provincia: 'Buenos Aires', km: 180 },
  { nombre: 'General Belgrano', provincia: 'Buenos Aires', km: 210 },

  // ── Interior Norte / Arco del río ────────────────────────────────
  { nombre: 'Ramallo', provincia: 'Buenos Aires', km: 130 },
  { nombre: 'San Nicolás', provincia: 'Buenos Aires', km: 155 },
  { nombre: 'Villa Constitución', provincia: 'Buenos Aires', km: 175 },
  { nombre: 'Arrecifes', provincia: 'Buenos Aires', km: 100 },
  { nombre: 'Salto', provincia: 'Buenos Aires', km: 120 },
  { nombre: 'Carmen de Areco', provincia: 'Buenos Aires', km: 140 },
  { nombre: 'Chacabuco', provincia: 'Buenos Aires', km: 220 },
  { nombre: 'Rojas', provincia: 'Buenos Aires', km: 195 },
  { nombre: 'Pergamino', provincia: 'Buenos Aires', km: 185 },
  { nombre: 'Colón', provincia: 'Buenos Aires', km: 210 },

  // ── Interior Oeste ───────────────────────────────────────────────
  { nombre: 'Junín', provincia: 'Buenos Aires', km: 260 },
  { nombre: 'Leandro N. Alem', provincia: 'Buenos Aires', km: 285 },
  { nombre: 'Los Toldos', provincia: 'Buenos Aires', km: 290 },
  { nombre: 'General Viamonte', provincia: 'Buenos Aires', km: 300 },
  { nombre: 'Bragado', provincia: 'Buenos Aires', km: 280 },
  { nombre: '9 de Julio', provincia: 'Buenos Aires', km: 315 },
  { nombre: 'Lincoln', provincia: 'Buenos Aires', km: 330 },
  { nombre: 'General Pinto', provincia: 'Buenos Aires', km: 350 },
  { nombre: 'Carlos Casares', provincia: 'Buenos Aires', km: 390 },
  { nombre: 'Henderson', provincia: 'Buenos Aires', km: 430 },
  { nombre: 'Rivadavia', provincia: 'Buenos Aires', km: 400 },
  { nombre: 'General Villegas', provincia: 'Buenos Aires', km: 450 },
  { nombre: 'Pehuajó', provincia: 'Buenos Aires', km: 390 },
  { nombre: 'Trenque Lauquen', provincia: 'Buenos Aires', km: 460 },
  { nombre: 'Salliqueló', provincia: 'Buenos Aires', km: 490 },
  { nombre: 'Guaminí', provincia: 'Buenos Aires', km: 510 },
  { nombre: 'Adolfo Alsina', provincia: 'Buenos Aires', km: 570 },

  // ── Interior Centro ──────────────────────────────────────────────
  { nombre: 'Roque Pérez', provincia: 'Buenos Aires', km: 200 },
  { nombre: 'Saladillo', provincia: 'Buenos Aires', km: 220 },
  { nombre: '25 de Mayo', provincia: 'Buenos Aires', km: 220 },
  { nombre: 'General Alvear', provincia: 'Buenos Aires', km: 230 },
  { nombre: 'Tapalqué', provincia: 'Buenos Aires', km: 310 },
  { nombre: 'Azul', provincia: 'Buenos Aires', km: 320 },
  { nombre: 'Olavarría', provincia: 'Buenos Aires', km: 350 },
  { nombre: 'Bolívar', provincia: 'Buenos Aires', km: 360 },
  { nombre: 'General La Madrid', provincia: 'Buenos Aires', km: 450 },
  { nombre: 'Laprida', provincia: 'Buenos Aires', km: 450 },
  { nombre: 'Benito Juárez', provincia: 'Buenos Aires', km: 420 },

  // ── Interior Sur ─────────────────────────────────────────────────
  { nombre: 'Dolores', provincia: 'Buenos Aires', km: 240 },
  { nombre: 'Pila', provincia: 'Buenos Aires', km: 260 },
  { nombre: 'General Madariaga', provincia: 'Buenos Aires', km: 280 },
  { nombre: 'Maipú', provincia: 'Buenos Aires', km: 300 },
  { nombre: 'Rauch', provincia: 'Buenos Aires', km: 280 },
  { nombre: 'Ayacucho', provincia: 'Buenos Aires', km: 310 },
  { nombre: 'Tandil', provincia: 'Buenos Aires', km: 365 },
  { nombre: 'Balcarce', provincia: 'Buenos Aires', km: 380 },
  { nombre: 'Lobería', provincia: 'Buenos Aires', km: 390 },
  { nombre: 'San Manuel', provincia: 'Buenos Aires', km: 360 },
  { nombre: 'General Pueyrredón', provincia: 'Buenos Aires', km: 400 },

  // ── Costa Atlántica ──────────────────────────────────────────────
  { nombre: 'San Clemente del Tuyú', provincia: 'Buenos Aires', km: 260 },
  { nombre: 'Las Toninas', provincia: 'Buenos Aires', km: 250 },
  { nombre: 'Mar del Tuyú', provincia: 'Buenos Aires', km: 248 },
  { nombre: 'Santa Teresita', provincia: 'Buenos Aires', km: 252 },
  { nombre: 'San Bernardo del Tuyú', provincia: 'Buenos Aires', km: 255 },
  { nombre: 'La Lucila del Mar', provincia: 'Buenos Aires', km: 270 },
  { nombre: 'Aguas Verdes', provincia: 'Buenos Aires', km: 275 },
  { nombre: 'Pinamar', provincia: 'Buenos Aires', km: 310 },
  { nombre: 'Ostende', provincia: 'Buenos Aires', km: 312 },
  { nombre: 'Valeria del Mar', provincia: 'Buenos Aires', km: 315 },
  { nombre: 'Cariló', provincia: 'Buenos Aires', km: 316 },
  { nombre: 'Villa Gesell', provincia: 'Buenos Aires', km: 330 },
  { nombre: 'Mar de las Pampas', provincia: 'Buenos Aires', km: 328 },
  { nombre: 'Mar Azul', provincia: 'Buenos Aires', km: 332 },
  { nombre: 'Mar del Plata', provincia: 'Buenos Aires', km: 400 },
  { nombre: 'Miramar', provincia: 'Buenos Aires', km: 430 },
  { nombre: 'Necochea', provincia: 'Buenos Aires', km: 455 },
  { nombre: 'Quequén', provincia: 'Buenos Aires', km: 456 },

  // ── Sur e Interior Sur ───────────────────────────────────────────
  { nombre: 'Tres Arroyos', provincia: 'Buenos Aires', km: 500 },
  { nombre: 'González Chaves', provincia: 'Buenos Aires', km: 530 },
  { nombre: 'Coronel Suárez', provincia: 'Buenos Aires', km: 575 },
  { nombre: 'Pigüé', provincia: 'Buenos Aires', km: 600 },
  { nombre: 'Saavedra', provincia: 'Buenos Aires', km: 590 },
  { nombre: 'Coronel Dorrego', provincia: 'Buenos Aires', km: 555 },
  { nombre: 'Punta Alta', provincia: 'Buenos Aires', km: 680 },
  { nombre: 'Bahía Blanca', provincia: 'Buenos Aires', km: 670 },
  { nombre: 'Monte Hermoso', provincia: 'Buenos Aires', km: 700 },
  { nombre: 'Cnel. Rosales', provincia: 'Buenos Aires', km: 682 },
  // Santa Fe
  { nombre: 'San Lorenzo', provincia: 'Santa Fe', km: 330 },
  { nombre: 'Rosario', provincia: 'Santa Fe', km: 320 },
  { nombre: 'Venado Tuerto', provincia: 'Santa Fe', km: 430 },
  { nombre: 'Rafaela', provincia: 'Santa Fe', km: 550 },
  { nombre: 'Santa Fe', provincia: 'Santa Fe', km: 470 },
  { nombre: 'Esperanza', provincia: 'Santa Fe', km: 490 },
  { nombre: 'Reconquista', provincia: 'Santa Fe', km: 660 },
  // Córdoba
  { nombre: 'Villa María', provincia: 'Córdoba', km: 595 },
  { nombre: 'Río Cuarto', provincia: 'Córdoba', km: 720 },
  { nombre: 'San Francisco', provincia: 'Córdoba', km: 625 },
  { nombre: 'Alta Gracia', provincia: 'Córdoba', km: 765 },
  { nombre: 'Carlos Paz', provincia: 'Córdoba', km: 745 },
  { nombre: 'Córdoba', provincia: 'Córdoba', km: 730 },
  // Entre Ríos
  { nombre: 'Gualeguaychú', provincia: 'Entre Ríos', km: 245 },
  { nombre: 'Gualeguay', provincia: 'Entre Ríos', km: 305 },
  { nombre: 'Villaguay', provincia: 'Entre Ríos', km: 365 },
  { nombre: 'Concordia', provincia: 'Entre Ríos', km: 425 },
  { nombre: 'Paraná', provincia: 'Entre Ríos', km: 480 },
  // Corrientes
  { nombre: 'Curuzú Cuatiá', provincia: 'Corrientes', km: 870 },
  { nombre: 'Goya', provincia: 'Corrientes', km: 930 },
  { nombre: 'Corrientes', provincia: 'Corrientes', km: 1020 },
  // Misiones
  { nombre: 'Posadas', provincia: 'Misiones', km: 1120 },
  { nombre: 'Oberá', provincia: 'Misiones', km: 1200 },
  { nombre: 'Puerto Iguazú', provincia: 'Misiones', km: 1350 },
  // Chaco
  { nombre: 'Resistencia', provincia: 'Chaco', km: 1120 },
  { nombre: 'Presidencia Roque Sáenz Peña', provincia: 'Chaco', km: 1200 },
  // Formosa
  { nombre: 'Formosa', provincia: 'Formosa', km: 1285 },
  // Santiago del Estero
  { nombre: 'Santiago del Estero', provincia: 'Santiago del Estero', km: 1060 },
  { nombre: 'La Banda', provincia: 'Santiago del Estero', km: 1065 },
  // Tucumán
  { nombre: 'San Miguel de Tucumán', provincia: 'Tucumán', km: 1265 },
  { nombre: 'Concepción', provincia: 'Tucumán', km: 1330 },
  // Salta
  { nombre: 'Salta', provincia: 'Salta', km: 1480 },
  { nombre: 'Orán', provincia: 'Salta', km: 1680 },
  { nombre: 'Tartagal', provincia: 'Salta', km: 1720 },
  // Jujuy
  { nombre: 'San Salvador de Jujuy', provincia: 'Jujuy', km: 1570 },
  { nombre: 'Palpalá', provincia: 'Jujuy', km: 1575 },
  // Catamarca
  { nombre: 'San Fernando del Valle de Catamarca', provincia: 'Catamarca', km: 1225 },
  // La Rioja
  { nombre: 'La Rioja', provincia: 'La Rioja', km: 1110 },
  // San Juan
  { nombre: 'San Juan', provincia: 'San Juan', km: 1245 },
  // Mendoza
  { nombre: 'Godoy Cruz', provincia: 'Mendoza', km: 1120 },
  { nombre: 'Mendoza', provincia: 'Mendoza', km: 1125 },
  { nombre: 'Maipú', provincia: 'Mendoza', km: 1130 },
  { nombre: 'San Rafael', provincia: 'Mendoza', km: 1215 },
  // San Luis
  { nombre: 'Villa Mercedes', provincia: 'San Luis', km: 905 },
  { nombre: 'San Luis', provincia: 'San Luis', km: 925 },
  // La Pampa
  { nombre: 'Santa Rosa', provincia: 'La Pampa', km: 705 },
  { nombre: 'General Pico', provincia: 'La Pampa', km: 775 },
  // Neuquén
  { nombre: 'Neuquén', provincia: 'Neuquén', km: 1225 },
  { nombre: 'Cutral Có', provincia: 'Neuquén', km: 1295 },
  { nombre: 'Zapala', provincia: 'Neuquén', km: 1335 },
  { nombre: 'San Martín de los Andes', provincia: 'Neuquén', km: 1485 },
  // Río Negro
  { nombre: 'Viedma', provincia: 'Río Negro', km: 905 },
  { nombre: 'Cipolletti', provincia: 'Río Negro', km: 1180 },
  { nombre: 'General Roca', provincia: 'Río Negro', km: 1175 },
  { nombre: 'Bariloche', provincia: 'Río Negro', km: 1585 },
  { nombre: 'El Bolsón', provincia: 'Río Negro', km: 1655 },
  // Chubut
  { nombre: 'Puerto Madryn', provincia: 'Chubut', km: 1435 },
  { nombre: 'Trelew', provincia: 'Chubut', km: 1465 },
  { nombre: 'Rawson', provincia: 'Chubut', km: 1460 },
  { nombre: 'Comodoro Rivadavia', provincia: 'Chubut', km: 1635 },
  { nombre: 'Esquel', provincia: 'Chubut', km: 1735 },
  // Santa Cruz
  { nombre: 'Caleta Olivia', provincia: 'Santa Cruz', km: 1985 },
  { nombre: 'Pico Truncado', provincia: 'Santa Cruz', km: 2105 },
  { nombre: 'Río Gallegos', provincia: 'Santa Cruz', km: 2625 },
  { nombre: 'El Calafate', provincia: 'Santa Cruz', km: 2825 },
  // Tierra del Fuego
  { nombre: 'Río Grande', provincia: 'Tierra del Fuego', km: 3025 },
  { nombre: 'Ushuaia', provincia: 'Tierra del Fuego', km: 3235 },
]

export type TipoProducto = 'modulo_18' | 'modulo' | 'piscina_grande' | 'piscina'

const TARIFAS: Record<TipoProducto, number> = {
  modulo_18:    4000,
  modulo:       3000,
  piscina_grande: 5000,
  piscina:      3000,
}

export function calcularFlete(km: number, tipo: TipoProducto): number {
  return km * TARIFAS[tipo]
}

export function getTipoModulo(medida: string): TipoProducto {
  const m = medida.toLowerCase().replace(/\s/g, '')
  if (m.includes('3x6') || m.includes('18m') || m.includes('18²') || /\b18\b/.test(m)) return 'modulo_18'
  return 'modulo'
}

export function getTipoPiscina(nombre: string, medida: string): TipoProducto {
  const texto = (nombre + ' ' + medida).toLowerCase()
  if (texto.includes('8.10') || texto.includes('9.20') || texto.includes('8,10') || texto.includes('9,20')) {
    return 'piscina_grande'
  }
  return 'piscina'
}

export const LOCATION_KEY = 'ecofiver_location'

export interface UbicacionGuardada {
  ciudad: string
  km: number
}

export function getUbicacion(): UbicacionGuardada | null {
  try {
    const raw = localStorage.getItem(LOCATION_KEY)
    if (!raw) return null
    return JSON.parse(raw) as UbicacionGuardada
  } catch {
    return null
  }
}

export function saveUbicacion(u: UbicacionGuardada): void {
  try {
    localStorage.setItem(LOCATION_KEY, JSON.stringify(u))
  } catch {}
}

export function clearUbicacion(): void {
  try {
    localStorage.removeItem(LOCATION_KEY)
  } catch {}
}
