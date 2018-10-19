import React,{Component} from 'react';
import { View, Text, FlatList, TouchableOpacity} from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/header';

export default class Home extends Component{

  static navigationOptions = {
    
      header: null
      /*title: 'Easy List',
        headerStyle: {
          backgroundColor: '#38ADA9',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        }*/
  };

  constructor(props){
    super(props);
  }

  state = {
    data: [
      { id: "00", 
        name: "Lista Savegnago",
        items:[ 
                {id: "00",name: "Café",price:"2.19",quantity:"2"},
                {id: "01",name: "Açucar",price:"3.50",quantity:"5"},
                {id: "02",name: "Feijão",price:"5.96",quantity:"2"}
              ] 
      },
      { id: "01", 
        name: "Lista 2",
        items:[ 
                {id: "00",name: "Café",price:"2.19",quantity:"2"},
                {id: "01",name: "Açucar",price:"3.50",quantity:"5"},
                {id: "02",name: "Aveia",price:"5.96",quantity:"2"}
              ] 
      }
    ]
  };

  selectItem(item){
    this.props.navigation.navigate('Details',item);
  };

  render(){
    return(
      <View>
        <Header title='Easy List' 
          leftComponent={ null} 
          rightComponent={null}
          />
        <View style={Styles.ViewGrid}>
            <FlatList
            data={this.state.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={ ()=> this.selectItem(item)}>
                  <View style={Styles.item}>
                    <Text style={Styles.text}>{item.name}</Text>
                    <Text style={Styles.IconItem}>
                      <FontAwesome>{Icons.angleRight}</FontAwesome>
                    </Text>
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    );
  }
}

