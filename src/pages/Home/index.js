import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, ToastAndroid } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/Header';
import Database from '../../services/storage';

export default class Home extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      refresh: true
    };

    this.refresh = this.refresh.bind(this);
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
    Database.deleteList(id)
    .then(data => {
      ToastAndroid.show('Lista Excluida com Sucesso', ToastAndroid.SHORT);
    })
    .catch(error => {
      ToastAndroid.show(error, ToastAndroid.SHORT);
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
    Database.getLists()
    .then(data => {
      this.setState({ data: data });
    })
    .catch(error => {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    })       
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
                    <TouchableOpacity onPress={() => this.confirmationRemoveItem(item)}>
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