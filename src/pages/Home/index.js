import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, AsyncStorage, Alert, NetInfo } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/Header';
import Api from '../../services/api';
import Database from '../../services/storage';

let SQLite = require('react-native-sqlite-storage');
let db = SQLite.openDatabase({name: 'database.db',createFromLocation:'~database.db'});

export default class Home extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      refresh: true,
      status: false
    };

    this.refresh = this.refresh.bind(this);

    NetInfo.isConnected.fetch().done((isConnected) => {
      this.setState({ status: isConnected });
    });

    NetInfo.isConnected.addEventListener('connectionChange', (res) => {
      this.setState({ status: res });
    });
  }

  selectItem(item) {
    this.props.navigation.navigate('Details', item);
  };

  handleAdd() {
    this.props.navigation.navigate('New');
  }

  refresh() {
    this.getList();
    this.setState({ refresh: true });
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('willFocus', () => this.refresh()),
    ];  
  }

  removeItem(id) {    
    db.transaction((tx) => {         
      tx.executeSql('UPDATE Lists SET active="false",sync="false" WHERE id=?',[id], (tx, results) => {                                  
          ToastAndroid.show('Lista Excluida com Sucesso', ToastAndroid.SHORT);
      }, function (error){
          alert(JSON.stringify(error));
      });
    });
    this.refresh();
  }

  settings(){
    this.props.navigation.navigate('Settings');
  }

  confirmationRemoveItem(item) {
    let title = item.name;
    Alert.alert(
      title,
      'Deseja remover esse Item? ',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => this.removeItem(item.id) },
      ],
      { cancelable: false }
    )
  }

  getList() {   
    db.transaction((tx) => {         
      tx.executeSql('SELECT * FROM Lists WHERE active="true"', [], (tx, results) => {                          
          let items = []; 
          for(let i=0;i<results.rows.length;i++){
            let obj = {
              id: results.rows.item(i).id,
              name: results.rows.item(i).name,
              idUser: results.rows.item(i).idUser,
              items: JSON.parse(results.rows.item(i).items)
            }
            items.push(obj);
          }
          this.setState({ data: items });          
       }, function (error){
          alert(JSON.stringify(error));
        });
    });
  };

  render() {
    return (
      <View style={Styles.contentView}>
        <Header title='Easy List'
          leftComponent={
            <TouchableOpacity onPress={() => this.settings()}>
              <FontAwesome style={Styles.leftComponentIcon}>{Icons.cog}</FontAwesome>              
            </TouchableOpacity>
          }

          rightComponent={
            <TouchableOpacity onPress={() => this.handleAdd()}>
              <FontAwesome style={Styles.rightComponentIcon}>{Icons.plus}</FontAwesome>              
            </TouchableOpacity>
          }
        />
        <View style={Styles.listView}>
          <FlatList
            data={this.state.data}
            extraData={this.state}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => this.selectItem(item)}>
                  <View style={Styles.itemListView}>
                    <TouchableOpacity onPress={() => this.removeItem(item.id)}>
                      <FontAwesome style={Styles.minusBarButton}>{Icons.minusSquare}</FontAwesome>
                    </TouchableOpacity>
                    <Text style={Styles.itemListText}>{item.name}</Text>
                    <Text style={Styles.itemListIcon}>
                      <FontAwesome>{Icons.angleRight}</FontAwesome>
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }
}
//this.confirmationRemoveItem(item)