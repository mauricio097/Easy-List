import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput, NetInfo} from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/Header';
import Api from '../../services/api';
import sync from '../../services/sync';

export default class Details extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: true,
      id: null,
      name: '',
      items: [],
      status: false,
      total: 0
    };

    NetInfo.isConnected.fetch().done((isConnected) => {
      this.setState( { status: isConnected });
    });

    NetInfo.isConnected.addEventListener('connectionChange', ( res ) => {
      this.setState( { status: res });         
    });
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
      items[i].price = items[i].price.replace(',','.');
      total += items[i].price * items[i].quantity;
    }
    let float = parseFloat(total.toFixed(2));
    let totalFloat = float.toString().replace('.',',');
    this.setState({total : totalFloat});
  }

  async saveData() {
    
    const id = await storage.getIdsForKey('list').then(ids => {
      return ids.length+1;
    });

    let data = { 
      id: this.state.id,
      name: this.state.name,
      items: this.state.items
    }

    storage.save({
        key:'list',
        id: this.state.id,
        data: data,
        expires: null
    })
    // Verify if device is not connected
    if(!this.state.status){
      //Add Request in queue
      const updateItem = {
          id: this.state.id,          
          name: this.state.InputName,
          items: this.state.items
      }

      sync.updateItem(updateItem);

      this.props.navigation.navigate('Home');
    }
    else{
      //Insert in API
      try{
        const response = await Api.put(`/list/${this.state.id}`, {
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

  updatePrice(text,itemName){
    let items = this.state.items;
    for (i in items) {
      if(items[i].name === itemName){
         items[i].price = text;
      }
    }
    this.setState(items);
  }

  updateQuantity(text,itemName){
    let items = this.state.items;
    for (i in items) {
      if(items[i].name === itemName){
         items[i].quantity = text;
      }
    }
    this.setState(items);
  }

  removeItem(item){
    let items = this.state.items;
    for (i in items) {
        if(items[i].name === item.name){
            items.splice(i, 1);
        }
    }

    this.setState({items});
}

  goBack() {
    this.props.navigation.navigate('Home');
  }

  formatTotal(n){
    let valor = parseInt( n.replace(/[\D]+/g,''));
    var tmp = valor+'';
    tmp = tmp.replace(/([0-9]{2})$/g, ",$1");
        if( tmp.length > 6 )
                tmp = tmp.replace(/([0-9]{3}),([0-9]{2}$)/g, ".$1,$2");

    return tmp;
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
              <FontAwesome style={Styles.rightComponentIcon}>{Icons.save} </FontAwesome>
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
                    onChangeText={(text) => this.updatePrice(text,item.name)}
                    style={Styles.inputPrice}
                  />
                  <Text style={Styles.itemIconText}>
                    <FontAwesome>{Icons.shoppingCart}</FontAwesome>
                  </Text>
                  <TextInput
                    placeholder={item.quantity}
                    underlineColorAndroid="transparent"
                    onChangeText={(text) => this.updateQuantity(text,item.name)}
                    keyboardType='numeric'
                    style={Styles.inputQuantity}
                  />
                  <TouchableOpacity onPress={() => this.removeItem(item)}>
                      <FontAwesome style={Styles.minusBarButton}>{Icons.minusSquare}</FontAwesome>
                  </TouchableOpacity>
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
