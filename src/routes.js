import { createStackNavigator } from 'react-navigation';

import Home from './pages/Home';
import New from './pages/New';
import Details from './pages/Details';
import Edit from './pages/Edit';
import Login from './pages/Login';
import Register from './pages/Register';

const HomeStack = createStackNavigator({
  Home: Home,
  Details: Details,
  Edit
});

const NewStack = createStackNavigator({
  Novo: New
});

const LoginStack = createStackNavigator({
  Login: Login
});

const RegisterStack = createStackNavigator({
  Register: Register
});



export default StackNavigator = createStackNavigator(
  {
    Login: { screen: LoginStack, navigationOptions:{header: null}},
    Register: { screen: RegisterStack, navigationOptions:{header: null}},
    Início: { screen: HomeStack, navigationOptions:{header: null}},
    Novo: { screen: NewStack, navigationOptions:{header: null}}
  }
);
