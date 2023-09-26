import Fornecedor from './components/Fornecedor'
import Login from './components/Login'
import Local from './components/Local'
import { ProdutoP } from './components/ProdutoP'
import './styles/global.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import Estado from './components/Estado'
// componente funcional
function App() {
  return (
    <Router>
      <div className="flex">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/produto" element={<ProdutoP />} />
          <Route path="/local" element={<Local/>}/>
          <Route path="/fornecedor" element={<Fornecedor/>}/>
          <Route path="/estado" element={<Estado/>}/>
        </Routes>
      </div>
    </Router>
  )
}
export default App
