import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Alert } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/Header';
import { Avatar } from 'react-native-elements';
import storage from '../../services/storage';
import SyncStorage from 'sync-storage';

export default class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {

    };
  }

  static navigationOptions = {
    header: null
  };


  goBack() {
    this.props.navigation.navigate('Home');
  }

  about() {
    Alert.alert('Sobre',
    'Easy List 2018 - All Right Reserved ®'
    );
  }

  logout() {
    SyncStorage.remove('@EasyList:user');    
    
    storage.clearMap();
    this.props.navigation.navigate('Login');    
  }

  render() {
    return (
      <View style={Styles.containerView}>
        <Header title='Definições'
          leftComponent={
            <TouchableOpacity onPress={() => this.goBack()}>
              <FontAwesome style={Styles.leftComponentIcon}>{Icons.arrowLeft}</FontAwesome>
            </TouchableOpacity>
          }
        />
        <View style={Styles.contentView}>
          <View style={Styles.itemFirstView}>
            <Avatar containerStyle={Styles.avatar} large rounded title="M" activeOpacity={0.7} />
            <View style={Styles.itemFirstFields}>
              <Text style={Styles.itemFirstName}>Mauricio</Text>
              <Text style={Styles.itemFirstEmail}>junior14_santos@hotmail.com</Text>
            </View>
          </View>
          <View style={Styles.itemsView}>
            <TouchableOpacity style={Styles.item} onPress={() => this.about()}>
              <FontAwesome style={Styles.icons}>{Icons.book}</FontAwesome>
              <Text style={Styles.itemText}>Sobre</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.itemsView}>
            <TouchableOpacity style={Styles.item} onPress={() => alert('Sincronizar')}>
              <FontAwesome style={Styles.icons}>{Icons.exchange}</FontAwesome>
              <Text style={Styles.itemText}>Sincronizar Dados</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.itemsView}>
            <TouchableOpacity style={Styles.item} onPress={() => this.logout()}>
              <FontAwesome style={Styles.icons}>{Icons.signOut}</FontAwesome>
              <Text style={Styles.itemText}>Logout</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
    );
  }
}