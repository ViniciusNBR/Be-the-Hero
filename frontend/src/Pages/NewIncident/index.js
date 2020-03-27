import React, {useState} from 'react'
import './styles.css'
import {FiArrowLeft} from 'react-icons/fi'
import {Link, useHistory} from 'react-router-dom'
import LogoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function NewIncident(){
const [title, setTitle] = useState('')
const [description, setDescription] = useState('')
const [value, setValue] = useState('')
const ongId = localStorage.getItem('ongId')
const history = useHistory()

async function handleNewIncident(e){
    e.preventDefault()

    const data = {
        title,
        description,
        value,
    }

    try{
        await api.post('incidents', data, {
            headers: {
                authorization: ongId,
            }
        })

        history.push('/profile')
    }catch (err){
        alert('Erro ao cadastrar caso. Tente novamente mais tarde.')
    }
}

    return (
        <div className="newincident-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Logo Be The Hero" />

                    <h1>Cadastrar no caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um herói.</p>
                    <Link className="back-link" to="/profile">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para Home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                        placeholder="Título do caso"
                    />
                    <textarea
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        placeholder="Descrição"
                    />
                    <input
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        placeholder="Valor em R$"
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}