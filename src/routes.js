import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import React from 'react';
import { Text } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';

import Home from './pages/home';
import New from './pages/new';
import Details from './pages/details';
import Edit from './pages/edit';
import Login from './pages/login';

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



export default TabNavigator = createBottomTabNavigator(
  {
    Login: { screen: LoginStack, navigationOptions:{tabBarVisible: false}},
    Início: { screen: HomeStack},
    Novo: { screen: NewStack}
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarIcon: ({ focused, horizontal, tintColor }) => {
        const { routeName } = navigation.state;
        let iconName;
        switch (routeName) {
          case 'Início': iconName = Icons.home;
            break;
          case 'Novo': iconName = Icons.plus;
            break;
        }
        return <Text style={{ margin: 5, fontSize: 25, textAlign: 'left' }}>
          <FontAwesome>{iconName}</FontAwesome>
        </Text>
      },
    }),
    tabBarOptions: {
      activeTintColor: '#38ADA9',
      inactiveTintColor: 'gray'
    }
  }
);
