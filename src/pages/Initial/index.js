import React from 'react'
import {StatusBar, ActivityIndicator, ToastAndroid, Modal} from 'react-native'
import {Contanainer, Title, Fx, TitleInfo, Input, Buttom, TitleButtom, ContanainerModal} from './style'
import AsyncStorage from '@react-native-community/async-storage'
import Validade from 'email-validator'
import base64 from 'base-64'
import axios from 'axios'
import firebase from '../../services/firebase'
import OneSignal from 'react-native-onesignal'

export default class Initial extends React.Component{
    constructor(props){
        super(props)
            this.state={
                name: '',
                email: '',
                password: '',
                loading: false,
                disableBtn: false,
                modal: false
            }
        OneSignal.init('5da79728-4265-4cb2-8ba5-40f67f7b048f')
        OneSignal.addEventListener('received',this.onReceived)
        OneSignal.addEventListener('opened',this.onOpened)
        OneSignal.addEventListener('ids',this.onIds)
    }
    componentWillMount() {
        OneSignal.removeEventListener('received',this.onReceived)
        OneSignal.removeEventListener('opened',this.onOpened)
        OneSignal.removeEventListener('ids',this.onIds)
    }
    onReceived = (data)=> {

    }
    onOpened = async(notification) => {
        const logged = await AsyncStorage.getItem('@email')
        if(logged !== null){
            this.props.navigation.navigate('ActivitiesDay')
            return
        }
    }
    onIds = (id) =>{
  
    }
    async saveUser() {
        const {name, email, password} = this.state
        const emailValidade = Validade.validate(email)
        if (this.state.email === '' || this.state.password === '') {
            this.AlertUser()
            return
        }
        if(emailValidade === false) {
            this.AlertEmail()
            return
        }
        if (password.length < 5) {
            this.AlertUserPassword()
            return
        }
        this.setState({loading: true, disableBtn: true})
        const _id = Math.floor(Math.random(80000) * 200 * 56)
        AsyncStorage.setItem('@email',email)

        const emailCrypto = base64.encode(email)
        const passwordCrypto = base64.encode(password)
        
        firebase.database().ref('users/')
            .once('value')
              .then((response) => {
                  const users = Object.values(response.val() === null ? [] : response.val())
                    const responseUsers = users.filter(element=> {
                        return element.acount.email === email
                    })
                    if(responseUsers.length === 0) {
                        axios.put(`/users/${emailCrypto}/acount/.json`,{
                            id: _id, 
                            name, 
                            email, 
                            password: 
                            passwordCrypto, 
                            active: true,
                        })
                        .then(()=> {
                            this.setState({
                                loading: false, 
                                disableBtn: false,
                                name: '',
                                email: '',
                                password: '',
                            })
                            this.props.navigation.replace('Home')
                        })
                        .catch(() => {
                            this.setState({loading: false, disableBtn: false})
                            this.AlertError()
                        })
                    }
                    if (responseUsers[0].acount.email === email) {
                        this.AlertEmailExit()
                        this.setState({loading: false, disableBtn: false})
                        return
                    }
              })
    }
    async loggin() {
        const emailValidade = Validade.validate(this.state.email)
        if (this.state.email === '' || this.state.password === '') {
            this.AlertUser()
            return
        }
        if(emailValidade === false) {
            this.AlertEmail()
            return
        }
        this.setState({loading: true, disableBtn: true})

        this.setState({loading: true, disableBtn: true})
        const _id = Math.floor(Math.random(80000) * 200 * 56)
        AsyncStorage.setItem('@email',this.state.email)

        const emailCrypto = base64.encode(this.state.email)
        const passwordCrypto = base64.encode(this.state.password)
        
        firebase.database().ref(`users/${emailCrypto}`)
            .once('value')
              .then((response) => {
                  if (response.val() === null) {
                    this.setState({loading: false, disableBtn: false})
                      this.LogginFail()
                      return
                  }
                  if (response.val().acount.password === passwordCrypto) {
                      this.setState({
                          loading: false, 
                          disableBtn: false,
                          email: '',
                          password: '',
                          modal: false,
                        })
                      this.props.navigation.replace('Home')
                      return
                  }
                  if (response.val().acount.password !== passwordCrypto) {
                    this.setState({
                        loading: false, 
                        disableBtn: false,
                    })
                    this.LogginPassword()
                    return     
                  }
              })

    }
    LogginPassword() {
        ToastAndroid.showWithGravityAndOffset(
            'Senha incorreta!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            250,
        )
    }
    LogginFail() {
        ToastAndroid.showWithGravityAndOffset(
            'Usuário não encontrado!!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            250,
        )
    }
    AlertError() {
        ToastAndroid.showWithGravityAndOffset(
            'Algo deu errado, tente de novo!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            250,
        )
    }
    AlertEmailExit() {
        ToastAndroid.showWithGravityAndOffset(
            'Este e-mail já está cadastrado',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            250,
        )
    }

