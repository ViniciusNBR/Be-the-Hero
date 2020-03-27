import React, {useState, useEffect} from 'react' //useEffect é usada para disparar um evento automático pré cadastrado
import './styles.css'
import logoImg from '../../assets/logo.svg'
import {Link, useHistory} from 'react-router-dom'
import {FiPower, FiTrash2} from 'react-icons/fi'
import api from '../../services/api'

export default function Profile(){
    const [incidents, setIncidents] = useState([]) //com array vazia para receber as informações
    const ongName = localStorage.getItem('ongName') //busca o item armazedo no no navegador
    const ongId = localStorage.getItem('ongId') //busca o item armazedo no no navegador
    // useEffect(() => {}, []) recebe dois parametros, a primeira é qual função você deseja que seja executata. Neste caso a função para carregar os casos.
    //o segundo parametro é de quando esse função será executada, neste caso, assim que a página carregar.
    const history = useHistory()

    useEffect(() => {
            api.get('profile',
            {headers: {
                authorization: ongId,
            }
        }).then(response =>{
            setIncidents(response.data) //clocando o resultado da consulta ao profile dentro de incidents
        })
    }, [ongId])

    async function handleDelete(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    authorization: ongId,
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id)) //exclui em tempo real, sem precisar regarregar a tela, o caso deletado.
        }catch (err){
            alert('Erro ao tentar deletar caso. Tente novamente mais tarde.')
        }
    }

    function handleLogout(){
        localStorage.clear()
        history.push('/')
    }
    
    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo Be The Hero" />
                <span>Bem-vinda {ongName}</span>

                <Link className="button" to="incidents/new">Cadastrar novo caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E02041" />
                </button>
            </header>

            <h1>Casos cadastrados</h1>
            <ul>
               {incidents.map(incident => ( 
                    <li key={incident.id}>
                    <strong>CASO</strong>
                    <p>{incident.title}</p>
                    <strong>DESCRIÇÃO</strong>
                    <p>{incident.description}</p>
                    <strong>VALOR</strong>
                    <p>{Intl.NumberFormat('Pt-br', {style: 'currency', currency: 'BRL'}).format(incident.value)}</p>
                    <button onClick={() => handleDelete(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
               ))}
            </ul>
        </div>
    )
}