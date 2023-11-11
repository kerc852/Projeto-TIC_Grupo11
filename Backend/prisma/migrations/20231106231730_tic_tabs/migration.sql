/*
  Warnings:

  - The primary key for the `tb_item` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cod_sala` on the `tb_item` table. All the data in the column will be lost.
  - You are about to drop the column `descricao` on the `tb_item` table. All the data in the column will be lost.
  - You are about to drop the column `estado` on the `tb_item` table. All the data in the column will be lost.
  - The primary key for the `tb_sala` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `cod_sala` on the `tb_sala` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_item" DROP CONSTRAINT "fk_tb_item_id_sala";

-- AlterTable
CREATE SEQUENCE tb_fornecedor_id_fornecedor_seq;
ALTER TABLE "tb_fornecedor" ADD COLUMN     "email" VARCHAR(40),
ADD COLUMN     "telefone" VARCHAR(11),
ALTER COLUMN "id_fornecedor" SET DEFAULT nextval('tb_fornecedor_id_fornecedor_seq');
ALTER SEQUENCE tb_fornecedor_id_fornecedor_seq OWNED BY "tb_fornecedor"."id_fornecedor";

-- AlterTable
ALTER TABLE "tb_item" DROP CONSTRAINT "pk_tb_item_codigo",
DROP COLUMN "cod_sala",
DROP COLUMN "descricao",
DROP COLUMN "estado",
ADD COLUMN     "des_item" VARCHAR(100),
ADD COLUMN     "estado_item" VARCHAR(25),
ADD COLUMN     "id_item" SERIAL NOT NULL,
ADD COLUMN     "id_sala" INTEGER,
ALTER COLUMN "dt_entrada" SET DATA TYPE TIMESTAMP(6),
ALTER COLUMN "cod_item" DROP NOT NULL,
ADD CONSTRAINT "pk_tb_item_codigo" PRIMARY KEY ("id_item");

-- AlterTable
ALTER TABLE "tb_sala" DROP CONSTRAINT "pk_tb_sala_codigo",
DROP COLUMN "cod_sala",
ADD COLUMN     "id_sala" SERIAL NOT NULL,
ADD CONSTRAINT "pk_tb_sala_codigo" PRIMARY KEY ("id_sala");

-- AlterTable
CREATE SEQUENCE tb_usuario_id_usuario_seq;
ALTER TABLE "tb_usuario" ALTER COLUMN "id_usuario" SET DEFAULT nextval('tb_usuario_id_usuario_seq'),
ALTER COLUMN "senha" SET DATA TYPE VARCHAR(60);
ALTER SEQUENCE tb_usuario_id_usuario_seq OWNED BY "tb_usuario"."id_usuario";

-- AddForeignKey
ALTER TABLE "tb_item" ADD CONSTRAINT "fk_tb_item_id_sala" FOREIGN KEY ("id_sala") REFERENCES "tb_sala"("id_sala") ON DELETE NO ACTION ON UPDATE NO ACTION;