    AlertEmail() {
        ToastAndroid.showWithGravityAndOffset(
            'E-mail inválido',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            250,
        )
    }

    AlertUserPassword() {
        ToastAndroid.showWithGravityAndOffset(
            'Senha com no mínino 6 caracteres',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            250,
        )
    }

    AlertUser() {
        ToastAndroid.showWithGravityAndOffset(
            'Preencha todos os campos!',
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            5,
            250,
        )
    }
    modal() {
        return(
            <Modal animationType='fade'  visible={this.state.modal}>
                <ContanainerModal>
                    <Contanainer start={{x: 1, y: 1}} end={{x: 0, y: 0}} colors={['#3352F1', '#265EC4', '#5FFBF1']}>
                        <Fx>
                            <Title>Hello</Title>
                        </Fx>
                        <Input
                        autoCorrect={false}
                        onChangeText={text => this.setState({email: text})}
                        placeholder='E-mail'
                        placeholderTextColor = '#616161'
                        autoCapitalize='none'
                        />
                        <Input
                        secureTextEntry={true}
                        autoCorrect={false}
                        onChangeText={text => this.setState({password: text})}
                        placeholder='Senha'
                        placeholderTextColor = '#616161'
                        keyboardType='default'
                        />
                        <Buttom 
                        disabled={this.state.disableBtn}
                        color={'white'} 
                        onPress={() => this.loggin()}>
                            {this.state.loading === false ? (<TitleButtom>Acessar</TitleButtom>) 
                            : (<ActivityIndicator size='large' color='#3352F1' />)}
                        </Buttom>
                        <Buttom 
                        color={'transparent'} 
                        onPress={() => this.setState({modal: false})}
                        style={{marginLeft: '30%', marginRight: '30%'}}
                        >
                            <TitleButtom style={{color: 'white'}}>Voltar</TitleButtom>
                        </Buttom>
                    </Contanainer>
                </ContanainerModal>
            </Modal>
        )
    }
    render() {
        return(
            <>
                <StatusBar backgroundColor='#3352F1'/>
                <Contanainer start={{x: 1, y: 0}} end={{x: 0, y: 1}} colors={['#3352F1', '#265EC4', '#5FFBF1']}>
                    <Fx>
                        <Title>Hello</Title>
                    </Fx>
                    <TitleInfo>É simples e rapído</TitleInfo>
                    <Input
                    autoCorrect={false}
                    autoCapitalize='sentences'
                    onChangeText={text => this.setState({name: text})}
                    placeholder='Seu nome'
                    placeholderTextColor = '#616161'
                    />
                    <Input
                    autoCorrect={false}
                    autoCapitalize='none'
                    onChangeText={text => this.setState({email: text})}
                    placeholder='Um e-mail super fácil'
                    placeholderTextColor = '#616161'
                    />
                    <Input
                    secureTextEntry={true}
                    autoCorrect={false}
                    autoCapitalize='none'
                    onChangeText={text => this.setState({password: text})}
                    placeholder='Sua senha secreta'
                    placeholderTextColor = '#616161'
                    keyboardType='default'
                    />
                    <Buttom 
                    disabled={this.state.disableBtn}
                    color={'white'} 
                    onPress={() => this.saveUser()}>
                        {this.state.loading === false ? (<TitleButtom>Entrar</TitleButtom>) 
                        : (<ActivityIndicator size='large' color='#3352F1' />)}
                    </Buttom>
                    <Buttom 
                    color={'transparent'} 
                    onPress={() => this.setState({modal: true})}
                    style={{marginLeft: '30%', marginRight: '30%'}}
                    >
                        <TitleButtom style={{color: 'white'}}>Já tenho conta</TitleButtom>
                    </Buttom>
                    {this.modal()}
                </Contanainer>
            </>
        )
    }
}