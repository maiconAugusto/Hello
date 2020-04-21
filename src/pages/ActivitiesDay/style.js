import styled from 'styled-components/native'
import LinearGradient from 'react-native-linear-gradient'

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
`
export const ItemContainer = styled(LinearGradient)`
  flex-direction: row;
  align-items: center;
  height: 100px;
  background-color: #3352F1;
  margin: 8px 10px 0px 10px;
  border-radius: 8px;
`
export const ContainerInfo = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: center;
`
export const TextInfo = styled.Text`
  color: #616161;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  margin-top: 80px;
`
export const Text = styled.Text`
  color: white;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
  margin-left: 20px;
`
export const TextHour = styled.Text`
  color: white;
  font-size: 12px;
  text-align: center;
  margin-left: 6px;
`