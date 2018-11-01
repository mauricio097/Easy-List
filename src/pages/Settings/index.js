import React, { Component } from 'react';
import { View, TouchableOpacity, Text, Alert,ToastAndroid,NetInfo } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/Header';
import { Avatar } from 'react-native-elements';
import Database from '../../services/storage';


export default class Settings extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name:'',
      email:'',
      nameIcon:'',
      status:null
    };

    NetInfo.isConnected.fetch().done((isConnected) => {
      this.setState({ status: isConnected });
      if(!isConnected){
        ToastAndroid.show('Você está Offline', ToastAndroid.SHORT);
      }
    });

    NetInfo.isConnected.addEventListener('connectionChange', (res) => {
      this.setState({ status: res });
      if(res){
        ToastAndroid.show('Você está Online', ToastAndroid.SHORT);
      }
    });
  
  }

  async componentDidMount(){
    const dataUser = await Database.loadDataUser();    
    this.setState({name: dataUser.name,email: dataUser.email});
    this.formatName();
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

  sync(){
    if(this.state.status){
      ToastAndroid.show("Sincronizando Dados...", ToastAndroid.SHORT);
      Database.sync();
    }
    else{
      ToastAndroid.show("Você Não Está Conectado à Internet...", ToastAndroid.SHORT);
    }
  }

  logout() {
    Database.logout()
    .then(data => {
      this.props.navigation.navigate('Login');
    })
    .catch(error => {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    })
  }

  formatName() {
    let newStr = this.state.name.substring(0, 1).toUpperCase();
    return newStr;  
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
            <Avatar containerStyle={Styles.avatar} large rounded title={this.formatName()} activeOpacity={0.7} />
            <View style={Styles.itemFirstFields}>
              <Text style={Styles.itemFirstName}>{this.state.name}</Text>
              <Text style={Styles.itemFirstEmail}>{this.state.email}</Text>
            </View>
          </View>
          <View style={Styles.itemsView}>
            <TouchableOpacity style={Styles.item} onPress={() => this.about()}>
              <FontAwesome style={Styles.icons}>{Icons.book}</FontAwesome>
              <Text style={Styles.itemText}>Sobre</Text>
            </TouchableOpacity>
          </View>
          <View style={Styles.itemsView}>
            <TouchableOpacity style={Styles.item} onPress={() => this.sync()}>
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
