import { FastifyInstance } from "fastify"
import {z} from 'zod'
import {prisma} from "./lib/prisma"

export async function AppRoutes(server: FastifyInstance) {

    //ROTA MOSTRA DADOS DA TABELA TB_ITEM
    server.get('/tb_item', async() => {
        const tb_item = await prisma.tb_item.findMany()
        return tb_item
    })

    //ROTA MOSTRA DADOS DA TABELA TB_FUNCIONARIO
    server.get('/tb_funcionario', async() => {
        const tb_funcionario = await prisma.tb_funcionario.findMany()
        return tb_funcionario
    })

    //ROTAS CRIAR UM NOVO FUNCIONÁRIO NA TB_FUNCIONARIO
    server.post(`/tb_funcionario/add`, async(Request) =>{
        const postBody = z.object(
            {
                id_funcionario: z.number(),
                nm_funcionario: z.string(),
                cargo: z.string()
            })

        const {id_funcionario, nm_funcionario, cargo} = postBody.parse(Request.body)
        const newFuncinario = await prisma.tb_funcionario.create({
            data: {
                id_funcionario: id_funcionario,
                nm_funcionario: nm_funcionario,
                cargo: cargo
            }
        })
        return newFuncinario;
    });

    //ROTA REMOVER UM FUNCIONÁRIO NA TB_FUNCIONARIO
    server.delete('/tb_funcionario/delete/:idfun', async (Request) => {
        //Cria objeto zod para esquema de dados
        const idParam = z.object({
            idfun: z.string(),
        })
        //Recupera o id do frontend
        const {idfun} = idParam.parse(Request.params)

        const funcionarioid = Number(idfun)
        //Remove do banco de dados
        const deleteFuncionario = await prisma.tb_funcionario.delete({
            where:{
                id_funcionario: funcionarioid
            }
        })
        return deleteFuncionario
    })

    //ROTA PARA ATUALIZAR DADOS DO FUNCINÁRIO NA TB_FUNCIONARIO
    server.put('/tb_funcionario/update', async (Request) => {

        //Objeto zod para o corpo da requisição
        const putBody = z.object({
            "id_funcionario": z.number(),
            "nm_funcionario": z.string(),
            "cargo": z.string()
        })

        //Recuperar os dados do frontend
        const {id_funcionario, nm_funcionario, cargo} = putBody.parse(Request.body)

        //Atualiza no banco de dados 
        const funcinarioUpdate = await prisma.tb_funcionario.updateMany({
            where: {
                id_funcionario: id_funcionario,
            },
            data: {
                nm_funcionario: nm_funcionario,
                cargo: cargo
            },
        })
        return (funcinarioUpdate.count >= 1) ? `Atualização com sucesso` : `Nada foi atualizado`
    })

}