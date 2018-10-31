import React, { Component } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity , AsyncStorage , NetInfo, ToastAndroid } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/Header';



var SQLite = require('react-native-sqlite-storage');

export default class New extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
        super(props);
        this.state = {
            InputName: '',
            InputItem: '',
            items: [],
            error:'',
            reload:true,
            status: false,
            id: null
        }

        NetInfo.isConnected.fetch().done((isConnected) => {
            this.setState( { status: isConnected });
        });

        NetInfo.isConnected.addEventListener('connectionChange', ( res ) => {
            this.setState( { status: res });         
        });
    }   
    
    insertItem() {
        let items = this.state.items;
        if(this.state.InputItem.length > 0){
            let newItem = { id: `${this.state.items.length}`, name: this.state.InputItem, price: "0.00", quantity: "0" };
            items.push(newItem);
            this.setState({ items });
            this.setState({ InputItem: ''});
            this.inputItem.clear();
        }
        else{            
            ToastAndroid.show('Nome da Lista não pode ser Vazio', ToastAndroid.SHORT);
        }
    }

    removeItem(item){
        let items = this.state.items;
        for (i in items) {
            if(items[i].name === item.name){
                items.splice(i, 1);
            }
        }

        this.setState({items});
    }

    createList(){
        let db = SQLite.openDatabase({name: 'database.db',createFromLocation:'~database.db'});
        db.transaction((tx) => {         
        tx.executeSql('INSERT INTO Lists (name,items) VALUES (?,?)', 
            [this.state.InputName,JSON.stringify(this.state.items)], (tx, results) => {   
            if(results.rowsAffected > 0){
                ToastAndroid.show('Lista Cadastrada com Sucesso', ToastAndroid.SHORT);                 
                this.props.navigation.navigate('Home');
            }
            else
                ToastAndroid.show('Erro ao Cadastrar Lista', ToastAndroid.SHORT);
                        
        }, function (error){
            alert(JSON.stringify(error));
            });
        });
    }

    render() {
        return (
            <View>
                <Header title={'Nova Lista'}
                    leftComponent={
                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
                          <FontAwesome style={Styles.leftComponentIcon}>{Icons.arrowLeft} </FontAwesome>
                        </TouchableOpacity>
                    }

                    rightComponent={
                        <TouchableOpacity onPress={() => this.createList()}>
                            <FontAwesome style={Styles.rightComponentIcon}>{Icons.check} </FontAwesome>
                        </TouchableOpacity>
                    }
                />
                <View style={Styles.nameBarView}>
                    <TextInput style={Styles.nameBarInput}                            
                            underlineColorAndroid="transparent"
                            placeholder="Nome da Lista"
                            onChangeText={(text) => this.setState({ InputName: text })}
                    />
                </View>

                <View style={Styles.addBarView}>
                    <TextInput style={Styles.addBarInput}
                        ref={input => { this.inputItem = input }}
                        underlineColorAndroid="transparent"
                        placeholder="Nome do Item"
                        onChangeText={(text) => this.setState({ InputItem: text })}
                    />
                    <TouchableOpacity onPress={() => this.insertItem()}>
                        <FontAwesome style={Styles.addBarButton}>{Icons.plusSquare}</FontAwesome>
                    </TouchableOpacity>
                </View>

                <View style={Styles.containerView}>
                    <FlatList
                        data={this.state.items}
                        extraData={this.state}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <View style={Styles.listItemView}>
                                <Text style={Styles.listItemText}>{item.name}</Text>
                                <TouchableOpacity onPress={() => this.removeItem(item)}>
                                    <FontAwesome style={Styles.minusBarButton}>{Icons.minusSquare}</FontAwesome>
                                </TouchableOpacity>
                            </View>
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        )
    }
};
