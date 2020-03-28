import React from 'react'
import {View, Image, Text, Linking} from 'react-native'
import {useNavigation, useRoute} from '@react-navigation/native' //useRoute permite armazenar rotas do app
import logoImg from '../../assets/logo.png'
import styles from './styles'
import {Feather} from '@expo/vector-icons'
import { TouchableOpacity } from 'react-native-gesture-handler'
import * as MailComposer from 'expo-mail-composer'

export default function Detail(){
    const navigation = useNavigation()
    const route = useRoute()
    const incident = route.params.incident

    const message = `Olá ${incident.name}, gostaria de ser o herói do caso ${incident.title} com o valor de ${Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}`

    function navigateToIncidents(){
        navigation.goBack()
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject: `Herói do caso: ${incident.title}`,
            recipients: ['diogo@rocketseat.com.br'],
            body: message,
        })
    }

    function sendWhatsapp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`)
    }

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />

                <TouchableOpacity onPress={navigateToIncidents}>
                    <Feather name="arrow-left" size={28} color="#E82041" />
                </TouchableOpacity>
            </View>

            <View style={styles.incident}>
                <Text style={[styles.property, {marginTop: 0}]}>ONG</Text>
                <Text style={styles.Value}>{incident.name} de {incident.city}/{incident.uf}</Text>

                <Text style={styles.property}>Caso</Text>
                <Text style={styles.Value}>{incident.title}</Text>
                        
                <Text style={styles.property}>Valor</Text>
                <Text style={styles.Value}>{Intl.NumberFormat('pt-BR', {style: 'currency', currency: 'BRL'}).format(incident.value)}</Text>
            </View>
            
            <View style={styles.contactBox}>
                <Text style={styles.heroTitle}>Salve o dia!</Text>
                <Text style={styles.heroTitle}>Seja o herói desse caso.</Text>
                <Text style={styles.heroDescription}>Entre em contato.</Text>
                

                <View style={styles.actions}>
                    <TouchableOpacity style={styles.action} onPress={sendWhatsapp}>
                        <Text style={styles.actionText}>Whatsapp</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.action} onPress={sendMail}>
                        <Text style={styles.actionText}>E-mail</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}