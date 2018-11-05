import React from 'react';
import './config/StatusBarConfig';
import { createRootNavigator } from './routes';
import { YellowBox, ToastAndroid } from 'react-native';

import Database from './services/storage';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends React.Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      logged:null
    };      
  } 

   async componentWillMount(){
    const status = await Database.authenticate();
    this.setState({logged: status});
  }


    render() {      
    const Routes = createRootNavigator(this.state.logged);
    return <Routes />;
  }
}

