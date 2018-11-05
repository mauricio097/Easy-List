import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, ToastAndroid } from 'react-native';
import Styles from './styles';
import Api from '../../services/api';

var SQLite = require('react-native-sqlite-storage');

export default class login extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
    }

    state = {
        inputEmail: '',
        inputPassword: ''
    }

    handleEmailChange = (email) => {
        this.setState({ inputEmail: email });
    }

    handlePasswordChange = (password) => {
        this.setState({ inputPassword: password });
    }

    handleLoginPress = async () => {
        if ((this.state.inputEmail.length === 0) || (this.state.inputPassword.length === 0)) {
            ToastAndroid.show('Os Campos Devem ser Preenchidos', ToastAndroid.SHORT);
        }
        else {
            try {
                const response = await Api.post('/authenticate', {
                    email: this.state.inputEmail,
                    password: this.state.inputPassword
                });

                let db = SQLite.openDatabase({ name: 'database.db', createFromLocation: '~database.db' });
                db.transaction((tx) => {
                    tx.executeSql('INSERT INTO User (id,name,email,token) VALUES (?,?,?,?)',
                        [response.data.id,response.data.name, response.data.email, response.data.token], (tx, results) => {
                            if (results.rowsAffected > 0) {
                                this.props.navigation.navigate('Home');
                            }
                            else
                                ToastAndroid.show('Usuário não Foi Gravado Local', ToastAndroid.SHORT);

                        }, function (error) {                            
                            ToastAndroid.show('Erro ao Realizar Login', ToastAndroid.SHORT);
                        });
                });

            } catch (error) {
                if (error.request.status) {
                    ToastAndroid.show('Usuário ou Senha Incorreto(s)', ToastAndroid.SHORT);
                    this.inputPassword.clear();
                }
                else {
                    ToastAndroid.show('Falha ao Realizar Login', ToastAndroid.SHORT);
                    this.inputPassword.clear();
                }
            }
        }
    }

    handleRegisterPress = () => {
        this.props.navigation.navigate('Register');
    }

    render() {
        return (
            <View style={Styles.contentView}>
                <Image source={require('../../images/logo.png')} style={Styles.logo} />
                <View style={Styles.formView} >
                    <TextInput style={Styles.input}
                        underlineColorAndroid="transparent"
                        placeholder='E-mail'
                        onChangeText={this.handleEmailChange}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput style={Styles.input}
                        ref={input => { this.inputPassword = input }}
                        underlineColorAndroid="transparent"
                        placeholder='Senha'
                        onChangeText={this.handlePasswordChange}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                    />
                    <TouchableOpacity style={Styles.buttonLogin} onPress={this.handleLoginPress}>
                        <Text style={Styles.textButtonLogin}>Logar</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={this.handleRegisterPress}>
                        <Text style={Styles.registerText}>Não Possui uma Conta? Registre-se</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};
