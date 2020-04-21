import styled from 'styled-components/native'
import {RectButton} from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #3352F1;
  justify-content: center;
`
export const Input = styled.TextInput`
  height: 50px;
  background-color: white;
  border-radius: 4px;
  margin: 10px 12px 8px 12px;
  background-color: #F8F6F7;
`
export const Button = styled.TouchableOpacity`
  height: 50px;
  background-color: #F8F6F7;
  margin: 40px 12px 8px 12px;
  border-radius: 2px;
  justify-content: center;
  align-items: center;
`
export const ButtonText = styled.Text`
  color: #3352F1;
  font-size: 15px;
  font-weight: bold;
  text-transform: uppercase;
`
export const ContainerDate = styled.View`
  flex-direction: row;
  justify-content:space-around;
  margin: 10px 12px 8px 12px;
`
export const Title = styled.Text`
  font-size: 14px;
  color: white;
  font-weight: bold;
  margin-top: 8px;
  margin-left: 12px;
`
export const TitleNew = styled.Text`
  font-size: 18px;
  color: white;
  font-weight: bold;
  text-align: center;
  text-transform: uppercase;
`
export const ContinerBord = styled.View`
  margin: 12px;
`
export const View = styled.View`
  flex-direction: row;
  justify-content: center;
  margin-bottom: 40px;
`
export const DayEndHour = styled.Text`
  color: white;
  font-weight: bold;
  margin-top: 8px;
`