import React, {useState, useEffect} from 'react' //useEffect dispara uma função
import {View, FlatList, Image, Text, TouchableOpacity} from 'react-native' // Flatlist faz uma lista cujo usuário consegue rolar caso ela tenha passado da tela. TouchableOpacity tirna um objeto qualquer 'tocavel' e retorna uma interação.
import {useNavigation} from '@react-navigation/native' // useNavigation serve para o usuário navegar entre páginas no mobile.
import {Feather} from '@expo/vector-icons'
import logoImg from '../../assets/logo.png'
import styles from './styles'
import api from '../../services/api'

export default function Incidents(){
    const navigation = useNavigation()
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)
    
    function navigateToDetail(incident){
        navigation.navigate('Detail', {incident})
    }

    async function loadIncidents(){
        if (loading){
            return
        }

        if (total > 0 && incidents.length == total){
            return
        }

        setLoading(true)

        const response = await api.get('incidents', {
            parms: {page}
        })

        setIncidents([... incidents, ... response.data])
        setTotal(response.headers['X-Total-Count'])
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents()
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos.</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
        
            <FlatList 
                style={styles.incidentsList}
                data={[incidents]}
                keyExtractor={incident => String(incident.id)}
                showsVerticalScrollIndicator={false}
                onEndReached={loadIncidents} // essa propriedade de flatlist dispara uma função automática quando o usuário chega ao final da tela.
                onEndReachedThreshold={0.2} // essa propriedade diz a quantos porcento (no caso 20%) do final da tela o usuário precisa estar para a função na propriedade acima dispare.
                renderItem={({item: incident}) => (
                    <View style={styles.incident}>
                        <Text style={styles.property}>ONG</Text>
                        <Text style={styles.Value}>{incident.name}</Text>

                        <Text style={styles.property}>Caso</Text>
                        <Text style={styles.Value}>{incident.title}</Text>
                        
                        <Text style={styles.property}>Valor</Text>
                        <Text style={styles.Value}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>

                        <TouchableOpacity style={styles.detailsButton} onPress={() => navigateToDetail(incident)}>
                            <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                            <Feather name="arrow-right" size={16} color="#E02041" />
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    )
}