import styled from 'styled-components/native'
import {RectButton} from 'react-native-gesture-handler'


export const Container = styled.View`
  background-color: #3352F1;
  flex: 1;
  flex-direction: column;
  width: 100%;
  justify-content: center;
`
export const ContainerName = styled.View`
  height: 20%;
  background-color: white;
  margin: 14px;
  border-radius: 4px;
  justify-content: center;
`
export const ContainerExit = styled.View`
  height: 20%;
  margin: 14px;
  border-radius: 4px;
  align-items: center;
  justify-content: flex-end;
`
export const Buttom = styled(RectButton)`
  height: 50px;
  background-color: white;
  margin: 14px;
  justify-content: center;
  border-radius: 4px;
`
export const ButtomText = styled.Text`
  color: #3352F1;
  text-transform: uppercase;
  text-align: center;
  font-weight: bold;
`
export const Title = styled.Text`
  font-size: 16px;
  text-align: center;
  color: white;
  font-weight: bold;
  margin-top: 8px;
  margin-left: 14px;
`