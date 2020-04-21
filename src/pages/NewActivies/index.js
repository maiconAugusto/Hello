import React from 'react'
import {Container, Input, Button, ButtonText, ContainerDate, Title, TitleNew, ContinerBord, View, DayEndHour} from './style'
import DateTimePicker from '@react-native-community/datetimepicker'
import {Icon} from 'react-native-elements'
import { TouchableOpacity } from 'react-native-gesture-handler'
import {ActivityIndicator ,ToastAndroid, Alert} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'
import base64 from 'base-64'

export default class NewAtictive extends React.Component{
    constructor(props){
        super(props)
            this.state={
                date: '',
                hour: '',
                title: '',
                description:'',
                btnDisable: false,
                show: false,
                showDate: false,
                loading: false,
                id: '',

            }
    }
    async componentWillMount() {
        const _id = await AsyncStorage.getItem('id')
        this.setState({date: '0000-00-00', hour: '00:00', id: _id})
    }

    async saveActivities(){
        try {
            const {date, hour, title, description, id} = this.state
            this.setState({loading: true, btnDisable: true})
            if(title === '' || hour === '00:00' || date === '0000-00-00') {
                this.AlertUser()
                this.setState({loading: false, btnDisable: false})
                return
            }
        const _email = await AsyncStorage.getItem('@email')
        const emailCrypto = base64.encode(_email)

        const key = firebase.database().ref(`/users/`).child(`${emailCrypto}/activities/`).push().key
        firebase.database().ref(`/users/`).child(`${emailCrypto}/activities/`).child(key).set({
            id_user: id,
            id: key,
            title: title,
            hour: hour,
            description: description,
            date: date,
            done: false,
        })
          .then(() => {
            this.setState({
                loading: false, 
                btnDisable: false,
                title: '',
                description: '',
                date: '00-00-0000',
                hour: '00:00',
            })
            Alert.alert(
                'Parabéns!',
                'Sua atividade foi realizada com sucesso!'
            )
          })
        }catch(error) {
            this.setState({loading: false, btnDisable: false})
        }
    }
    AlertUser() {
        ToastAndroid.showWithGravityAndOffset(
            'Preencha todos os campos!',
            ToastAndroid.LONG,
            ToastAndroid.TOP,
            25,
            200,
        )
    }
    inverteData(date) {
        try {
            const data = date.split('-')
            const dia = data[2]
            const mes = data[1]
            const ano = data[0]
            const dateFormated = `${dia}-${mes}-${ano}`
            return dateFormated
        }
        catch(error) {}
    }
      
    onChange = (date, a) => {
        try {
            const data = new Date(a)
            let hora = data.getHours()
            let min = data.getMinutes()
          
            if (hora.toString().length === 1) {
              hora = `0${hora}`
            }
          
            if (min.toString().length === 1) {
              min = `0${min}`
            }
            const horaFim = `${hora}:${min}`
            const hour_ = horaFim === 'NaN:NaN' ? '00:00' : horaFim
            this.setState({hour: hour_, show: false})
        }
        catch(error) {}
    }

    onChangeDate(date, a) {
        try {
            const data = new Date(a)
            let dia = data.getDate()
            let mes = data.getMonth() + 1
            const ano = data.getFullYear()
        
            if (dia.toString().length === 1) {
            dia = `0${dia}`
            }
        
            if (mes.toString().length === 1) {
            mes = `0${mes}`
            }
            const dateFormated = `${ano}-${mes}-${dia}`
            const date_ = dateFormated === 'NaN-NaN-NaN' ? '00-00-0000' : dateFormated
            this.setState({date: date_, showDate: false})
        }
        catch(error) {}
    }
    
    setShowDate() {
        const {showDate} = this.state
        if(showDate === false) {
            this.setState({showDate: true})
        }
    }

    setShow() {
        const {show} = this.state
        if(show === false) {
            this.setState({show: true})
        }
    }
    render() {
        return(
            <Container> 
              <ContinerBord>
                  <View>
                        <Icon 
                        name='create'
                        size={20}
                        color='white'
                        containerStyle={{marginRight: 8}}
                        />
                        <TitleNew>Nova atividade</TitleNew>
                  </View>
                    <Title>Adicione o nome da atividade:</Title>
                    <Input 
                    value={this.state.title}
                    placeholder=' Nome da atividade'
                    onChangeText={text => this.setState({title: text})}
                    autoCorrect={false}
                    maxLength={30}
                    />
                    <Title>Adicione a decrição da atividade:</Title>
                    <Input 
                    value={this.state.description}
                    style={{height: 150, textAlignVertical: 'top'}} 
                    placeholder=' Descrição da atividade'
                    onChangeText={text => this.setState({description: text})}
                    multiline
                    scrollEnabled
                    blurOnSubmit
                    returnKeyType='done'
                    autoCorrect={false}
                    underlineColorAndroid='transparent'
                    autoCapitalize='sentences'
                    maxLength={250}
                    />
                    <Title>Adicione a data e hora da atividade:</Title>
                    <ContainerDate> 
                    <TouchableOpacity onPress={()=> this.setShowDate()}>
                        <Icon 
                        name='event'
                        color='white'
                        size={40}
                        containerStyle={{marginTop: 10}}
                        />
                        <DayEndHour>{this.inverteData(this.state.date)}</DayEndHour>
                    </TouchableOpacity>
                    {this.state.showDate && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={new Date()}
                            mode='date'
                            is24Hour={true}
                            display="default"
                            onChange={(date, a)=> this.onChangeDate(date, a)}
                            />
                        )}
                        <TouchableOpacity onPress={()=> this.setShow()}>
                            <Icon 
                            name='schedule'
                            color='white'
                            size={40}
                            containerStyle={{marginTop: 10}}
                            />
                            <DayEndHour>{this.state.hour}</DayEndHour>
                        </TouchableOpacity>
                        {this.state.show && (
                            <DateTimePicker
                            testID="dateTimePicker"
                            timeZoneOffsetInMinutes={0}
                            value={new Date()}
                            mode='time'
                            is24Hour={true}
                            showIcon={true}
                            display="default"
                            onChange={(date, a)=> this.onChange(date, a)}
                            />
                        )}
                    </ContainerDate>
                    <Button 
                    disabled={this.state.btnDisable}
                    onPress={() => this.saveActivities()}
                    >
                        {this.state.loading === true ? 
                        ( <ActivityIndicator color='#3352F1' size='large' /> ) :
                        <ButtonText>Salvar</ButtonText>
                        }
                    </Button>
              </ContinerBord>
            </Container>
        )
    }
}