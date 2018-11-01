import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, ToastAndroid } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/Header';
import Swipeout from 'rc-swipeout';
import Database from '../../services/storage';

export default class Details extends Component {

  constructor(props) {
    super(props);

    this.state = {      
      data: [],
      total: 0.00
    };
  }

  static navigationOptions = {
    header: null
  };

  refresh() {        
    this.setState({data:this.props.navigation.state.params});
    this.calculateTotal(this.props.navigation.state.params.items);
}

  componentDidMount() {
    this.setState({data:this.props.navigation.state.params});
    this.calculateTotal(this.props.navigation.state.params.items);    

    this.subs = [
      this.props.navigation.addListener('willFocus', () => this.refresh()),
    ];
  }

  calculateTotal(items) {
    let total = 0;
    for (i in items) {
      items[i].price = items[i].price.replace(',', '.');
      total += items[i].price * items[i].quantity;
    }
    let float = parseFloat(total).toFixed(2);
    let totalFloat = float.toString().replace('.', ',');
    this.setState({ total: totalFloat });
  }
  
  saveData() {    
    Database.updateList(JSON.stringify(this.state.data.items),this.state.data.id)
    .then(data => {
      ToastAndroid.show('Lista Atualizada com Sucesso', ToastAndroid.SHORT);
    })
    .catch(error => {
      ToastAndroid.show(error, ToastAndroid.SHORT);
    });       
    this.refresh();    
  }

  updateName(text, id) {
    let items = this.state.data.items;
    for (i in items) {
      if (items[i].id === id) {
        items[i].name = text;
      }
    }
    this.setState(items);
  }

  updatePrice(text, id) {
    let items = this.state.data.items;
    for (i in items) {
      if (items[i].id === id) {
        items[i].price = text;
      }
    }
    this.setState(items);
  }

  updateQuantity(text, id) {
    let items = this.state.data.items;
    for (i in items) {
      if (items[i].id === id) {
        items[i].quantity = text;
      }
    }
    this.setState(items);
  }

  removeItem(item) {
    let data = this.state.data;

    for (i in data.items) {
      if (data.items[i].name === item.name) {
        data.items.splice(i, 1);
      }
    }

    this.setState({ data });
  }

  goBack() {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View style={Styles.contentView}>
        <Header title={this.state.data.name}
          leftComponent={
            <TouchableOpacity onPress={() => this.goBack()}>
              <FontAwesome style={Styles.leftComponentIcon}>{Icons.arrowLeft} </FontAwesome>
            </TouchableOpacity>
          }

          rightComponent={
            <TouchableOpacity onPress={() => this.saveData()}>
              <FontAwesome style={Styles.rightComponentIcon}>{Icons.save} </FontAwesome>
            </TouchableOpacity>}
        />
        <View style={Styles.listView}>
          <FlatList
            data={this.state.data.items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <Swipeout style={{ borderRadius: 5 }}
                  right={[{
                    text: 'Deletar', onPress: () => this.removeItem(item),
                    style: { backgroundColor: 'red', color: 'white' }
                  }]}
                >
                  <View style={Styles.itemListView}>
                    <TextInput                      
                      underlineColorAndroid="transparent"
                      placeholder={item.name}
                      onChangeText={(text) => this.updateName(text, item.id)}
                      style={Styles.inputName}
                    />
                    <Text style={Styles.itemIconText} >
                      <FontAwesome>{Icons.dollar}</FontAwesome>
                    </Text>
                    <TextInput                      
                      placeholder={item.price}
                      underlineColorAndroid="transparent"
                      keyboardType='numeric'
                      onChangeText={(text) => this.updatePrice(text, item.id)}
                      style={Styles.inputPrice}
                    />
                    <Text style={Styles.itemIconText}>
                      <FontAwesome>{Icons.shoppingCart}</FontAwesome>
                    </Text>
                    <TextInput                      
                      placeholder={item.quantity}
                      underlineColorAndroid="transparent"
                      onChangeText={(text) => this.updateQuantity(text, item.id)}
                      keyboardType='numeric'
                      style={Styles.inputQuantity}
                    />
                  </View>
                </Swipeout>
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
