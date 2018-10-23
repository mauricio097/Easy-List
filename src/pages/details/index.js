import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/Header';

export default class Details extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: true,
      name: '',
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
      name: this.props.navigation.state.params.name
    });

    this.calculateTotal();
  }

  calculateTotal(){
    this.state.items.map((data) => { 
      alert('terte');
    });
  }

  editData() {
    //this.props.navigation.navigate('Edit',[this.state.name,this.state.items]);
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
            <TouchableOpacity onPress={() => this.editData()}>
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
                    style={Styles.inputName}
                  />
                  <Text style={Styles.itemIconText} >
                    <FontAwesome>{Icons.dollar}</FontAwesome>
                  </Text>
                  <TextInput
                    placeholder={item.price}
                    underlineColorAndroid="transparent"
                    keyboardType='numeric'
                    style={Styles.inputPrice}
                  />
                  <Text style={Styles.itemIconText}>
                    <FontAwesome>{Icons.shoppingCart}</FontAwesome>
                  </Text>
                  <TextInput
                    placeholder={item.quantity}
                    underlineColorAndroid="transparent"
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
