import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image, AsyncStorage, ToastAndroid } from 'react-native';
import Styles from './styles';
import Api from '../../services/api';

export default class login extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);


    }

    state = {
        inputEmail: '',
        inputPassword: '',
        lists: []
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

                let user = {
                    token: response.data.token,
                    name: response.data.name,
                    email: response.data.email,
                    id: response.data.id
                }

                AsyncStorage.setItem('@EasyList:user', JSON.stringify(user));

                this.inputItem.clear();

                this.props.navigation.navigate('Home');

            } catch (error) {
                if (error.request.status) {
                    ToastAndroid.show('Usuário ou Senha Incorreto(s)', ToastAndroid.SHORT);
                }
                else {
                    ToastAndroid.show('Falha ao Realizar Login', ToastAndroid.SHORT);
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
                        ref={input => { this.inputItem = input }}
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
