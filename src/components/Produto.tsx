
// vamos definir as props (propriedades) do componente Produto
interface ProdutoProps {
    codigo: number,
    nome: string,
    descricao: string,
    data: string,
    fornecedor: string,
    estado: string,
    local: string
}
export function Produto(prod: ProdutoProps) {

    return (
        <div className="bg-zinc-900 w-full h-50 text-white rounded m-2 flex items-center justify-center">
            Codigo: {prod.codigo}
            Nome: {prod.nome}
            Descrição: {prod.descricao}
            Data: {prod.data}
            Fornecedor: {prod.fornecedor}
            Estado: {prod.estado}
            Local: {prod.local}
        </div>
    )
}

