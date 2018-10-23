import React, { Component } from 'react';
import { View, Text,TextInput, TouchableOpacity, AsyncStorage, Image } from 'react-native';
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
        error: null,
        lists: []
    }

    handleEmailChange = (email) => {
        this.setState({inputEmail: email});
    }

    handlePasswordChange = (password) => {
        this.setState({inputPassword: password});
    }

    handleLoginPress = async () => {
        if((this.state.inputEmail.length === 0) || (this.state.inputPassword.length === 0)){
            this.setState({error: 'Os campos devem sem preenchidos'}, () => false);
        }
        else {
          try{
           const response = await Api.post('/authenticate', {
                email: this.state.inputEmail,
                password: this.state.inputPassword
              });
              
            AsyncStorage.setItem('@EasyList:token',response.data.token);
            AsyncStorage.setItem('@EasyList:name',response.data.name);
            AsyncStorage.setItem('@EasyList:email',response.data.email);
            AsyncStorage.setItem('@EasyList:id',response.data.id);

            this.props.navigation.navigate('Home');
            
            }catch(error){
                this.setState({error: error});
            }
          }
    }

    handleRegisterPress = () => {
        this.props.navigation.navigate('Register');
    }

    render() {
        return (
            <View style={Styles.contentView}>
            
                <View style={Styles.formView} >
                    <TextInput style={Styles.input}
                        underlineColorAndroid="transparent"
                        placeholder='E-mail'
                        onChangeText={this.handleEmailChange}
                        autoCapitalize="none"
                        autoCorrect={false}                        
                    />
                    <TextInput style={Styles.input}
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
                    {this.state.error && <Text>{this.state.error}</Text>}
                    <TouchableOpacity onPress={this.handleRegisterPress}>
                        <Text style={Styles.registerText}>Criar Uma Conta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );
    }
};

//<Image source={require('../../images/logo.png')} />