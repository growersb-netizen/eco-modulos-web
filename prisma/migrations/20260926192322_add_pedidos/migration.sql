/*
  Warnings:

  - You are about to drop the `leads` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "leads";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "pedidos" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "productoTipo" TEXT NOT NULL,
    "productoId" TEXT NOT NULL,
    "productoNombre" TEXT NOT NULL,
    "productoMedida" TEXT NOT NULL,
    "precioContado" INTEGER NOT NULL,
    "precioLista" INTEGER NOT NULL,
    "clienteNombre" TEXT NOT NULL,
    "clienteTelefono" TEXT NOT NULL,
    "clienteEmail" TEXT NOT NULL,
    "clienteDni" TEXT NOT NULL,
    "calle" TEXT NOT NULL,
    "pisoDpto" TEXT,
    "localidad" TEXT NOT NULL,
    "partido" TEXT NOT NULL,
    "codigoPostal" TEXT NOT NULL,
    "fechaInstalacion" DATETIME NOT NULL,
    "formaPago" TEXT NOT NULL,
    "notas" TEXT,
    "dejaSeña" BOOLEAN NOT NULL DEFAULT false,
    "señaConfirmada" BOOLEAN NOT NULL DEFAULT false,
    "estado" TEXT NOT NULL DEFAULT 'PENDIENTE',
    "notasAdmin" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
