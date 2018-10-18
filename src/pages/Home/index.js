import React,{Component} from 'react';
import { View, Text, FlatList, TouchableHighlight } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';

export default class Home extends Component{

  static navigationOptions = {
    title: 'Easy List',
    headerStyle:{
      backgroundColor: "#38ADA9"
    },
    headerTintColor: "#FFF",
  };

  state = {
    data: [
      { id: "00", name: "Relâmpago McQueen" },
      { id: "01", name: "Agente Tom Mate" },
      { id: "02", name: "Doc Hudson" },
      { id: "03", name: "Cruz Ramirez" }
    ]
  };

  selectItem = () => {
    this.props.navigation.navigate('Details')
  };

  render(){
    return(
      <View style={Styles.ViewGrid}>
          <FlatList
          data={this.state.data}
          keyExtractor={item => item.id}
          renderItem={({ item }) => {
            return (
              <TouchableHighlight onPress={this.selectItem}>
                <View style={Styles.item}>
                  <Text style={Styles.text}>{item.name}</Text>
                  <Text style={Styles.IconItem}>
                    <FontAwesome>{Icons.angleRight}</FontAwesome>
                  </Text>
                </View>
              </TouchableHighlight>
            );
          }}
        />
      </View>
    );
  }
}

