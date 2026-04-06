import { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, Link} from 'react-router';
import Home from './componentes/Home'
import Favoritos from './componentes/Favoritos'
import Original from './componentes/Original'
import Informativa from './componentes/Informativa'
import Usuarios from './componentes/Usuarios'
import Equipo from './componentes/Equipo' 
import './App.css'

function App() {
  return (
    <>
    <Router>
       <nav className='c-menu'>
          <Link to="/home">home</Link>
          <Link to="/favoritos">fav</Link>
          <Link to="/original">Org</Link>
          <Link to="/informativa">Info</Link>
          <Link to="/usuarios">Usu</Link>
        </nav>
      <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/favoritos' element={<Favoritos/>} />
          <Route path='/original' element={<Original/>} />
          <Route path='/informativa' element={<Informativa/>} />
          <Route path='/usuarios' element={<Usuarios/>} />
          <Route path='/' element={<Equipo/>} />
        </Routes>
    </Router>
          </>
  )
}

export default App
