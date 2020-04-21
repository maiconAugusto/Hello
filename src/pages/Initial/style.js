import styled from 'styled-components/native'
import {RectButton} from 'react-native-gesture-handler'
import TextInputMask from 'react-native-text-input-mask';
import LinearGradient from 'react-native-linear-gradient';

export const Contanainer = styled(LinearGradient)`
  flex: 1;
  justify-content:center;
  height: 100%;
`
export const Title = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 34px;
  color: #3352F1;
`
export const TitleInfo = styled.Text`
  color: white;
  font-weight: 100;
  font-size: 14px;
  color: white;
  text-align: center;
  margin-bottom: 4px;
  margin-top: 4px;
`

export const Fx = styled.View`
  background-color: white;
  width: 260px;
  height: 80px;
  justify-content: center;
  align-items:center;
  border-top-right-radius: 50px;
  border-bottom-right-radius: 50px;
  margin-bottom: 50px;
`
export const Input = styled.TextInput`
  height: 50px;
  background-color: white;
  margin: 4px 20px 14px 20px;
  border-radius: 2px;
  padding-left: 8px;
`
export const InputMask = styled(TextInputMask)`
  height: 50px;
  background-color: white;
  margin: 4px 20px 14px 20px;
  border-radius: 2px;
  padding-left: 4px;
`
export const Buttom = styled.TouchableOpacity`
  height: 50px;
  background-color: ${props => props.color};
  margin: 40px 20px 0px 20px;
  border-radius: 2px;
  justify-content: center;
`
export const TitleButtom = styled.Text`
  color: white;
  font-weight: bold;
  font-size: 17px;
  color: #3352F1;
  text-align: center;
`
export const ContanainerModal = styled.View`
  justify-content: center;
  height: 100%;
  background-color: #3352F1
`