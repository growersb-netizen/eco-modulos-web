import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPeso(valor: number): string {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
    maximumFractionDigits: 0,
  }).format(valor)
}

export function calcularCuota(precioLista: number, coef: number, cuotas: number): number {
  return Math.ceil((precioLista * coef) / cuotas)
}

export function slugify(texto: string): string {
  return texto
    .toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s-]/g, '')
    .trim()
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
}

export function tiempoLectura(contenido: string): string {
  const palabras = contenido.split(/\s+/).length
  const minutos = Math.ceil(palabras / 200)
  return `${minutos} min de lectura`
}

let vendedorIndex = 0
const VENDEDORES_ROUND_ROBIN = ['stefania', 'hernan', 'daniel'] as const

export function siguienteVendedor(): string {
  const v = VENDEDORES_ROUND_ROBIN[vendedorIndex % 3]
  vendedorIndex++
  return v
}
