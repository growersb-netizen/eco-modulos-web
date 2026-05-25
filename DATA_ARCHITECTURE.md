# Arquitectura de Datos — Eco Módulos & Piscinas

## Regla fundamental
Este proyecto usa DOS bases de datos con roles estrictamente separados.

## Turso DB (base de la web)
**Qué almacena:** contenido del sitio únicamente
- Productos (módulos y piscinas) con precios
- Coeficientes de financiación
- Testimonios
- Artículos de blog
- Galería de obras
- Configuración del sitio (hero, redes, textos)
- Usuarios del panel admin

**Quién puede escribir aquí:** solo el panel admin de la web (/admin/*)
**Quién puede leer:** el sitio público y el panel admin

## CRM — eco-crm-dawn-fog-5476.fly.dev
**Qué almacena:** todo lo relacionado con clientes y operaciones
- Leads y conversaciones
- Ventas (contado y financiadas)
- Videollamadas
- Cobranzas y pagos
- Órdenes de fábrica
- Logística y entregas
- Personal y liquidaciones
- Contratos

**Quién puede escribir aquí:** el CRM directamente + los agentes IA + la web (solo para sync de leads)
**Quién puede leer:** el CRM, los agentes IA

## Regla de sincronización
La web SOLO escribe en el CRM cuando se genera un lead nuevo (formulario de contacto, videollamada, simulador).
La web NUNCA lee del CRM. El CRM NUNCA escribe en Turso.

## Lo que está prohibido
- Guardar datos de clientes en Turso
- Leer productos o contenido del CRM desde la web
- Cualquier sincronización bidireccional entre Turso y CRM
