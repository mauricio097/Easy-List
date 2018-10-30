import React from 'react';
import './config/StatusBarConfig';
import { createRootNavigator } from './routes';
import { YellowBox, AsyncStorage } from 'react-native';
import Api from './services/api';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends React.Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      logged: null
    };

    this.isLogged();
  }

  async isLogged(){
    let data = await AsyncStorage.getItem('@EasyList:user');
    let user = JSON.parse(data);

    if(user)
      this.setState({logged: true});
    else
      this.setState({logged: false});
  }

  render() {
    const Routes = createRootNavigator(this.state.logged);
    return <Routes />;
  }
}

