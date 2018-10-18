import React,{Component} from 'react';
import { View, Text, FlatList, TouchableHighlight, Alert, Modal } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';


export default class Details extends Component{

  static navigationOptions = {
    title: 'Nome da Lista',
    headerStyle:{
      backgroundColor: "#38ADA9"
    },
    headerTintColor: "#FFF"
    
  };

  state = {
    data: [
      { id: "00", name: "Relâmpago McQueen" },
      { id: "01", name: "Agente Tom Mate" },
      { id: "02", name: "Doc Hudson" },
      { id: "03", name: "Cruz Ramirez" }
    ],
    modalVisible: false,
  };

  setModalVisible(visible) {
    this.setState({modalVisible: visible});
  }

  selectItem = () => {
    this.setModalVisible(!this.state.modalVisible);
    //this.props.navigation.navigate('Novo');
  };

  render(){
    return(
      <View style={Styles.ViewGrid}>
      <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          <View style={{marginTop: 22}}>
            <View>
              <Text>Hello World!</Text>

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text>Hide Modal</Text>
              </TouchableHighlight>
            </View>
          </View>
          
          </Modal>
          <FlatList
          data={this.state.data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableHighlight onPress={this.selectItem}>
                <View style={Styles.ContainerItem}>
                  <Text style={Styles.itemName}>{item.name}</Text>
                  <View style={Styles.itemText}>
                      <Text style={Styles.itemName} >
                        <FontAwesome>{Icons.dollar} 2.50</FontAwesome>
                      </Text>
                  </View>
                  <View style={Styles.itemText}>
                      <Text style={Styles.itemName}>
                        <FontAwesome>{Icons.cartPlus} 2.50</FontAwesome>
                      </Text>                      
                  </View>
                </View>
              </TouchableHighlight>
            );
          }}
        />
      </View>
    );
  }
  
}

/*
  
  
  
  */