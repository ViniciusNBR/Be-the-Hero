import React, {useState} from 'react' // useState é um função do react usado para mudar o estado (valor) de um função sem recarregar toda a página
import {Link, useHistory} from 'react-router-dom' //Link permite que vc use links e navegue entre páginas com react. useHistory permite que vc use o historico de navegação do usuário para enviálo automaticamente para uma nova página.
import {FiArrowLeft} from 'react-icons/fi'
import './styles.css'
import LogoImg from '../../assets/logo.svg'
import api from '../../services/api'

export default function Register(){

    const history = useHistory() //colocando a função dentro de uma variável.

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    async function handleRegister(e){ //A função esta recebendo o evento do form
        e.preventDefault() // E usando este evento para previnir o comportamento padrão de regarregamento da página
    
        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        }

        try{
            const response = await api.post('ongs', data)
            alert(`Seu ID de acesso é: ${response.data.id}`)

            history.push('/') //usando a variável para dar um "push" na página raiz da aplicação
        }catch (err){
            alert('Erro no cadastro. Tente novamente mais tarde')
        }
    }
    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={LogoImg} alt="Logo Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude as pessoas a encontrar os casos da sua ONG</p>
                    <Link className="back-link" to="/">
                        <FiArrowLeft size={16} color="#e02041" />
                        Voltar para Logon
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input 
                        placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)}
                    />
                    <input
                        type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)}
                    />
                    <input
                        placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="imput-group">
                        <input
                            placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)}
                        />
                        <input
                            placeholder="UF"
                            style={{width: 80}}
                            value={uf}
                            onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    )
}