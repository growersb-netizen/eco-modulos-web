# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ This is NOT the Next.js you know

This project runs **Next.js 16.2.4** with **React 19** and **Tailwind CSS v4** — all have breaking changes from common training data. Read `node_modules/next/dist/docs/` before writing routing or layout code. Key differences:

- Middleware file is **`proxy.ts`** (not `middleware.ts`) — both cannot coexist. `middleware.ts` will break the build.
- Tailwind v4 uses `@import "tailwindcss"` and `@theme { }` in CSS — no `tailwind.config.ts` exists.
- Prisma 7 uses `new PrismaLibSql({ url, authToken })` (takes config object, not a pre-created client). `previewFeatures = ["driverAdapters"]` is NOT needed.
- `next-auth` v4 `SessionProvider` must be in a Client Component — it lives in `components/Providers.tsx`.

---

## Commands

```bash
npm run dev          # local dev server
npm run build        # prisma generate + next build
npx tsc --noEmit     # type-check only (0 errors = required before deploy)
vercel --prod        # deploy to production

npm run seed         # seed Turso DB from scripts/seed-turso.ts
npm run backup       # export all Turso tables to backups/turso_{date}.json
npx tsx scripts/seed-blog-seo.ts   # insert SEO articles into Turso
npx tsx scripts/fix-phone-db.ts    # one-off DB patches (template)
```

`build` ignores TypeScript errors intentionally (`ignoreBuildErrors: true`) because Next.js generates `.next/types` that differ by environment. Always run `tsc --noEmit` separately.

---

## Data architecture (critical — two DBs, strictly separated)

```
Turso DB  ←→  Web only
CRM       ←→  Leads, sales, operations only
```

**Turso (libsql)** stores: products, prices, financing coefficients, blog articles, gallery, testimonials, site config, admin users. Accessed via Prisma (`lib/db.ts`) — always using `https://` not `libsql://` (WebSocket fails in Vercel Lambda).

**CRM** (`https://eco-crm-dawn-fog-5476.fly.dev`) stores: leads, conversations, sales, payments, deliveries. The web writes to it only via `lib/crm.ts → syncLeadCRM()` with a 3-second timeout. The web **never reads from the CRM**.

**Prohibited:** saving client data in Turso. `prisma.lead` does not exist. `/api/admin/leads` returns HTTP 410.

---

## Pricing logic

Products have two prices:
- `precio_contado` — stored in DB, the base price
- `precio_lista` — computed: `precio_contado × multiplicador` (default 1.4, configurable from `config_sitio.precio_lista_multiplicador`)

Financing: `precio_lista × coef` from `coeficientes_cuota` table. Monthly payment: `ceil(total / cuotas)`.

See `app/api/simulador/route.ts` for the canonical implementation.

---

## Authentication

NextAuth v4, JWT strategy, 8-hour sessions. Protected routes: all `/admin/*` except `/admin/login`.

Guard is in `proxy.ts` (uses `getToken` from `next-auth/jwt`). Session types extended in `types/next-auth.d.ts`. Admin login page at `app/admin/login/page.tsx`.

---

## Image storage

Images are stored as **absolute URLs** in the `imagen` field of each DB row. Upload flow: `POST /api/admin/upload` → validates type/size → sharp resize → Cloudflare R2 (`lib/r2.ts`) → returns public URL → saved to DB. Currently all product images are `NULL` (not yet uploaded).

`next.config.ts` remote patterns include: `*.r2.dev`, `*.cloudflarestorage.com`, `i.ibb.co`, `res.cloudinary.com`, `*.googleusercontent.com`, `dl.dropboxusercontent.com`, `raw.githubusercontent.com`. Any of these can be used as product image URLs directly without uploading.

---

## Key lib files

| File | Role |
|---|---|
| `lib/db.ts` | Prisma singleton for Turso. Strips BOM from env vars. |
| `lib/crm.ts` | `syncLeadCRM()` — fire-and-forget POST to CRM with 3s timeout. |
| `lib/r2.ts` | `uploadImagen()` / `eliminarImagen()` via S3-compatible API. |
| `lib/whatsapp.ts` | Vendor phone numbers (round-robin via `siguienteVendedor()` in `lib/utils.ts`). |
| `lib/utils.ts` | `formatPeso`, `calcularCuota`, `slugify`, `tiempoLectura`, `siguienteVendedor`. |

---

## Public API surface

All routes under `app/api/` — the ones external systems may call:

```
POST /api/leads           → validate (zod) → syncLeadCRM → { ok: true }
POST /api/whatsapp-click  → syncLeadCRM fire-and-forget → { ok: true }
POST /api/simulador       → { precioContado, precioLista, coef, total, cuota, label }
GET  /api/modulos         → active modules list from Turso
GET  /api/piscinas        → active pools list from Turso
POST /api/chat            → chatbot (Valentina)
```

Admin routes all require a valid NextAuth session (401 otherwise).

---

## Turso schema (8 tables)

`usuarios`, `modulos`, `piscinas`, `coeficientes_cuota`, `obras`, `testimonios`, `articulos_blog`, `config_sitio`.

Schema is in `prisma/schema.prisma`. After any schema change: `npx prisma generate` then `npx tsc --noEmit`.

There is no migration workflow for Turso — changes are applied directly. Seed data is in `scripts/seed-turso.ts` and `prisma/seed.ts`.

---

## Contact & business constants

- Phone / WhatsApp: `+54 9 11 6873-3406` → `5491168733406` (international, no spaces/dashes)
- Legal name: `Cooperativa de Trabajo Eco Zárate Limitada`
- CUIT: `30-71807393-2`
- CRM URL: `https://eco-crm-dawn-fog-5476.fly.dev`
- Vercel project: `eco-modulos-web`

Hardcode these values or read from `config_sitio` — never use other numbers/names found in `.claude/worktrees/` (those are stale copies).

---

## Styling conventions

Tailwind v4 design tokens defined in `app/globals.css` under `@theme`:

```
--color-eco-green / eco-green-dark / eco-green-light
--color-eco-teal / eco-teal-light
--color-eco-bg / eco-bg-card / eco-bg-surface
--color-eco-text / eco-text-muted
--color-eco-border
--font-display  → Barlow Condensed (headings, uppercase)
--font-body     → Inter
```

Use `style={{ fontFamily: 'var(--font-display)' }}` for display headings — Tailwind's `font-display` class alone won't apply the Google Font variable.
