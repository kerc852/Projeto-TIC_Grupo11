
import {useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react'
import {MdMode, MdOutlineDeleteOutline} from 'react-icons/md'
import Menu from './Menu';

interface ItemProps { // tipo de dado
  id: number,
  code: string,
  name: string,
  description: string,
  date: string,
  supplier: string,
  status: string,
  local: string
}


export function Item() {
  // esta variável vai conter o username passado na navegação
  const location = useLocation();
  // recupera o username
  const username = location.state?.username || '';

  
  // vetor de produtos
  const [itens, setItens] = useState<ItemProps[]>([])

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
    const buscaItens = async () => {
      try {
        const resp = await fetch(`http://localhost:3000/itens`)
        const itens = await resp.json()
        if (resp.ok){
          setItens(itens) // atualiza vetor de produtos com dados da API
        }
        else {
          console.log('Falha na busca por dados')
        }
      }
      catch(error) {
        console.log(error)
      }
    }
      buscaItens()
  } , [username])

  // quando o vetor de produtos for alterado, executa a função useEffect
  useEffect( () => {
    setItens(itens) // atualiza a lista de produtos
  }, [itens] ) 
  
  // função para cadastrar um produto
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // evita que a página seja recarregada
    // monta o objeto produto
    console.log(`${id} handle` )
    let item
    if (id == 0) { // insere
      item = {
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
      item = { // atualiza
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
      url = `http://localhost:3000/itens`
      verb = 'POST'
    }
    else {
      url = `http://localhost:3000/itens/${id}`
      verb = 'PUT'
    }

    try {
      // chamar a API para cadastrar o produto
      console.log(url)
      console.log(verb)
      const itemCadastrado = await fetch(url, {
        method: verb,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(item)
      })
      .then ( resp => { // quando o servidor respondeu
        return resp.json() // transforma em json
      })
       // atualiza a lista de produtos
       // monta uma nova lista com a lista anterior + produto cadastrado
       if (id == 0) { // insere
          setItens([...itens, itemCadastrado])
       }
       else { // atualiza na lista o produto alterado
          setItens(itens.map( (itens) => {
            if (itens.id === id) {
              return itemCadastrado
            }
            else {
              return itens
            }
          }))
       }
      }
    catch(error) {
      console.log(error)
    }
    setId(0)
    setName("")
    
  }

  const handleEdit = (itens: ItemProps) => {
    setCode(itens.code)
    setName(itens.name)
    setDescription(itens.description)
    setDate(itens.date)
    setSupplier(itens.supplier)
    setStatus(itens.status)
    setLocal(itens.local)
    console.log(itens.id)
    setId(0) // vai nos ajudar na criação/edição do produto
  }

  // função para remover um produto
  const handleRemove = async (id: number) => {
    let confirma = confirm('Confirma a remoção do produto?')
    if (confirma) {
      // requisição DELETE para remover um produto através da API
      await fetch(`http://localhost:3000/itens/${id}`, {
        method: 'DELETE'
      })
      .then( response => {
        return response.json()
      })
      .catch(error => {
          alert(error)
      })
      // atualiza a lista de produtos - removendo o produto deletado
      // setitenss vai receber como parâmetro a lista de produtos atual
      // retirando o produto que foi removido
      setItens(itens.filter( (itens) => itens.id !== id ))
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
              <input type='date' id="date" value={date}
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
          <h2 className="font-bold mb-4"> Lista de Patrimônios </h2>        
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
                itens.map( (itens) => (
                  <tr className="" key={itens.id}>
                    <td className="p-3 text-sm text-gray-800 text-center">{itens.id}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">{itens.code}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">{itens.name}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">{itens.description}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">{itens.date}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">{itens.supplier}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">{itens.status}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">{itens.local}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">
                      <button onClick={() => handleEdit(itens)}> 
                        <MdMode size={20}/>
                      </button>
                    </td>
                    <td className="p-3 text-sm text-gray-800 text-center">
                      <button onClick={() => handleRemove(itens.id)}> 
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