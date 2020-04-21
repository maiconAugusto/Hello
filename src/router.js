import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import Home from './pages/Home';
import Activies from './pages/Activities';
import NewAtictive from './pages/NewActivies';
import ActivitiesDay from './pages/ActivitiesDay/index';
import SeeActivitieDay from './pages/SeeActivitieDay';
import Config from './pages/ConfigPhone/index'
import Initial from './pages/Initial/index'

const Router = (userLogger = false) =>createAppContainer(createStackNavigator({
  Initial: {
    screen: Initial, navigationOptions:{
      header: null
    }
  },
  Home: {
    screen: Home, navigationOptions:{
      header: null
    }
  },
  Activies: {
    screen: Activies, navigationOptions:{
      headerTitle: false,
      headerStyle:{
        backgroundColor: '#3352F1'
      },
      headerTintColor: 'white'
    }
  },
  NewAtictive: {
    screen: NewAtictive, navigationOptions: {
      headerTitle: false,
      headerStyle:{
        backgroundColor: '#3352F1'
      },
      headerTintColor: 'white'
    }
  },
  ActivitiesDay: {
    screen: ActivitiesDay, navigationOptions: {
      headerTitle: false,
      headerStyle:{
        backgroundColor: '#3352F1'
      },
      headerTintColor: 'white'
    }
  },
  SeeActivitieDay: {
    screen : SeeActivitieDay, navigationOptions: {
      headerTitle: false,
      headerStyle:{
        backgroundColor: '#3352F1'
      },
      headerTintColor: 'white'
    }
  },
  Config: {
    screen: Config, navigationOptions: {
      headerTitle: false,
      headerStyle:{
        backgroundColor: '#3352F1'
      },
      headerTintColor: 'white'
    }
  }
},{
  initialRouteName: userLogger ? 'Home' : 'Initial'
}));
export default Router
