import React from 'react';
import './config/StatusBarConfig';
import { createRootNavigator, createMenuNavigator } from './routes';
import { YellowBox, AsyncStorage } from 'react-native';
import Api from './services/api';

//YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends React.Component {
  state = {
    logged: null
  };

  componentWillMount() {
    if(this.isLogged()){
      this.setState({logged: true});
    }
    else{
      this.setState({logged: false});
    }
  }

  async isLogged(){
    const token = await AsyncStorage.getItem('@EasyList:token');
    if(token){
      return true;
    }else{
      return false;
    }
  }

  render() {
    const Routes = createRootNavigator(this.state.logged);
    return <Routes />;
  }
}

