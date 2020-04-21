import React from 'react'
import {
    Container, 
    CalendarContainer, 
    ContainerItem,
    Item, 
    ContainerList, 
    ItemText, 
    ItemSpace, 
    ItemTextHour,
    TextInfo, 
    AddContainer,
} from './style'
import {Calendar} from 'react-native-calendars'
import {FlatList, ActivityIndicator} from 'react-native'
import {CheckBox, Icon} from 'react-native-elements'
import moment from 'moment'
import '../../services/Calendar'
import AsyncStorage from '@react-native-community/async-storage'
import base64 from 'base-64'
import firebase from 'firebase'



export default class Activies extends React.Component{
    constructor(props){
        super(props)
            this.state={
                data: [],
                days: '',
                verify: false,
                loading: false
            }
    }
    async componentWillMount() {
        const date =  moment().format('YYYY-MM-DD')
        this.filterActivities(date)
        this.setState({loading: true})
    }

    async filterActivities(date) {
        try {
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
                    this.filterDate(data)
                    aux.sort(function (a, b) {
                        if (a.hour > b.hour) {
                        return 1;
                        }
                        if (a.hour < b.hour) {
                        return -1;
                        }
                        return 0;
                    });
                    this.setState({data: aux, loading: false})
                })
        }
        catch(error) {}
    }
    filterDate(activities) {
        try {
            let newDates = []
            activities.map(element => {
                if (element.date !== '') {
                    newDates.push(element.date)
                }
            })
            newDates.push(moment().format('YYYY-MM-DD'))
            let daysObj = newDates.reduce(
                (c, v) =>
                Object.assign(c, {
                    [v]: {
                        selected: true,
                        customStyles: {
                        container: {backgroundColor: '#626EFF'},
                        text: {color: '#616161', marginTop: 6},
                    },
                    },
                }),
                {}
            )
            const date = moment().format('YYYY-MM-DD')
            daysObj[date].selected = true
            daysObj[date].customStyles.container.backgroundColor = '#FF4192'
            this.setState({days: daysObj})
        }
        catch(error) {}
    }

    render() {
        return(
            <Container>
                <CalendarContainer>
                    <Calendar 
                    onDayPress={(value) => this.filterActivities(value.dateString)}
                    style={{
                        height: '94%'
                    }}
                    theme={{
                        calendarBackground: '#3352F1',
                        dayTextColor: 'white',
                        textDayFontWeight: 'bold',
                        monthTextColor: 'white',
                        textDayHeaderFontWeight: 'bold',
                        textMonthFontWeight: 'bold',
                    }}
                    markedDates={this.state.days}
                    />
                </CalendarContainer>
                <ContainerList>
                    {this.state.loading === true ? (
                        <ActivityIndicator size='large' style={{marginTop: 50}} color='#3352F1' />
                    ):(null)}
                    {this.state.data.length === 0 && this.state.loading === false ? 
                        <>
                          <TextInfo style={{marginTop: 40}}>Não a nada para essa data!</TextInfo>
                          <AddContainer onPress={() => this.props.navigation.navigate('NewAtictive')}>
                            <Icon 
                            name='add-circle-outline'
                            color='#616161'
                            containerStyle={{ marginRight: 4}}
                            />
                            <TextInfo>Nova atividade</TextInfo>
                          </AddContainer>
                        </>
                        :
                        <FlatList 
                        style={{flex: 1}}
                        data={this.state.data}
                        renderItem={({item}) => {
                            if (item.date === moment().format('YYYY-MM-DD') && 
                                item.hour < moment().format('LT') &&
                                item.done === false
                                ) {
                                return(
                                    <Item onPress={() => this.props.navigation.navigate('SeeActivitieDay',{item})}>
                                        <ItemSpace>
                                            <ContainerItem>
                                                <ItemTextHour>{item.hour}{' -'}</ItemTextHour>
                                                <ItemText>{item.title}</ItemText>
                                            </ContainerItem>
                                            <ContainerItem style={{justifyContent: 'flex-end'}}>
                                                <Icon 
                                                name='priority-high'
                                                color='red'
                                                containerStyle={{marginRight: 22}}
                                                />
                                            </ContainerItem>
                                        </ItemSpace>
                                    </Item>
                                )
                            }
                            if (item.date === moment().format('YYYY-MM-DD') && 
                                item.done === true &&
                                item.hour > moment().format('LT')
                                ) {
                                return(
                                    <Item onPress={() => this.props.navigation.navigate('SeeActivitieDay',{item})}>
                                        <ItemSpace>
                                            <ContainerItem>
                                                <ItemTextHour>{item.hour}{' -'}</ItemTextHour>
                                                <ItemText>{item.title}</ItemText>
                                            </ContainerItem>
                                            <ContainerItem style={{justifyContent: 'flex-end'}}>
                                                <CheckBox
                                                checkedColor='#00814F'
                                                checked={true}
                                                checkedIcon='check-circle'
                                                uncheckedIcon='circle-o'
                                                />
                                            </ContainerItem>
                                        </ItemSpace>
                                    </Item>
                                )
                            }
                            if (item.date === moment().format('YYYY-MM-DD') && 
                                item.done === false &&
                                item.hour > moment().format('LT')
                                ) {
                                return(
                                    <Item onPress={() => this.props.navigation.navigate('SeeActivitieDay',{item})}>
                                        <ItemSpace>
                                            <ContainerItem>
                                                <ItemTextHour>{item.hour}{' -'}</ItemTextHour>
                                                <ItemText>{item.title}</ItemText>
                                            </ContainerItem>
                                            <ContainerItem style={{justifyContent: 'flex-end'}}>

                                            </ContainerItem>
                                        </ItemSpace>
                                    </Item>
                                )
                            }
                            if (item.date === moment().format('YYYY-MM-DD') && 
                                item.done === true &&
                                item.hour < moment().format('LT')
                                ) {
                                return(
                                    <Item onPress={() => this.props.navigation.navigate('SeeActivitieDay',{item})}>
                                        <ItemSpace>
                                            <ContainerItem>
                                                <ItemTextHour>{item.hour}{' -'}</ItemTextHour>
                                                <ItemText>{item.title}</ItemText>
                                            </ContainerItem>
                                            <ContainerItem style={{justifyContent: 'flex-end'}}>
                                                <CheckBox
                                                checkedColor='#00814F'
                                                checked={true}
                                                checkedIcon='check-circle'
                                                uncheckedIcon='circle-o'
                                                />
                                            </ContainerItem>
                                        </ItemSpace>
                                    </Item>
                                )
                            }
                            if (item.date > moment().format('YYYY-MM-DD') && 
                                item.done === false
                                ) {
                                return(
                                    <Item onPress={() => this.props.navigation.navigate('SeeActivitieDay',{item})}>
                                        <ItemSpace>
                                            <ContainerItem>
                                                <ItemTextHour>{item.hour}{' -'}</ItemTextHour>
                                                <ItemText>{item.title}</ItemText>
                                            </ContainerItem>
                                            <ContainerItem style={{justifyContent: 'flex-end'}}>

                                            </ContainerItem>
                                        </ItemSpace>
                                    </Item>
                                )
                            }
                            if (item.date > moment().format('YYYY-MM-DD') && 
                                item.done === true
                                ) {
                                return(
                                    <Item onPress={() => this.props.navigation.navigate('SeeActivitieDay',{item})}>
                                        <ItemSpace>
                                            <ContainerItem>
                                                <ItemTextHour>{item.hour}{' -'}</ItemTextHour>
                                                <ItemText>{item.title}</ItemText>
                                            </ContainerItem>
                                            <ContainerItem style={{justifyContent: 'flex-end'}}>
                                                <CheckBox
                                                checkedColor='#00814F'
                                                checked={true}
                                                checkedIcon='check-circle'
                                                uncheckedIcon='circle-o'
                                                />
                                            </ContainerItem>
                                        </ItemSpace>
                                    </Item>
                                )
                            }
                            if (item.date < moment().format('YYYY-MM-DD') && 
                                item.done === true
                                ) {
                                return(
                                    <Item onPress={() => this.props.navigation.navigate('SeeActivitieDay',{item})}>
                                        <ItemSpace>
                                            <ContainerItem>
                                                <ItemTextHour>{item.hour}{' -'}</ItemTextHour>
                                                <ItemText>{item.title}</ItemText>
                                            </ContainerItem>
                                            <ContainerItem style={{justifyContent: 'flex-end'}}>
                                                <CheckBox
                                                checkedColor='#00814F'
                                                checked={true}
                                                checkedIcon='check-circle'
                                                uncheckedIcon='circle-o'
                                                />
                                            </ContainerItem>
                                        </ItemSpace>
                                    </Item>
                                )
                            }
                            if (item.date < moment().format('YYYY-MM-DD') && 
                                item.done === false
                                ) {
                                return(
                                    <Item onPress={() => this.props.navigation.navigate('SeeActivitieDay',{item})}>
                                        <ItemSpace>
                                            <ContainerItem>
                                                <ItemTextHour>{item.hour}{' -'}</ItemTextHour>
                                                <ItemText>{item.title}</ItemText>
                                            </ContainerItem>
                                            <ContainerItem style={{justifyContent: 'flex-end'}}>
                                            <Icon 
                                                name='priority-high'
                                                color='red'
                                                containerStyle={{marginRight: 22}}
                                                />
                                            </ContainerItem>
                                        </ItemSpace>
                                    </Item>
                                )
                            }
                        }}
                        />
                        }
                </ContainerList>
            </Container>
        )
    }
}