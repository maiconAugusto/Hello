import React from 'react'
import {Container, ItemContainer, TextInfo, ContainerInfo, Text, TextHour} from './style'
import {FlatList, TouchableOpacity, View, ActivityIndicator} from 'react-native'
import moment from 'moment'
import { Icon } from 'react-native-elements'
import AsyncStorage from '@react-native-community/async-storage'
import firebase from 'firebase'
import base64 from 'base-64'

export default class ActivitiesDay extends React.Component{
    constructor(props){
        super(props)
            this.state={
                data: [],
                loading: false
            }
    }
    componentWillMount() {
        this.setState({loading: true})
    }
    async componentDidMount() {
        try {
            const date = moment().format('YYYY-MM-DD')
            const _email = await AsyncStorage.getItem('@email')
            const emailCrypto = base64.encode(_email)

            await firebase.database().ref('/users').child(`/${emailCrypto}/activities`)
              .on('value',snapshot => {
                  const data = Object.values(snapshot.val() === null ? [] : snapshot.val())
                  const aux = []
                  data.map(element => {
                      if (element.date === date) {
                          aux.push(element)
                      }
                  })
                  this.setState({data:aux, loading: false})
              })
              
        }
        catch(error) {}
    }
    render() {
        return(
            <Container>
                {this.state.loading === true ? (
                    <ActivityIndicator size='large' style={{marginTop: 100}} color='#3352F1' />
                ) : (
                    this.state.data.length === 0 ? 
                        <ContainerInfo>
                            <TextInfo>Não a atividades para hoje!</TextInfo>
                        </ContainerInfo>
                        : 
                        <FlatList 
                        data={this.state.data}
                        renderItem={({item}) => {
                            return(
                                <ItemContainer
                                start={{x: 0, y: 0}} end={{x: 2, y: 0}} 
                                colors={['#3352F1', '#626EFF', '#898BFF']}
                                >
                                    <TouchableOpacity onPress={() => this.props.navigation.navigate('SeeActivitieDay',{item})}
                                            style={{
                                                width: '100%',
                                                height: '100%', 
                                                flexDirection: 'row', 
                                                alignItems: 'center'
                                            }}>
                                        <View>
                                            {item.hour <= moment().format('LT') && item.done === false ? (
                                                <Icon 
                                                size={40}
                                                containerStyle={{marginLeft: 10}}
                                                color='#FF384E'
                                                name='alarm'/>
                                            ):
                                            <Icon 
                                            size={40}
                                            containerStyle={{marginLeft: 10}}
                                            color='white'
                                            name='alarm'/>
                                            }
                                            {item.hour <= moment().format('LT') && item.done === false ? (
                                            <TextHour style={{color: '#FF384E'}}>{item.hour}</TextHour>) :
                                            <TextHour>{item.hour}</TextHour>
                                            }
                                        </View>
                                        <Text>{item.title}</Text>
                                    </TouchableOpacity>
                                </ItemContainer>
                            )
                        }}
                        />
                        
                )}
            </Container>
        )
    }
}