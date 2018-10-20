import React, {Component} from 'react';
import { View, TextInput, FlatList, Text , TouchableOpacity, ListItem, SectionList } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/header';
import { Button } from 'react-native-elements';



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
            Inputname: '',
            data: [
                { id: "00", name: "Café", price: 2.19, quantity: 3 },
                { id: "01", name: "Açucar", price: 3.00, quantity: 2 },               
                { id: "03", name: "Arroz", price: 10.99, quantity: 3 },
                { id: "04", name: "Feijão", price: 5.42, quantity: 1 }
            ]
        }

        this.insertItem = this.insertItem.bind(this);


    }

    insertItem(){
        let data = this.state.data;
        let newItem = { id: "05", name: this.state.Inputname, price: 2.19, quantity: 3 } ;
        data.push(newItem);
        this.setState({data});
    }
    
    render(){
        return(
            <View>
                <Header title={'Nova Lista'}
                rightComponent=
                {<TouchableOpacity onPress={(text) => this.editData()}>
                  <Text style={Styles.textIcon}>Criar</Text>
                </TouchableOpacity>}
                /> 
                
                <View style={Styles.ViewAdd}>
                    <TextInput style={{backgroundColor:'#FFF',borderRadius:5,flex:1}} 
                     underlineColorAndroid="transparent"
                     onChangeText={(text) => this.setState({Inputname: text})}
                     ></TextInput>
                       <TouchableOpacity onPress={() => this.insertItem()}>
                            <FontAwesome style={{fontSize:35,marginLeft:10,color:'#1E5C5A'}}>{Icons.plusSquare}</FontAwesome>
                        </TouchableOpacity>            
                </View>

                <View style={Styles.ViewGrid}>
                <FlatList
                        data={this.state.data}
                        extraData={this.state}
                        showsVerticalScrollIndicator={false}
                        renderItem={({item}) =>
                        <View style={Styles.item}>
                        <Text style={Styles.text}>{item.name}</Text>                        
                      </View>
                        }
                        keyExtractor={item => item.id}
                    />  
        </View>    
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
