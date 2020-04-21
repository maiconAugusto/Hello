import React from 'react';
import createNavigation from './router'
import AsyncStorage from '@react-native-community/async-storage'
import axios from 'axios'


axios.defaults.baseURL = 'https://hello-e2f78.firebaseio.com/'

export default class App extends React.Component{
  constructor(props){
    super(props)
      this.state={
        userLogged: false,
        userCheck : false
      }
  }
  async componentDidMount() {
    const id = await AsyncStorage.getItem('@email')
    this.setState({
      userLogged: !! id,
      userCheck: true
    })
  }
  render() {
    const { userLogged, userCheck } = this.state
    if(!userCheck) return null

    const Routes = createNavigation(userLogged)
    return  <Routes/>
  }
}