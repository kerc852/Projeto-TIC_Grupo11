-- CreateTable
CREATE TABLE "tb_dano" (
    "id_dano" INTEGER NOT NULL,
    "tipo_dano" VARCHAR(20),

    CONSTRAINT "pk_tb_dano_id_dano" PRIMARY KEY ("id_dano")
);

-- CreateTable
CREATE TABLE "tb_estado" (
    "id_estado" INTEGER NOT NULL,
    "nm_estado" VARCHAR(20),

    CONSTRAINT "pk_tb_estado_id_estado" PRIMARY KEY ("id_estado")
);

-- CreateTable
CREATE TABLE "tb_fornecedor" (
    "id_fornecedor" INTEGER NOT NULL,
    "nm_fornecedor" VARCHAR(40),

    CONSTRAINT "pk_tb_fornecedor_id_fornecedor" PRIMARY KEY ("id_fornecedor")
);

-- CreateTable
CREATE TABLE "tb_funcionario" (
    "id_funcionario" INTEGER NOT NULL,
    "nm_funcionario" VARCHAR(60),
    "cargo" VARCHAR(20),

    CONSTRAINT "pk_tb_funcionario_id_funcionario" PRIMARY KEY ("id_funcionario")
);

-- CreateTable
CREATE TABLE "tb_item" (
    "codigo" INTEGER NOT NULL,
    "id_fornecedor" INTEGER,
    "id_funcionario" INTEGER,
    "id_sala" INTEGER,
    "id_estado" INTEGER,
    "nm_item" VARCHAR(40),
    "descricao" VARCHAR(100),
    "dt_entrada" DATE,

    CONSTRAINT "pk_tb_item_codigo" PRIMARY KEY ("codigo")
);

-- CreateTable
CREATE TABLE "tb_ocorrencia" (
    "numero" INTEGER NOT NULL,
    "cod_item" INTEGER,
    "id_dano" INTEGER,
    "dt_ocorrencia" DATE,

    CONSTRAINT "pk_tb_ocorrencia_numero" PRIMARY KEY ("numero")
);

-- CreateTable
CREATE TABLE "tb_sala" (
    "id_sala" INTEGER NOT NULL,
    "nm_sala" VARCHAR(20),

    CONSTRAINT "pk_tb_sala_codigo" PRIMARY KEY ("id_sala")
);

-- CreateTable
CREATE TABLE "tb_solicitacao" (
    "id_solicitacao" INTEGER NOT NULL,
    "id_funcionario" INTEGER,
    "nm_item" VARCHAR(20),
    "descricao" VARCHAR(100),
    "preco" INTEGER,

    CONSTRAINT "pk_tb_solicitacao_id_solicitacao" PRIMARY KEY ("id_solicitacao")
);

-- AddForeignKey
ALTER TABLE "tb_item" ADD CONSTRAINT "fk_tb_item_id_estado" FOREIGN KEY ("id_estado") REFERENCES "tb_estado"("id_estado") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_item" ADD CONSTRAINT "fk_tb_item_id_fornecedor" FOREIGN KEY ("id_fornecedor") REFERENCES "tb_fornecedor"("id_fornecedor") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_item" ADD CONSTRAINT "fk_tb_item_id_funcionario" FOREIGN KEY ("id_funcionario") REFERENCES "tb_funcionario"("id_funcionario") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_item" ADD CONSTRAINT "fk_tb_item_id_sala" FOREIGN KEY ("id_sala") REFERENCES "tb_sala"("id_sala") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_ocorrencia" ADD CONSTRAINT "fk_tb_ocorrencia_cod_item" FOREIGN KEY ("cod_item") REFERENCES "tb_item"("codigo") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_ocorrencia" ADD CONSTRAINT "fk_tb_ocorrencia_id_dano" FOREIGN KEY ("id_dano") REFERENCES "tb_dano"("id_dano") ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "tb_solicitacao" ADD CONSTRAINT "fk_tb_solicitacao_id_funcionario" FOREIGN KEY ("id_funcionario") REFERENCES "tb_funcionario"("id_funcionario") ON DELETE NO ACTION ON UPDATE NO ACTION;
