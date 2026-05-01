-- CreateTable
CREATE TABLE "usuarios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "nombre" TEXT NOT NULL,
    "rol" TEXT NOT NULL DEFAULT 'editor',
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "modulos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "medida" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL DEFAULT '',
    "usos" TEXT NOT NULL DEFAULT '[]',
    "precio_contado" INTEGER NOT NULL,
    "precio_lista" INTEGER NOT NULL,
    "imagen" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "actualizadoEn" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "piscinas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "medida" TEXT NOT NULL,
    "descripcion" TEXT NOT NULL DEFAULT '',
    "usos" TEXT NOT NULL DEFAULT '[]',
    "precio_contado" INTEGER NOT NULL,
    "precio_lista" INTEGER NOT NULL,
    "imagen" TEXT,
    "destacada" BOOLEAN NOT NULL DEFAULT false,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "actualizadoEn" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "coeficientes_cuota" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cuotas" INTEGER NOT NULL,
    "coef" REAL NOT NULL,
    "label" TEXT NOT NULL,
    "activo" BOOLEAN NOT NULL DEFAULT true
);

-- CreateTable
CREATE TABLE "obras" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "localidad" TEXT NOT NULL,
    "provincia" TEXT NOT NULL,
    "tipo" TEXT NOT NULL DEFAULT 'modulo',
    "imagen" TEXT,
    "descripcion" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "leads" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT,
    "telefono" TEXT,
    "email" TEXT,
    "localidad" TEXT,
    "producto_interes" TEXT NOT NULL,
    "plan_pago" TEXT,
    "cuotas_simuladas" INTEGER,
    "mensaje" TEXT,
    "fuente" TEXT NOT NULL,
    "vendedor_asignado" TEXT NOT NULL,
    "estado" TEXT NOT NULL DEFAULT 'nuevo',
    "notas" TEXT,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "testimonios" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "nombre" TEXT NOT NULL,
    "localidad" TEXT NOT NULL,
    "producto" TEXT NOT NULL,
    "texto" TEXT NOT NULL,
    "estrellas" INTEGER NOT NULL DEFAULT 5,
    "imagen" TEXT,
    "activo" BOOLEAN NOT NULL DEFAULT true,
    "orden" INTEGER NOT NULL DEFAULT 0,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "articulos_blog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "resumen" TEXT,
    "contenido" TEXT NOT NULL,
    "imagen" TEXT,
    "categoria" TEXT,
    "publicado" BOOLEAN NOT NULL DEFAULT false,
    "creadoEn" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "actualizadoEn" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "config_sitio" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "clave" TEXT NOT NULL,
    "valor" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "usuarios_email_key" ON "usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "coeficientes_cuota_cuotas_key" ON "coeficientes_cuota"("cuotas");

-- CreateIndex
CREATE UNIQUE INDEX "articulos_blog_slug_key" ON "articulos_blog"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "config_sitio_clave_key" ON "config_sitio"("clave");
