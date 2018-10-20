import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity,TextInput } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/header';

export default class Details extends Component {

  constructor(props) {
    super(props);

    this.state = {
      editable: true,
      teste:'',
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
    this.props.navigation.navigate('Edit',this.state.data);
  }

  goBack() {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View>
        <Header title={this.state.data.name}
          leftComponent=
          {
            <TouchableOpacity onPress={() => this.goBack()}>
              <FontAwesome style={Styles.icon}>{Icons.arrowLeft} </FontAwesome>
            </TouchableOpacity>
          }

          rightComponent=
          {<TouchableOpacity onPress={() => this.editData()}>
            <Text style={Styles.textIcon}>Editar</Text>
          </TouchableOpacity>}
        />
        <View style={Styles.ViewGrid}>
          <FlatList
            data={this.state.data.items}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <View style={Styles.ContainerItem}>
                  <View style={Styles.itemText}> 
                    <Text style={Styles.itemName}>{item.name}</Text>
                  </View>            
                  <View style={Styles.itemText}>
                    <Text style={Styles.itemIcon} >                      
                      <FontAwesome>{Icons.dollar}</FontAwesome> {item.price}                  
                    </Text>                                 
                  </View>
                  <View style={Styles.itemText}>
                    <Text style={Styles.itemIcon}> 
                      <FontAwesome>{Icons.shoppingCart}</FontAwesome>  {item.quantity}                   
                    </Text>                                   
                  </View>
                </View>
              );
            }}
          />
        </View>
      </View>
    );
  }

}