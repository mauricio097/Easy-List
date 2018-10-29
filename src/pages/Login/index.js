import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, Image } from 'react-native';
import Styles from './styles';
import Api from '../../services/api';
import SyncStorage from 'sync-storage';

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
        erro: null,
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
            this.setState({ error: 'Os Campos Devem ser Preenchidos' }, () => false);
        }
        else {
            try {
                const response = await Api.post('/authenticate', {
                    email: this.state.inputEmail,
                    password: this.state.inputPassword
                });

                SyncStorage.set('@EasyList:token', response.data.token);
                SyncStorage.set('@EasyList:name', response.data.name);
                SyncStorage.set('@EasyList:email', response.data.email);
                SyncStorage.set('@EasyList:id', `${response.data.id}`);

                this.inputItem.clear();

                this.props.navigation.navigate('Home');

            } catch (error) {
                if(error.request.status){
                    this.setState({ error: 'Usuário ou Senha Incorreto(s)' }, () => false);    
                }
                else{
                    this.setState({ error: 'Falha ao realizar Login' }, () => false);
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
                    <Text style={Styles.error}>{this.state.error}</Text>
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
