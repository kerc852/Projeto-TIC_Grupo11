-- CreateTable
CREATE TABLE "tb_fornecedor" (
    "id_fornecedor" SERIAL NOT NULL,
    "nm_fornecedor" VARCHAR(40),
    "telefone" VARCHAR(11),
    "email" VARCHAR(40),

    CONSTRAINT "pk_tb_fornecedor_id_fornecedor" PRIMARY KEY ("id_fornecedor")
);

-- CreateTable
CREATE TABLE "tb_item" (
    "id_item" SERIAL NOT NULL,
    "cod_item" INTEGER,
    "id_fornecedor" INTEGER,
    "id_sala" INTEGER,
    "nm_item" VARCHAR(40),
    "des_item" VARCHAR(100),
    "estado_item" VARCHAR(25),
    "dt_entrada" DATE,

    CONSTRAINT "pk_tb_item_codigo" PRIMARY KEY ("id_item")
);

-- CreateTable
CREATE TABLE "tb_sala" (
    "id_sala" SERIAL NOT NULL,
    "nm_sala" VARCHAR(20),

    CONSTRAINT "pk_tb_sala_codigo" PRIMARY KEY ("id_sala")
);

-- CreateTable
CREATE TABLE "tb_usuario" (
    "id_usuario" SERIAL NOT NULL,
    "nm_usuario" VARCHAR(60),
    "senha" VARCHAR(60),

    CONSTRAINT "pk_tb_usuario_id_usuario" PRIMARY KEY ("id_usuario")
);

-- AddForeignKey
ALTER TABLE "tb_item" ADD CONSTRAINT "fk_tb_item_id_fornecedor" FOREIGN KEY ("id_fornecedor") REFERENCES "tb_fornecedor"("id_fornecedor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_item" ADD CONSTRAINT "fk_tb_item_id_sala" FOREIGN KEY ("id_sala") REFERENCES "tb_sala"("id_sala") ON DELETE NO ACTION ON UPDATE NO ACTION;
