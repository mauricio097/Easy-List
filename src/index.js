import React from 'react';
import './config/StatusBarConfig';
import { createRootNavigator } from './routes';
import { YellowBox, AsyncStorage } from 'react-native';
import Api from './services/api';

//YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends React.Component {
  state = {
    logged: null
  };

  componentWillMount() {
    this.isLogged();
  }

  async isLogged(){
    //await AsyncStorage.removeItem('@EasyList:token');
    const token = await AsyncStorage.getItem('@EasyList:token');
    if(token){
      this.setState({logged: true});
    }else{
      this.setState({logged: false});
    }
  }

  render() {
    const Routes = createRootNavigator(this.state.logged);
    return <Routes />;
  }
}

