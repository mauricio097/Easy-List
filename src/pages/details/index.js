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
      teste: '',
      data: [],
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.setState({ data: this.props.navigation.state.params });
  }

  editData() {
    this.props.navigation.navigate('Edit', this.state.data);
  }

  goBack() {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View>
        <Header title={this.state.data.name}
          leftComponent={
            <TouchableOpacity onPress={() => this.goBack()}>
              <FontAwesome style={Styles.leftComponentIcon}>{Icons.arrowLeft} </FontAwesome>
            </TouchableOpacity>
          }

          rightComponent={
            <TouchableOpacity onPress={() => this.editData()}>
              <Text style={Styles.rightComponentText}>Editar</Text>
            </TouchableOpacity>}
        />
        <View style={Styles.contentView}>
          <FlatList
            data={this.state.data.items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <View style={Styles.itemListView}>                 
                    <Text style={Styles.itemNameText}>{item.name}</Text>                  
                    <Text style={Styles.itemIconText} >
                      <FontAwesome>{Icons.dollar}</FontAwesome> {item.price}
                    </Text>          
                    <Text style={Styles.itemIconText}>
                      <FontAwesome>{Icons.shoppingCart}</FontAwesome>  {item.quantity}
                    </Text>      
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }
}