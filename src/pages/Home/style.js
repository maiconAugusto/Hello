import styled from 'styled-components/native'
import {RectButton} from 'react-native-gesture-handler'

export const Container = styled.View`
  flex: 1;
  flex-direction: column;
 background-color: #F8F6F7;
`
export const Header = styled.View`
  height: 30%;
  background-color: #3352F1;
  justify-content: center;
`
export const Main = styled.View`
  flex: 1;
  flex-direction: row;
  justify-content: space-evenly;
  flex-wrap: wrap;
  margin-top: 20px;
`

export const Select = styled(RectButton).attrs({
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
  height: 20%;
  width: 40%;
  text-align: center;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 8px;
  margin-top: 25px;
`
export const SelectText = styled.Text`
  color: #616161;
  font-weight: bold;
  text-transform: uppercase;
`
export const NameProfile = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
  margin: 10px;
  font-family: 'Fredoka One';
`
export const Date = styled.Text`
  font-size: 12px;
  color: white;
  margin-left: 10px;
`