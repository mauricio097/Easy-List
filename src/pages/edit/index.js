import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity,TextInput } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/header';

export default class Edit extends Component {

  constructor(props) {
    super(props);

    this.state = {
      data: [],
    };
  }

  static navigationOptions = {
    header: null
  };

  componentDidMount() {
    this.setState({ data: this.props.navigation.state.params });
  }

  handlerClick() {
    this.setState({editable:true});
  }

  goBack() {
    this.props.navigation.navigate('Details');
  }

  render() {
    return (
      <View>
        <Header title={this.state.data.name}
          leftComponent=
          {
            <TouchableOpacity onPress={() => this.goBack()}>
              <FontAwesome style={Styles.icon}>{Icons.arrowCircleOLeft} </FontAwesome>
            </TouchableOpacity>
          }

          rightComponent=
          {<TouchableOpacity onPress={() => this.handlerClick()}>
            <Text style={Styles.textIcon}>Salvar</Text>
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
                  <TextInput style={{backgroundColor:'#E7E7E7'}} defaultValue={item.name} 
                  editable={this.props.enabled}/>
                  </View>
                  <View style={Styles.itemText}>
                    <Text style={Styles.itemIcon} >
                      <FontAwesome>{Icons.dollar}</FontAwesome>
                    </Text>
                    <TextInput style={{backgroundColor:'#E7E7E7'}} defaultValue={item.price} keyboardType = 'numeric'
                    editable={this.state.editable}/>
                  </View>
                  <View style={Styles.itemText}>
                    <Text style={Styles.itemIcon}>
                      <FontAwesome>{Icons.arrowCircleORight}</FontAwesome>
                    </Text>
                    <TextInput style={{backgroundColor:'#E7E7E7'}} defaultValue={item.quantity} keyboardType = 'numeric'
                    editable={this.state.editable}/>
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