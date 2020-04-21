import styled from 'styled-components/native'
import {RectButton} from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
  background-color: #F8F6F7;
`
export const CalendarContainer = styled.View`
  height: 55%;
  width: 100%;
`
export const Item = styled(RectButton).attrs({
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 6,
  },
  shadowOpacity: 0.39,
  shadowRadius: 8.3,
  elevation: 3,
  marginLeft: 12,
  marginRight: 12,
})`
  height: 60px;
  border-radius: 10px;
  background-color: white;
  justify-content: center;
  margin-top: 6px;
  margin-bottom: 4px;
`
export const ItemSpace = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`

export const ItemText = styled.Text`
  color: #616161;
  font-weight: bold;
  margin-left: 10px;
  font-size: 15px;
`
export const ContainerList = styled.View`
  height: 45%;

`
export const TextInfo = styled.Text`
  color: #616161;
  font-size: 16px;
  text-align: center;
  font-weight: bold;
`
export const ItemTextHour = styled.Text`
  color: #616161;
  font-size: 14px;
  text-align: center;
  font-weight: 500;
  margin-left: 8px;
`
export const AddContainer = styled.TouchableOpacity`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-left: 30%;
  margin-right: 30%;
  margin-top: 40px;
`
export const ContainerItem = styled.View`
  width: 50%;
  flex-direction: row;
`