import React, {Component} from 'react';
import { View, TextInput, FlatList, Text , TouchableOpacity, ListItem } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/header';



export default class New extends Component{
    static navigationOptions = {
        header: null
        /*title: 'Easy Buy',
        headerStyle: {
          backgroundColor: '#38ADA9',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
          
        },
        headerRight: (
          <TouchableOpacity onPress={ ()=> alert('This is a button!')}>
            <FontAwesome>{Icons.angleRight}</FontAwesome>
          </TouchableOpacity>
          
        )*/
      };

    constructor(props){
        super(props);
        this.state = {
            name: '',
            data: [
                { id: "00", name: "Café", price: 2.19, quantity: 3 },
                { id: "01", name: "Açucar", price: 3.00, quantity: 2 },               
                { id: "03", name: "Arroz", price: 10.99, quantity: 3 },
                { id: "04", name: "Feijão", price: 5.42, quantity: 1 }
            ]
        }
    }

    insertItem(){

    }
    
    render(){
        return(
            <View>
                <Header title='Hello World'/>     
            </View>
                
                    
              
        )
    }
};

/*
<View style={Styles.container}>
                    <TextInput
                        style={Styles.inputNameList}
                        onChangeText={(name) => this.setState({name})}
                        placeholder="Nome da Lista"
                        underlineColorAndroid='transparent'
                        value={this.state.name}
                    />
                    <View style={Styles.containerAdd}>
                        <TextInput 
                            style={Styles.inputAddList}
                            onChangeText={(name) => this.setState({name})}
                            placeholder="Item"
                            underlineColorAndroid='transparent'
                            value={this.state.text}
                        />

                        <TouchableOpacity >
                            <Text style={Styles.iconAdd}>
                                <FontAwesome>{Icons.plusCircle}</FontAwesome>
                            </Text>
                        </TouchableOpacity>
                    </View>

                    <FlatList
                        data={this.state.data}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                            <View style={Styles.containerList}>
                                <Text style={Styles.itemList}>{item.name}</Text>
                            </View>
                        }
                        keyExtractor={item => item.id}
                    />

                </View>*/