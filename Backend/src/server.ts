//importa fastify
import fastify from "fastify";
//Importa as rotas
import { AppRoutes } from "./routes";

//Cria objeto da classe Fastify
const server = fastify()
//Registra as notas
server.register(AppRoutes)

//Sobe o servidor
server.listen({
    port: 3333,
})
.then( () => {
    console.log('HTTP SERVER RUNNING')
})

//ORM - MAPEADOR OBJETO RELACIONAL (INTERMEDIO ENTRE O SISTEMA E O BANCO DE DADOS) 
// -D SIGNIFICA INSTALAÇÃO NAS DEPENDENCIAS DE DESENVOLVIMENTO
// DEPENDENDIA ZOD RECUPERA DADOS DO FRONTEND