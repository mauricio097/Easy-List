import React from 'react';
import './config/StatusBarConfig';
import { createRootNavigator } from './routes';
import { YellowBox } from 'react-native';
import SyncStorage from 'sync-storage';
import Api from './services/api';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends React.Component {
  state = {
    logged: null,
    token: null
  };

  componentWillMount() {    
    const token = SyncStorage.get('@EasyList:token');
    if(token)
      this.setState({logged: true});
    else
      this.setState({logged: false});
  }

  render() {
    const Routes = createRootNavigator(this.state.logged);
    return <Routes />;
  }
}

