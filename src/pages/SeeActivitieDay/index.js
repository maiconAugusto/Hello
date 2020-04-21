import React from 'react'
import {Alert} from 'react-native'
import {Divider} from 'react-native-elements'
import {Container, 
        ContainerActivitie, 
        Title, 
        Description, 
        ContainerBtn, 
        Buttom, 
        TextBtn,
        ContainerDate,
        Days,
        ContainerDescription,
    } from './style'
    import {Icon} from 'react-native-elements'
import firebase from 'firebase'
import base64 from 'base-64'
import AsyncStorage from '@react-native-community/async-storage'

export default class SeeActivitieDay extends React.Component{
    async remove(item) {
        try {
            const _email = await AsyncStorage.getItem('@email')
            const emailCrypto = base64.encode(_email)
            firebase.database().ref('/users')
            .child(`/${emailCrypto}/activities/`)
            .child(item.id).remove()
            .then(() => {
                Alert.alert(
                    'Atenção!',
                    'Atividade removida com sucesso!'
                )
                setTimeout(() => {
                    this.props.navigation.goBack()
                }, 2000);
            })

            
        }
        catch(error) {}
    }
    async complete(item) {
        try {
            const _email = await AsyncStorage.getItem('@email')
            const emailCrypto = base64.encode(_email)
            firebase.database().ref('/users')
            .child(`/${emailCrypto}/activities/`)
            .child(item.id).update({done: true})
            .then(() => {
                Alert.alert(
                    'Atenção!',
                    'Atividade concluida com sucesso!'
                )
                setTimeout(() => {
                    this.props.navigation.goBack()
                }, 2000);
            })
        }
        catch(error) {}
    }
    inverteData(date) {
        try {
            const data = date.split('-')
            const dia = data[2]
            const mes = data[1]
            const ano = data[0]
            const dateFormated = `${dia}/${mes}/${ano}`
            return dateFormated
        }
        catch(error) {}
    }
    render() {
        const item = this.props.navigation.getParam('item')
        return(
            <Container>
                <ContainerDate>
                <Days>{this.inverteData(item.date)}{'  -  '}</Days>
                    <Days>{ item.hour}</Days>
                </ContainerDate>
                <ContainerActivitie>
                    <Title>{item.title}</Title>
                    <Divider style={{margin: 16}}/>
                    <ContainerDescription>
                        <Description>{item.description}</Description>
                    </ContainerDescription>
                    <ContainerBtn>
                        <Buttom onPress={() => this.remove(item)}>
                            <Icon name='delete' size={30} color='red' />
                        </Buttom>
                        <Buttom onPress={() => this.complete(item)}>
                            <Icon name='check' size={30} color='green' />
                        </Buttom>
                    </ContainerBtn>
                </ContainerActivitie>
            </Container>
        )
    }
}