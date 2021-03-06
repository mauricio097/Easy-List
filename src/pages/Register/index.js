import React, { Component } from 'react';
import { View, Text, StatusBar, Image, TextInput, TouchableOpacity, ToastAndroid } from 'react-native';
import Styles from './styles';
import Api from '../../services/api';

export default class register extends Component {

    static navigationOptions = {
        header: null,
    }

    constructor(props) {
        super(props);
    }

    state = {
        inputName: '',
        inputEmail: '',
        inputPassword: '',
        error: ''
    }

    handleNameChange = (name) => {
        this.setState({ inputName: name });
    }

    handleEmailChange = (email) => {
        this.setState({ inputEmail: email });
    }

    handlePasswordChange = (password) => {
        this.setState({ inputPassword: password });
    }

    handleRegisterPress = async () => {
        if ((this.state.inputEmail.length === 0) || (this.state.inputPassword.length === 0)
            || (this.state.inputName.length === 0)
        ) {
            ToastAndroid.show('Os Campos Devem ser Preenchidos', ToastAndroid.SHORT);
        }
        else {
            try {
                const response = await Api.post('/user', {
                    name: this.state.inputName,
                    email: this.state.inputEmail,
                    password: this.state.inputPassword
                });

                this.props.navigation.navigate('Login');

            } catch (error) {
                ToastAndroid.show('Erro ao Cadastrar Usuário', ToastAndroid.SHORT);
            }
        }
    }

    render() {
        return (
            <View style={Styles.contentView}>
                <Image source={require('../../images/logo.png')} style={Styles.logo} />
                <View style={Styles.formView} >
                    <TextInput style={Styles.input}
                        underlineColorAndroid="transparent"
                        placeholder='Nome'
                        onChangeText={(text) => this.setState({ inputName: text })}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput style={Styles.input}
                        underlineColorAndroid="transparent"
                        placeholder='E-mail'
                        onChangeText={(text) => this.setState({ inputEmail: text })}
                        autoCapitalize="none"
                        autoCorrect={false}
                    />
                    <TextInput style={Styles.input}
                        underlineColorAndroid="transparent"
                        placeholder='Senha'
                        onChangeText={(text) => this.setState({ inputPassword: text })}
                        autoCapitalize="none"
                        autoCorrect={false}
                        secureTextEntry
                    />

                    <TouchableOpacity style={Styles.buttonRegister} onPress={this.handleRegisterPress}>
                        <Text style={Styles.textButtonRegister}>Cadastrar</Text>
                    </TouchableOpacity>
                    <View>

                        <TouchableOpacity onPress={() => this.props.navigation.navigate('Login')}>
                            <Text style={Styles.registerText}>Voltar ao Login</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        );
    }
};
