import { createStackNavigator } from 'react-navigation';

import Home from './pages/Home';
import New from './pages/New';
import Details from './pages/Details';
import Settings from './pages/Settings';
import Login from './pages/Login';
import Register from './pages/Register';


export const SignedOutRoutes = createStackNavigator({
  Login: {
    screen: Login,
    navigationOptions: {
      header:null
    }
  },
  Register: {
    screen: Register,
    navigationOptions: {
      header:null
    }
  },
});

export const SignedInRoutes = createStackNavigator({
  Home: {
    screen: Home,
    navigationOptions: {
      header:null
    }
  },
  Details: {
    screen: Details,
    navigationOptions: {
      header:null
    }
  },
  Settings: {
    screen: Settings,
    navigationOptions: {
      header:null
    }
  },
  New: {
    screen: New,
    navigationOptions: {
      header:null
    }
  }
});

export const createRootNavigator = (signedIn = false) => {
  return createStackNavigator({
    SignedIn: { screen: SignedInRoutes },
    SignedOut: { screen: SignedOutRoutes }
  },
  {
    headerMode: "none",
    mode: "modal",
    initialRouteName: signedIn ? "SignedIn" : "SignedOut",
    navigationOptions: {
      gesturesEnabled: false
    }
  });
};
