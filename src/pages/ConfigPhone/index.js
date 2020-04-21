import React from 'react'
import {ToastAndroid} from 'react-native'
import {Container, ContainerExit, ContainerName, Buttom, ButtomText, Title} from './style'
import {Input} from 'react-native-elements'
import Icon from 'react-native-vector-icons/FontAwesome';
import {RectButton} from 'react-native-gesture-handler'
import firebase from 'firebase'
import base64 from 'base-64'
import AsyncStorage from '@react-native-community/async-storage'

export default class Config extends React.Component{
  constructor(props){
    super(props)
      this.state = {
        name: '',
        
      }
  }

  async modifyName() {
    try{
      const {name} = this.state
      const _email = await AsyncStorage.getItem('@email')
      const emailCrypto = base64.encode(_email)
      firebase.database().ref('/users').child(`/${emailCrypto}/acount`).update({name})
        .then(()=>{
          this.AlertSucess()
        })
    }
    catch(error){}
  }
  AlertSucess() {
    ToastAndroid.showWithGravityAndOffset(
        'Usuário atualizado com sucesso!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        200,
    )
  }
  AlertUser() {
    ToastAndroid.showWithGravityAndOffset(
        'Informe o nome do usuário!',
        ToastAndroid.LONG,
        ToastAndroid.TOP,
        25,
        200,
    )
  }
  async ExitApp() {
    await AsyncStorage.removeItem('@email').then(() =>{
      this.props.navigation.navigate('Initial')
    })
  }
    render() {
        return(
            <Container>
                <Title>Alterar nome de usuário</Title>
                <ContainerName>
                    <Input 
                    maxLength={30}
                    leftIcon={
                        <Icon
                          name='user'
                          size={24}
                          color='#616161'
                        />
                      }
                      onChangeText={(text) => this.setState({name: text})}
                    />
                </ContainerName>
                <Buttom onPress={() => this.modifyName()}>
                    <ButtomText>Salvar</ButtomText>
                </Buttom>
                <ContainerExit>
                  <RectButton 
                  onPress={() => this.ExitApp()}
                    style={{
                            height: 50, 
                            width: 170, 
                            backgroundColor: 'white', 
                            borderRadius: 100,
                            justifyContent: 'center'
                        }}>
                      <ButtomText>Sair do App</ButtomText>
                  </RectButton>
                </ContainerExit>
            </Container>
        )
    }
}