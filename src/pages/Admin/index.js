import { useState, useEffect } from 'react'
import './admin.css'

import { auth, db } from '../../firebaseConnection'
import { signOut } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

import 'bootstrap/dist/css/bootstrap.min.css';

import {
  addDoc,
  collection,
  onSnapshot,
  query,
  orderBy,
  where,
  doc,
  deleteDoc,
  updateDoc
} from 'firebase/firestore'

export default function Admin() {
  const [nomeInput, setNomeInput] = useState('')
  const [user, setUser] = useState({})
  const [edit, setEdit] = useState({})
  const navigate = useNavigate();

  const [value, onChange] = useState(new Date());

  const [nome, setNome] = useState([]);

  const [horaInput, setHoraInput] = useState([]);
  
  const [clienteInput, setClienteInput] = useState('')
  const [clienteSelect, setClienteSelect] = useState('')

  const [preco, setpreco] = useState('')
  

  useEffect(() => {
    async function loadTarefas() {
      const userDetail = localStorage.getItem("@detailUser")
      setUser(JSON.parse(userDetail))

      if (userDetail) {
        const data = JSON.parse(userDetail);

        const tarefaRef = collection(db, "tarefas")
        const q = query(tarefaRef, where("userUid", "==", data?.uid))

        const unsub = onSnapshot(q, (snapshot) => {
          let lista = [];

          snapshot.forEach((doc) => {
            lista.push({
              id: doc.id,
              hora: doc.data().hora,
              nome: doc.data().nome,
              preco: doc.data().preco,
              cliente: doc.data().cliente,
              userUid: doc.data().userUid,
            })
          })

          setNome(lista);


        })

      }

    }

    loadTarefas();
  }, [])


  async function handleRegister(e) {
    e.preventDefault();

    if (nomeInput === '') {
      alert("Digite sua tarefa...")
      return;
    }

    if (edit?.id) {
      handleUpdateTarefa();
      return;
    }


    await addDoc(collection(db, "tarefas"), {
      nome: nomeInput,
      hora: horaInput,
      preco: preco,
      cliente: clienteSelect,
      created: new Date(),
      userUid: user?.uid

    })
      .then(() => {
        console.log("TAREFA REGISTRADA")
        setNomeInput('')
      })
      .catch((error) => {
        console.log("ERRO AO REGISTRAR " + error)
      })


  }

  async function handleLogout() {
    await signOut(auth);
  }
  


  async function deleteTarefa(id) {
    const docRef = doc(db, "tarefas", id)
    await deleteDoc(docRef)
  }

  function editTarefa(item) {
    setNomeInput(item.nome)
    setEdit(item);
  }


  async function handleUpdateTarefa() {
    const docRef = doc(db, "tarefas", edit?.id)
    await updateDoc(docRef, {
      nome: nomeInput,
      hora: horaInput,
      preco: preco,
      cliente:clienteSelect
    })
      .then(() => {
        console.log("TAREFA ATUALIZADA")
        setNomeInput('')
        setHoraInput('')
        setClienteSelect('')
        setpreco('')
        setEdit({})
      })
      .catch(() => {
        console.log("ERRO AO ATUALIZAR")
        setNomeInput('')

        setEdit({})
      })
  }

  return (
    <div className='container-fluid'>
      <div className='title text-center'>
     <h1> <strong>Manicure</strong></h1>
      </div>
      <div className='row'>
        <div className='col-12 col-md-4 d-flex d-md-block justify-content-center'>
         
        </div>

        <div className='col-12 col-md-8'>

          <form className="form" onSubmit={handleRegister}>
            <input
              className='form-control'
              placeholder="Digite o nome do cliente..."
              value={nomeInput}
              onChange={(e) => setNomeInput(e.target.value)}
            />
              
              <input
              className='form-control'
              placeholder="Digite o preço..."
              value={preco}
              onChange={(e) => setpreco(e.target.value)}
            />
  
  <select className='form-control' value={clienteSelect} onChange={(e) => setClienteSelect(e.target.value)}>
  <option value="">Selecione uma opção</option>
  <option value="PintarUnha">Pintar unha</option>
  <option value="colocarUnha">Colocar unha postiça</option>
  
</select>
<br/>

<select className='form-control' value={horaInput} onChange={(e) => setHoraInput(e.target.value)}>
  <option value="">Selecione o horário</option>
  <option value="8:00">8:00</option>
  <option value="9:00">9:00</option>
  <option value="10:00">10:00</option>
  <option value="11:00">11:00</option>
  <option value="13:00">13:00</option>
  <option value="14:00">14:00</option>
  <option value="15:00">15:00</option>
  <option value="16:00">16:00</option>
  <option value="17:00">17:00</option>
</select>

<br/>







            {Object.keys(edit).length > 0 ? (
              <button className="btn btn-primary" type="submit">Atualizar tarefa</button>
            ) : (
              <button className="btn btn-primary" type="submit">Registrar tarefa</button>
            )}
          </form>


          <br/>
     
      <div  className='bloco'>

          {nome.map((item) => (
            <article key={item.id} className="list">
              <p>Nome do cliente:{item.nome}
              <br/>
              Preço:{item.preco}
             <br/>
      Horário marcado:{item.hora}
      <br/>
           Descrição:{item.cliente}
         </p>
         
        
              <div>
                <button className='btn btn-outline-primary' onClick={() => editTarefa(item)}>Editar</button>
                <button className="btn btn-outline-warning" onClick={() => deleteTarefa(item.id)} >Concluir</button>
              </div>
            </article>
          ))}
          </div>

         
          <button className="btn-logout" onClick={handleLogout}>Sair</button>
        </div>

      </div>
    </div>
  )
          }
        