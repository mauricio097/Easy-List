import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, TextInput } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/Header';

export default class Edit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      name: '',
      items: []
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.setState({ name: this.props.navigation.state.params[0],
                    items: this.props.navigation.state.params[1]});
  }

  goBack() {
    this.props.navigation.navigate('Details');
  }

  render() {
    return (
      <View>
        <Header title={this.state.name}
          leftComponent={
            <TouchableOpacity onPress={() => this.goBack()}>
              <FontAwesome style={Styles.leftComponentIcon}>{Icons.arrowLeft}</FontAwesome>
            </TouchableOpacity>
          }

          rightComponent={
            <TouchableOpacity onPress={() => this.handlerClick()}>
              <Text style={Styles.rightComponentIcon}>Salvar</Text>
            </TouchableOpacity>
          }
        />
        <View style={Styles.containerView}>
          <FlatList
            data={[this.state.items]}
            keyExtractor={item => `${item.id}`}
            renderItem={({ item }) => {
              return (
                <View style={Styles.itemListView}>
                  <View style={Styles.itemListText}>
                    <TextInput style={Styles.itemListInput} defaultValue={item.name}
                      editable={this.props.enabled} />
                  </View>
                  <View style={Styles.itemListText}>
                    <Text style={Styles.itemListIcon} >
                      <FontAwesome>{Icons.dollar}</FontAwesome>
                    </Text>
                    <TextInput style={Styles.itemListInput} defaultValue={item.price} 
                      keyboardType='numeric' editable={this.state.editable} />
                  </View>
                  <View style={Styles.itemListText}>
                    <Text style={Styles.itemListIcon}>
                      <FontAwesome>{Icons.arrowCircleORight}</FontAwesome>
                    </Text>
                    <TextInput style={Styles.itemListInput} defaultValue={item.quantity} 
                      keyboardType='numeric' editable={this.state.editable} />
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