import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/header';

export default class Details extends Component {

  constructor(props) {
    super(props);
  }

  static navigationOptions = {
    header: null
  };

  state = {
    data: []
  };

  componentDidMount() {
    this.setState({ data: this.props.navigation.state.params });
  }

  editData() {
    this.props.navigation.navigate('edit');
  }

  goBack() {
    this.props.navigation.navigate('Home');
  }

  render() {
    return (
      <View>
        <Header title='Detalhes'
          leftComponent=
          {
            <TouchableOpacity onPress={() => this.goBack()}>
              <FontAwesome style={Styles.icon}>{Icons.arrowCircleOLeft} </FontAwesome>
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
                  <Text style={Styles.itemName}>{item.name}</Text>
                  <View style={Styles.itemText}>
                    <Text style={Styles.itemIcon} >
                      <FontAwesome>{Icons.dollar} {item.price} </FontAwesome>
                    </Text>
                  </View>
                  <View style={Styles.itemText}>
                    <Text style={Styles.itemIcon}>
                      <FontAwesome>{Icons.arrowCircleORight} {item.quantity}</FontAwesome>
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