import {useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react'
import {MdMode, MdOutlineDeleteOutline} from 'react-icons/md'
import Menu from './Menu';

interface LocalProps { // tipo de dado
  id: number,
  local: string;
}


export function Local() {
  // esta variável vai conter o username passado na navegação
  const location = useLocation();
  // recupera o username
  const username = location.state?.username || '';

  
  // vetor de Locais
  const [locals, setLocals] = useState<LocalProps[]>([])

  // variáveis de estado para os campos do formulário
  const [local, setLocal] = useState('')
  // diferencia se vai inserir (id = 0) ou editar (id não for 0) um produto
  const [id, setId] = useState(0)

  // fazer o hook useEffect para carregar os Locais da API
  // quando a página for carregada ou o username for alterado
  useEffect( () => {
    const buscaLocais = async () => {
      try {
        const resp = await fetch(`http://localhost:3000/locals`)
        const locais = await resp.json()
        if (resp.ok){
          setLocals(locais) // atualiza vetor de Locais com dados da API
        }
        else {
          console.log('Falha na busca por dados')
        }
      }
      catch(error) {
        console.log(error)
      }
    }
      buscaLocais()
  } , [username])

  // quando o vetor de Locais for alterado, executa a função useEffect
  useEffect( () => {
    setLocals(locals) // atualiza a lista de Locais
  }, [locals] ) 
  
  // função para cadastrar um produto
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault() // evita que a página seja recarregada
    // monta o objeto produto
    console.log(`${id} handle` )
    let local
    if (id == 0) { // insere
      local = {
        local
      }
    } 
    else {
      local = { // atualiza
        local
      }
    }
    let url
    let verb
    if (id == 0) { // insere
      url = `http://localhost:3000/locals`
      verb = 'POST'
    }
    else {
      url = `http://localhost:3000/locals/${id}`
      verb = 'PUT'
    }

    try {
      // chamar a API para cadastrar o produto
      console.log(url)
      console.log(verb)
      const localCadastrado = await fetch(url, {
        method: verb,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(local)
      })
      .then ( resp => { // quando o servidor respondeu
        return resp.json() // transforma em json
      })
       // atualiza a lista de Locais
       // monta uma nova lista com a lista anterior + produto cadastrado
       if (id == 0) { // insere
          setLocals([...locals, localCadastrado])
       }
       else { // atualiza na lista o produto alterado
          setLocals(locals.map( (locals) => {
            if (locals.id === id) {
              return localCadastrado
            }
            else {
              return locals
            }
          }))
       }
      }
    catch(error) {
      console.log(error)
    }
  }
  // função para remover um produto
  const handleRemove = async (id: number) => {
      let confirma = confirm('Confirma a remoção do produto?')
      if (confirma) {
        // requisição DELETE para remover um produto através da API
        await fetch(`http://localhost:3000/locals/${id}`, {
          method: 'DELETE'
        })
        .then( response => {
          return response.json()
        })
        .catch(error => {
            alert(error)
        })
        // atualiza a lista de Locais - removendo o produto deletado
        // setlocals vai receber como parâmetro a lista de Locais atual
        // retirando o produto que foi removido
        setLocals(locals.filter( (locals) => locals.id !== id ))
      }
    }

    const handleEdit = (locals: LocalProps) => {
      setLocal(locals.local)
      setId(locals.id) // vai nos ajudar na criação/edição do produto
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
              <label htmlFor="local" className="text-sm block font-bold mb-2">
                Local
              </label>
              <input type="string" id="local" value={local}
                      onChange={ (e) => setLocal(e.target.value)}
                      className="w-full bg-transparent text-black py-2 my-1 border-b border-black outline-none focus:outline-none" />
            </div>
            <button type="submit" 
              className="w-full text-white bg-[#060606] rounded-lg p-2 text-center flex-items-center justify-center">
              Criar/Editar Local
            </button>
          </form>
          {/* lista de Locais dentro de uma tabela */}
          <h2 className="font-bold mb-4"> Lista de Locais </h2>        
          <table className="w-full">
            <thead className="bg-gray-100 border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">ID</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Local</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Editar</th>
                <th className="p-3 text-sm font-semibold tracking-wide text-center">Remove</th>
              </tr>
            </thead>
            <tbody className='divide-y divide-gray-100'>
              {
                locals.map( (locals) => (
                  <tr className="" key={locals.id}>
                    <td className="p-3 text-sm text-gray-800 text-center">{locals.id}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">{locals.local}</td>
                    <td className="p-3 text-sm text-gray-800 text-center">
                      <button onClick={() => handleEdit(locals)}> 
                        <MdMode size={20}/>
                      </button>
                    </td>
                    <td className="p-3 text-sm text-gray-800 text-center">
                      <button onClick={() => handleRemove(locals.id)}> 
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