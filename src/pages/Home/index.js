import React from 'react'
import {StatusBar} from 'react-native'
import {Container, Header, Main, Select, SelectText, NameProfile, Date} from './style'
import {Icon} from 'react-native-elements'
import firebase from 'firebase'
import AsyncStorage from '@react-native-community/async-storage'
import moment from 'moment'
import 'moment/locale/pt-br'
moment.locale('pt-br')
import base64 from 'base-64'

export default class Home extends React.Component{
    constructor(props){
        super(props)
            this.state={
                name: ''
            }
    }
    async componentDidMount() {
        try{
            const _email = await AsyncStorage.getItem('@email')
            const emailCrypto = base64.encode(_email)
            firebase.database().ref('/users').child(`/${emailCrypto}/acount/`)
                .on('value',snapshot => {
                    this.setState({name: snapshot.val().name})
                })
        }
        catch(error) {}
    }
    render(){
        return(
            <Container>
                <StatusBar backgroundColor='#3352F1' />
                <Header >
                    <NameProfile>{`Ola ${this.state.name}`}</NameProfile>
                    <Date>{moment().format('dddd')}{' '}
                    {moment().format('L')}
                    </Date>
                </Header>
                <Main>
                    <Select onPress={() => this.props.navigation.navigate('NewAtictive')}>
                        <Icon 
                        name='add' 
                        color='#3352F1' 
                        containerStyle={{marginBottom: 4}}
                        />
                        <SelectText>nova atividade</SelectText>
                    </Select>
                    <Select onPress={() => this.props.navigation.navigate('ActivitiesDay')}>
                        <Icon 
                        name='whatshot' 
                        color='#3352F1' 
                        containerStyle={{marginBottom: 4}}
                        />
                        <SelectText>Atividade do dia</SelectText>
                    </Select>
                    <Select onPress={() => this.props.navigation.navigate('Activies')}>
                        <Icon 
                        name='event' 
                        color='#3352F1'
                        containerStyle={{marginBottom: 4}}
                        />
                        <SelectText>Calendário</SelectText>
                    </Select>
                    <Select>
                        <Icon 
                        name='event-note' 
                        color='#3352F1' 
                        containerStyle={{marginBottom: 4}}
                        />
                        <SelectText>Eventos</SelectText>
                    </Select>
                    <Select>
                        <Icon 
                        name='smartphone' 
                        color='#3352F1' 
                        containerStyle={{marginBottom: 4}}
                        />
                        <SelectText>Opções</SelectText>
                    </Select>
                    <Select onPress={() => this.props.navigation.navigate('Config',{name: this.state.name})}>
                        <Icon 
                        name='settings' 
                        color='#3352F1' 
                        containerStyle={{marginBottom: 4}}
                        />
                        <SelectText>Configurações</SelectText>
                    </Select>
                </Main>
            </Container>
        )
    }
}