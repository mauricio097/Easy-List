import React from 'react';
import './config/StatusBarConfig';
import { createRootNavigator } from './routes';
import { YellowBox } from 'react-native';
import Api from './services/api';
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
    if(status){
      const valid = await Database.validToken();
      if(valid){
        const token = await Database.getToken();      
        Api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      }
      else{
        Database.logout();
      }
    }
  }


    render() {      
    const Routes = createRootNavigator(this.state.logged);
    return <Routes />;
  }
}

