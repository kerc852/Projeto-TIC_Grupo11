
import {useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react'
import {MdMode, MdOutlineDeleteOutline} from 'react-icons/md'
import Menu from './Menu';

interface ProdutoProps { // tipo de dado
  id: number,
  code: string,
  name: string,
  description: string,
  date: string,
  supplier: string,
  status: string,
  local: string
}


export function ProdutoP() {
  // esta variável vai conter o username passado na navegação
  const location = useLocation();
  // recupera o username
  const username = location.state?.username || '';

  
  // vetor de produtos
  const [products, setProducts] = useState<ProdutoProps[]>([])

  // variáveis de estado para os campos do formulário
  const [code, setCode] = useState('')
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('')
  const [supplier, setSupplier] = useState('')
  const [status, setStatus] = useState('')
  const [local, setLocal] = useState('')
  // diferencia se vai inserir (id = 0) ou editar (id não for 0) um produto
  const [id, setId] = useState(0)

  // fazer o hook useEffect para carregar os produtos da API
  // quando a página for carregada ou o username for alterado
  useEffect( () => {
    const buscaProdutos = async () => {
      try {
        const resp = await fetch(`http://localhost:3000/products`)
        const produtos = await resp.json()
        if (resp.ok){
          setProducts(produtos) // atualiza vetor de produtos com dados da API
        }
        else {
          console.log('Falha na busca por dados')
        }
      }
      catch(error) {
        console.log(error)
      }
    }
      buscaProdutos()
  } , [username])

  // quando o vetor de produtos for alterado, executa a função useEffect
  useEffect( () => {
    setProducts(products) // atualiza a lista de produtos
  }, [products] ) 
  
  // função para cadastrar um produto
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // evita que a página seja recarregada
    // monta o objeto produto
    console.log(`${id} handle` )
    let produto
    if (id == 0) { // insere
      produto = {
        code,
        name,
        description,
        date,
        supplier,
        status,
        local
      }
    } 
    else {
      produto = { // atualiza
        code,
        name,
        description,
        date,
        supplier,
        status,
        local
      }
    }
    let url
    let verb
    if (id == 0) { // insere
      url = `http://localhost:3000/products`
      verb = 'POST'
    }
    else {
      url = `http://localhost:3000/products/${id}`
      verb = 'PUT'
    }

    try {
      // chamar a API para cadastrar o produto
      console.log(url)
      console.log(verb)
      const produtoCadastrado = await fetch(url, {
        method: verb,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(produto)
      })
      .then ( resp => { // quando o servidor respondeu
        return resp.json() // transforma em json
      })
       // atualiza a lista de produtos
       // monta uma nova lista com a lista anterior + produto cadastrado
       if (id == 0) { // insere
          setProducts([...products, produtoCadastrado])
       }
       else { // atualiza na lista o produto alterado
          setProducts(products.map( (product) => {
            if (product.id === id) {
              return produtoCadastrado
            }
            else {
              return product
            }
          }))
       }
      }
    catch(error) {
      console.log(error)
    }
  }

  const handleEdit = (product: ProdutoProps) => {
    setCode(product.code)
    setName(product.name)
    setDescription(product.description)
    setDate(product.date)
    setSupplier(product.supplier)
    setStatus(product.status)
    setLocal(product.local)
    console.log(product.id)
    setId(product.id) // vai nos ajudar na criação/edição do produto
  }

  // função para remover um produto
  const handleRemove = async (id: number) => {
    let confirma = confirm('Confirma a remoção do produto?')
    if (confirma) {
      // requisição DELETE para remover um produto através da API
      await fetch(`http://localhost:3000/products/${id}`, {
        method: 'DELETE'
      })
      .then( response => {
        return response.json()
      })
      .catch(error => {
          alert(error)
      })
      // atualiza a lista de produtos - removendo o produto deletado
      // setProducts vai receber como parâmetro a lista de produtos atual
      // retirando o produto que foi removido
      setProducts(products.filter( (product) => product.id !== id ))
    }
  }
        
    return (
      <>
      
      <div className="flex-col">
          <Menu username={username}/>
      </div>
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-md mx-20 my-6 mb-6 ">
          {/* formulário para cadastro de um produto */}
          <form onSubmit={handleSubmit} className="max-w-md mx-auto mb-4">
            <div>
            <label htmlFor="code" className="text-sm block font-bold ">
                Codigo
              </label>
              <input type="text" id="code" value={code} 
                     onChange={ (e) => setCode(e.target.value) } 
                     className="w-full bg-transparent text-black py-2 my-1 border-b border-black outline-none focus:outline-none" />
            </div>
            <div>
              <label htmlFor="name" className="text-sm block font-bold mb-2">
                Nome
              </label>
              <input type="text" id="name" value={name} 
                     onChange={ (e) => setName(e.target.value) } 
                     className="w-full bg-transparent text-black border-b border-black outline-none focus:outline-none" />
            </div>
            <div>
              <label htmlFor="description" className="text-sm block font-bold mb-2">
                Descrição
              </label>
              <textarea id="description" value={description}
                        onChange={ (e) => setDescription(e.target.value) }
                        className="w-full bg-transparent text-black border-b border-black outline-none focus:outline-none" />
            </div>
            <div>
              <label htmlFor="date" className="text-sm block font-bold mb-2">
                Data
              </label>
              <textarea id="date" value={date}
                        onChange={ (e) => setDate(e.target.value) }
                        className="w-full bg-transparent text-black border-b border-black outline-none focus:outline-none" />
            </div>
            <div>
              <label htmlFor="supplier" className="text-sm block font-bold mb-2">
                Fornecedor
              </label>
              <textarea id="supplier" value={supplier}
                        onChange={ (e) => setSupplier(e.target.value) }
                        className="w-full bg-transparent text-black border-b border-black outline-none focus:outline-none" />
            </div>
            <div>
              <label htmlFor="status" className="text-sm block font-bold mb-2">
                Estado
              </label>
              <input type="string" id="status" value={status}
                      onChange={ (e) => setStatus(e.target.value) }
                      className="w-full bg-transparent text-black  border-b border-black outline-none focus:outline-none" />
            </div>
            <div>
              <label htmlFor="local" className="text-sm block font-bold mb-2">
                Local
              </label>
              <input type="string" id="local" value={local}
                      onChange={ (e) => setLocal(e.target.value)}
                      className="w-full bg-transparent text-black py-2 my-1 border-b border-black outline-none focus:outline-none" />
            </div>
            <button type="submit" 
              className="w-full text-white bg-[#060606] rounded-lg p-2 text-center flex-items-center justify-center">
              Criar/Editar Produto
            </button>
          </form>
          {/* lista de produtos dentro de uma tabela */}
          <h2 className="font-bold mb-4"> Lista de Produtos </h2>        
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">ID</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Codigo</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Nome</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Descrição</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Data</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Fornecedor</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Estado</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Local</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Editar</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Remove</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {
                products.map( (product) => (
                  <tr className="" key={product.id}>
                    <td className="p-3 text-sm text-gray-800 text-center">{product.id}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">{product.code}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">{product.name}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">{product.description}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">{product.date}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">{product.supplier}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">{product.status}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">{product.local}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">
                      <button onClick={() => handleEdit(product)}> 
                        <MdMode size={20}/>
                      </button>
                    </td>
                    <td className="p-3 text-sm text-gray-800 text-center">
                      <button onClick={() => handleRemove(product.id)}> 
                        <MdOutlineDeleteOutline size={20}/>
                      </button>
                    </td>
                  </tr>
                ) /* fim da função dentro do map */
                ) /* fim do map */
              } {/* fim do reactjs */}
            </tbody>
          </table>                  
        </div>
      </div>
      </>
    )
}