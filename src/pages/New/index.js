import React, { Component } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity , AsyncStorage } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/Header';
import Api from '../../services/api';
import Home from '../Home';

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
            reload:true
        }
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
            this.setState({ error: 'Nome da Lista não pode ser Vazio'});
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

    async createList(){
        try{
            const response = await Api.post('/list', {
                idUser: await AsyncStorage.getItem('@EasyList:id'),
                name: this.state.InputName,
                items: this.state.items
            });
            
            this.props.navigation.navigate('Home');
            }
            catch(error){
                alert(error);
                this.setState({error: 'Erro ao Criar Lista'});
            }
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
                            <Text style={Styles.rightComponentText}>Criar</Text>
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
