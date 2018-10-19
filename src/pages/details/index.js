import React,{Component} from 'react';
import { View, Text, FlatList, TouchableOpacity} from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';


export default class Details extends Component{

  constructor(props){
    super(props);
  }
  
  static navigationOptions = {
    title: 'Easy List',
        headerStyle: {
          backgroundColor: '#38ADA9',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
        headerRight: (           
            <TouchableOpacity onPress={ ()=> this.editData()}>
              <FontAwesome style={Styles.headerRight}>{Icons.edit}</FontAwesome>
            </TouchableOpacity> 
        )
  };

  state = {
    data:[]
  };

  componentDidMount(){
     this.setState({data: this.props.navigation.state.params});
  }

  editData(){
    alert('This is a button!');
  }
  
  render(){
    return(
      
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
    );
  }
  
}

/*
  
  
  
  */