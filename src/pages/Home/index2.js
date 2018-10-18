import React,{Component} from 'react';
import { View, Text, FlatList } from 'react-native';
import Styles from './styles';

export default class home extends Component{

  static navigationOptions = {
    title: 'Easy List',
    headerStyle:{
      backgroundColor: "#38ADA9"
    },
    headerTintColor: "#FFF"
  };

  state = {
    data: [
      { id: "00", name: "Relâmpago McQueen" },
      { id: "01", name: "Agente Tom Mate" },
      { id: "02", name: "Doc Hudson" },
      { id: "03", name: "Cruz Ramirez" }
    ]
  };
  
  createRows(data, columns) {
    const rows = Math.floor(data.length / columns);
    let lastRowElements = data.length - rows * columns;
    while (lastRowElements !== columns){
      data.push({
        id: `empty-${lastRowElements}`,
        name: `empty-${lastRowElements}`,
        empty: true
      });
      lastRowElements += 1;
    }
    return data;
  }

  render(){
    const columns = 3;
    return(
      <View style={Styles.ViewGrid}>
          <FlatList
          data={this.createRows(this.state.data, columns)}
          keyExtractor={item => item.id}
          numColumns={columns}
          renderItem={({ item }) => {
            if (item.empty) {
              return <View style={[Styles.item, Styles.itemEmpty]} />;
            }
            return (
              <View style={Styles.item}>
                <Text style={Styles.text}>{item.name}</Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
}

