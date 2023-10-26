/*
  Warnings:

  - The primary key for the `tb_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `codigo` on the `tb_item` table. All the data in the column will be lost.
  - You are about to drop the column `id_estado` on the `tb_item` table. All the data in the column will be lost.
  - You are about to drop the column `id_funcionario` on the `tb_item` table. All the data in the column will be lost.
  - You are about to drop the column `id_sala` on the `tb_item` table. All the data in the column will be lost.
  - The primary key for the `tb_sala` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `id_sala` on the `tb_sala` table. All the data in the column will be lost.
  - You are about to drop the `tb_dano` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_estado` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_funcionario` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_ocorrencia` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `tb_solicitacao` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `cod_item` to the `tb_item` table without a default value. This is not possible if the table is not empty.
  - Added the required column `cod_sala` to the `tb_sala` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "tb_item" DROP CONSTRAINT "fk_tb_item_id_estado";

-- DropForeignKey
ALTER TABLE "tb_item" DROP CONSTRAINT "fk_tb_item_id_funcionario";

-- DropForeignKey
ALTER TABLE "tb_item" DROP CONSTRAINT "fk_tb_item_id_sala";

-- DropForeignKey
ALTER TABLE "tb_ocorrencia" DROP CONSTRAINT "fk_tb_ocorrencia_cod_item";

-- DropForeignKey
ALTER TABLE "tb_ocorrencia" DROP CONSTRAINT "fk_tb_ocorrencia_id_dano";

-- DropForeignKey
ALTER TABLE "tb_solicitacao" DROP CONSTRAINT "fk_tb_solicitacao_id_funcionario";

-- AlterTable
ALTER TABLE "tb_item" DROP CONSTRAINT "pk_tb_item_codigo",
DROP COLUMN "codigo",
DROP COLUMN "id_estado",
DROP COLUMN "id_funcionario",
DROP COLUMN "id_sala",
ADD COLUMN     "cod_item" INTEGER NOT NULL,
ADD COLUMN     "cod_sala" INTEGER,
ADD COLUMN     "estado" VARCHAR(25),
ADD CONSTRAINT "pk_tb_item_codigo" PRIMARY KEY ("cod_item");

-- AlterTable
ALTER TABLE "tb_sala" DROP CONSTRAINT "pk_tb_sala_codigo",
DROP COLUMN "id_sala",
ADD COLUMN     "cod_sala" INTEGER NOT NULL,
ADD CONSTRAINT "pk_tb_sala_codigo" PRIMARY KEY ("cod_sala");

-- DropTable
DROP TABLE "tb_dano";

-- DropTable
DROP TABLE "tb_estado";

-- DropTable
DROP TABLE "tb_funcionario";

-- DropTable
DROP TABLE "tb_ocorrencia";

-- DropTable
DROP TABLE "tb_solicitacao";

-- CreateTable
CREATE TABLE "tb_usuario" (
    "id_usuario" INTEGER NOT NULL,
    "nm_usuario" VARCHAR(60),
    "senha" VARCHAR(20),

    CONSTRAINT "pk_tb_usuario_id_usuario" PRIMARY KEY ("id_usuario")
);

-- AddForeignKey
ALTER TABLE "tb_item" ADD CONSTRAINT "fk_tb_item_id_sala" FOREIGN KEY ("cod_sala") REFERENCES "tb_sala"("cod_sala") ON DELETE NO ACTION ON UPDATE NO ACTION;
