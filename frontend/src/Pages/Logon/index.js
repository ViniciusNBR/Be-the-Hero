import React, {useState} from 'react'
import {Link, useHistory} from 'react-router-dom'
import {FiLogIn} from 'react-icons/fi'
import './styles.css'
import heroesImg from '../../assets/heroes.png'
import logonImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function Logon(){
    const history = useHistory()
    const [id, setId] = useState()

    async function handleLogon(e){
        e.preventDefault()

        try{
            const response = await api.post('sessions', {id})
            
            localStorage.setItem('ongId', id) //guarda no navegador ID para ser usada depois
            localStorage.setItem('ongName', response.data.name) //guarda no navegador o nome do dono da ID para ser usada depois

            history.push('/profile')
        }catch (err){
            alert('Erro. ID ou Senha incorretos')
        }
    }

    return(
        <div className="logon-container">
            <section className="form">
                <img src={logonImg} alt="Logo Be The Hero" />

                <form onSubmit={handleLogon}>
                    <h1>Faça seu Logon</h1>

                    <input 
                        placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entar</button>

                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="E02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>

            <img src={heroesImg} alt="Heroes" />
        </div>
    )
}