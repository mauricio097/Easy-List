import React, { Component } from 'react';
import { View, TextInput, FlatList, Text, TouchableOpacity} from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/header';


export default class New extends Component {
    static navigationOptions = {
        header: null
    };

    constructor(props) {
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
    }

    insertItem() {
        let data = this.state.data;
        let newItem = { id: "05", name: this.state.Inputname, price: 2.19, quantity: 3 };
        data.push(newItem);
        this.setState({ data });
    }

    render() {
        return (
            <View>
                <Header title={'Nova Lista'}
                    rightComponent= { 
                        <TouchableOpacity>
                            <Text style={Styles.rightComponentText}>Criar</Text>
                        </TouchableOpacity>
                    } 
                />

                <View style={Styles.addBarView}>
                    <TextInput style={Styles.addBarInput}
                        underlineColorAndroid="transparent"
                        onChangeText={(text) => this.setState({ Inputname: text })}
                    />
                    <TouchableOpacity onPress={() => this.insertItem()}>
                        <FontAwesome style={Styles.addBarButton}>{Icons.plusSquare}</FontAwesome>
                    </TouchableOpacity>
                </View>

                <View style={Styles.containerView}>
                    <FlatList
                        data={this.state.data}
                        extraData={this.state}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item }) =>
                            <View style={Styles.listItemView}>
                                <Text style={Styles.listItemText}>{item.name}</Text>
                            </View>
                        }
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
        )
    }
};
