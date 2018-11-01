import React from 'react';
import './config/StatusBarConfig';
import { createRootNavigator } from './routes';
import { YellowBox, ToastAndroid } from 'react-native';
import Api from './services/api';
var SQLite = require('react-native-sqlite-storage');

import Database from './services/storage';

YellowBox.ignoreWarnings(['Warning: isMounted(...) is deprecated', 'Module RCTImageLoader']);

export default class App extends React.Component {
  
  constructor(props){
    super(props);
    
    this.state = {
      logged: null
    };  
  } 

  componentDidMount(){
    this.isLogged();
  }
  
  async isLogged(){
    Database.authenticate()
    .then(data => {
      if(data>0)
        this.setState({logged: true});
      else
        this.setState({logged: false});
    })
    .catch(error => {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    });   
  }

  render() {
    const Routes = createRootNavigator(this.state.logged);
    return <Routes />;
  }
}

