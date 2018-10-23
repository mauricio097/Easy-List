import React from 'react';
import './config/StatusBarConfig';
import { createRootNavigator } from './routes';
import { YellowBox, AsyncStorage } from 'react-native';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends React.Component {
  state = {
    logged: false
  };

  componentWillMount() {    
    const token = AsyncStorage.getItem('@EasyList:token');
    if(token)
      this.setState({logged: true});
    else
      this.setState({logged: false});
  }

  render() {
    const Routes = createRootNavigator(this.state.logged);
    return <Routes  />;
  }
}

