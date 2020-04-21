import styled from 'styled-components/native'
import {RectButton} from 'react-native-gesture-handler'
export const Container = styled.View`
  flex: 1;
  height: 100%;
  flex-direction: column;
  justify-content: center;
`
export const ContainerActivitie = styled.View`
    height: 100%;
    background-color: #3352F1;
    margin: 14px;
    border-radius: 4px;
`
export const Title = styled.Text`
    font-weight: bold;
    text-align: center;
    font-size: 16px;
    color: white;
    margin-top: 16px;
`
export const Description = styled.Text`
    text-align: justify;
    font-size: 16px;
    color: white;
    margin: 20px 14px 10px 14px;
`
export const ContainerBtn = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-around;
  flex: 1;
  background-color: white;
`
export const Buttom = styled.TouchableOpacity`
  width: 50%;
  height: 60px;
  justify-content: center;
  border: 2px solid #3352F1;
`
export const TextBtn = styled.Text`
  color: #616161;
  text-align: center;
  font-weight: bold;
  text-transform: uppercase;
  font-size: 13px;
`
export const ContainerDate = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: #3352F1;
  margin: 200px 14px 0 14px;
  height: 50px;
  border-radius: 100px;
`
export const Days = styled.Text`
  color: white;
  font-size: 14px;
  font-weight: bold;
`
export const ContainerDescription = styled.View`
height: 400px;
`