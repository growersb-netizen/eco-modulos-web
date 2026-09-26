export interface Ciudad {
  nombre: string
  provincia: string
  km: number
}

export const CIUDADES: Ciudad[] = [
  // Zárate y alrededores
  { nombre: 'Zárate', provincia: 'Buenos Aires', km: 0 },
  { nombre: 'Campana', provincia: 'Buenos Aires', km: 25 },
  { nombre: 'Exaltación de la Cruz', provincia: 'Buenos Aires', km: 45 },
  { nombre: 'Escobar', provincia: 'Buenos Aires', km: 50 },
  { nombre: 'Pilar', provincia: 'Buenos Aires', km: 70 },
  // AMBA Norte
  { nombre: 'San Fernando', provincia: 'Buenos Aires', km: 70 },
  { nombre: 'Tigre', provincia: 'Buenos Aires', km: 75 },
  { nombre: 'San Isidro', provincia: 'Buenos Aires', km: 82 },
  { nombre: 'Vicente López', provincia: 'Buenos Aires', km: 88 },
  // CABA
  { nombre: 'Ciudad de Buenos Aires', provincia: 'CABA', km: 95 },
  // AMBA Oeste
  { nombre: 'Tres de Febrero', provincia: 'Buenos Aires', km: 95 },
  { nombre: 'Hurlingham', provincia: 'Buenos Aires', km: 100 },
  { nombre: 'San Martín', provincia: 'Buenos Aires', km: 100 },
  { nombre: 'Morón', provincia: 'Buenos Aires', km: 105 },
  { nombre: 'Merlo', provincia: 'Buenos Aires', km: 115 },
  { nombre: 'Moreno', provincia: 'Buenos Aires', km: 118 },
  { nombre: 'Luján', provincia: 'Buenos Aires', km: 148 },
  // AMBA Sur
  { nombre: 'La Matanza', provincia: 'Buenos Aires', km: 108 },
  { nombre: 'Avellaneda', provincia: 'Buenos Aires', km: 105 },
  { nombre: 'Lanús', provincia: 'Buenos Aires', km: 110 },
  { nombre: 'Lomas de Zamora', provincia: 'Buenos Aires', km: 115 },
  { nombre: 'Quilmes', provincia: 'Buenos Aires', km: 118 },
  { nombre: 'Ezeiza', provincia: 'Buenos Aires', km: 120 },
  { nombre: 'Berazategui', provincia: 'Buenos Aires', km: 125 },
  { nombre: 'Florencio Varela', provincia: 'Buenos Aires', km: 132 },
  { nombre: 'La Plata', provincia: 'Buenos Aires', km: 145 },
  // Buenos Aires Interior Norte
  { nombre: 'San Nicolás', provincia: 'Buenos Aires', km: 155 },
  { nombre: 'Ramallo', provincia: 'Buenos Aires', km: 130 },
  { nombre: 'Pergamino', provincia: 'Buenos Aires', km: 185 },
  { nombre: 'Junín', provincia: 'Buenos Aires', km: 260 },
  // Buenos Aires Interior Centro
  { nombre: 'Mercedes', provincia: 'Buenos Aires', km: 185 },
  { nombre: 'Chivilcoy', provincia: 'Buenos Aires', km: 225 },
  { nombre: 'Bragado', provincia: 'Buenos Aires', km: 280 },
  { nombre: '9 de Julio', provincia: 'Buenos Aires', km: 315 },
  { nombre: 'Azul', provincia: 'Buenos Aires', km: 320 },
  { nombre: 'Olavarría', provincia: 'Buenos Aires', km: 350 },
  { nombre: 'Bolívar', provincia: 'Buenos Aires', km: 360 },
  { nombre: 'Tandil', provincia: 'Buenos Aires', km: 365 },
  // Buenos Aires Costa
  { nombre: 'Mar del Plata', provincia: 'Buenos Aires', km: 400 },
  { nombre: 'Necochea', provincia: 'Buenos Aires', km: 455 },
  { nombre: 'Miramar', provincia: 'Buenos Aires', km: 430 },
  { nombre: 'Tres Arroyos', provincia: 'Buenos Aires', km: 500 },
  // Buenos Aires Sur/Interior
  { nombre: 'Pehuajó', provincia: 'Buenos Aires', km: 390 },
  { nombre: 'Trenque Lauquen', provincia: 'Buenos Aires', km: 460 },
  { nombre: 'Coronel Suárez', provincia: 'Buenos Aires', km: 575 },
  { nombre: 'Bahía Blanca', provincia: 'Buenos Aires', km: 670 },
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
