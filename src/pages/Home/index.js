
import { useState } from 'react'
import './home.css'

import { Link } from 'react-router-dom'

import { auth } from '../../firebaseConnection'
import { signInWithEmailAndPassword } from 'firebase/auth'

import { useNavigate } from 'react-router-dom'

import 'bootstrap/dist/css/bootstrap.min.css';






export default function Home() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const navigate = useNavigate();

  async function handleLogin(e) {
    e.preventDefault();

    if (email !== '' && password !== '') {

      await signInWithEmailAndPassword(auth, email, password)
        .then(() => {
          // navegar para /admin
          navigate('/admin', { replace: true })
        })
        .catch(() => {
          alert("ERRO AO FAZER O LOGIN")
        })

    } else {
      alert("Preencha todos os campos!")
    }


  }


  return (
    
    <div className="container">
      <div className='row justify-content-center text-center'>

       <h1 className='text-center'> <strong>Agenda de Manicure</strong></h1>
      
        <div className='col-7 d-flex justify-content-center pt-4'>
          <form className="form" onSubmit={handleLogin}>
            <input
              type="text"
              className='color'
              placeholder="Digite seu email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              className='color'
              placeholder="******"
              value={password}
              
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className='' type="submit" >Acessar</button>
          </form>


        </div>
        <Link className="button-link pt-4" to="/register">
          Não possui uma conta? Cadastre-se
        </Link>
      </div>


    </div>
  )
}