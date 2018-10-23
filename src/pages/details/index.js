import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/Header';
import Api from '../../services/api';

export default class Details extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: true,
      name: '',
      id: null,
      items: [],
      total: 0
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.setState({
      items: this.props.navigation.state.params.items,
      name: this.props.navigation.state.params.name,
      id: this.props.navigation.state.params.id
    });

    this.calculateTotal(this.props.navigation.state.params.items);
  }

  calculateTotal(items){
    let total = 0;
    for (i in items) {
      total += items[i].price * items[i].quantity;
    }
    let totalFloat = parseFloat(total.toFixed(2));
    this.setState({total : totalFloat});
  }

  async saveData() {
    let id = this.state.id;
    try{
      const response = await Api.put(`/list/${id}`, {
          name: this.state.name,
          items: this.state.items
      });
      
      this.props.navigation.navigate('Home');
      }
      catch(error){
          alert(error);
          this.setState({error: 'Erro ao Atualizar Lista'});
      }
  }

  updateName(text,itemName){
    let items = this.state.items;
    for (i in items) {
      if(items[i].name === itemName){
         items[i].name = text;
      }
    }
    this.setState(items);
  }

  updatePrice(text,itemPrice){
    let items = this.state.items;
    for (i in items) {
      if(items[i].price === itemPrice){
         items[i].price = text;
      }
    }
    this.setState(items);
  }

  updateQuantity(text,itemQuantity){
    let items = this.state.items;
    for (i in items) {
      if(items[i].quantity === itemQuantity){
         items[i].quantity = text;
      }
    }
    this.setState(items);
  }

  goBack() {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={Styles.contentView}>
        <Header title={this.state.name}
          leftComponent={
            <TouchableOpacity onPress={() => this.goBack()}>
              <FontAwesome style={Styles.leftComponentIcon}>{Icons.arrowLeft} </FontAwesome>
            </TouchableOpacity>
          }

          rightComponent={
            <TouchableOpacity onPress={() => this.saveData()}>
              <Text style={Styles.rightComponentText}>Salvar</Text>
            </TouchableOpacity>}
        />
        <View style={Styles.listView}>
          <FlatList
            data={this.state.items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <View style={Styles.itemListView}>
                  <TextInput
                    underlineColorAndroid="transparent"
                    placeholder={item.name}
                    onChangeText={(text) => this.updateName(text,item.name)}
                    style={Styles.inputName}
                  />
                  <Text style={Styles.itemIconText} >
                    <FontAwesome>{Icons.dollar}</FontAwesome>
                  </Text>
                  <TextInput
                    placeholder={item.price}
                    underlineColorAndroid="transparent"
                    keyboardType='numeric'
                    onChangeText={(text) => this.updatePrice(text,item.price)}
                    style={Styles.inputPrice}
                  />
                  <Text style={Styles.itemIconText}>
                    <FontAwesome>{Icons.shoppingCart}</FontAwesome>
                  </Text>
                  <TextInput
                    placeholder={item.quantity}
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => this.updateQuantity(text,item.quantity)}
                    keyboardType='numeric'
                    style={Styles.inputQuantity}
                  />
                </View>
              );
            }}
          />
        </View>
        <View style={Styles.totalButtonView}>
          <Text style={Styles.buttonTotalText}>
            Total: R$ {this.state.total}
              </Text>
        </View>
      </View>
    );
  }
}
