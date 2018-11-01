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
      logged: false
    };

    this.isLogged();
  } 
  
  isLogged(){    
    let db = SQLite.openDatabase({name: 'database.db',createFromLocation:'~database.db'});
    db.transaction((tx) => {      
    tx.executeSql('SELECT * FROM User', [], (tx, results) => {             
      if(results.rows.length > 0)                                       
          this.setState({logged: true});
        else
          this.setState({logged: false});
                    
    }, function (error){
        alert(JSON.stringify(error));  
      //ToastAndroid.show('Erro ao Validar Usuário', ToastAndroid.SHORT);
      });
    });
  }

  render() {
    const Routes = createRootNavigator(this.state.logged);
    return <Routes />;
  }
}

