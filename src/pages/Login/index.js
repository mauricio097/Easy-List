import React,{Component} from 'react';
import {View,Text,StatusBar, Image, TextInput, TouchableOpacity} from 'react-native';
import Styles from './styles';

export default class login extends Component{
    
    static navigationOptions = {
        header: null,        
    }

    constructor(props){
        super(props);

        state={
            inputEmail: '',
            inputPassword:''
        }
    }

    
    render(){
        return(
            <View style={Styles.contentView}>                
               <View style={Styles.formView} >                    
                <TextInput  style={Styles.input}
                            underlineColorAndroid="transparent"
                            placeholder='E-mail'
                            onChangeText={(text) => this.setState({ inputEmail: text })}
                            autoCapitalize="none"
                            autoCorrect={false}
                 />
                 <TextInput  style={Styles.input}
                            underlineColorAndroid="transparent"
                            placeholder='Senha'
                            onChangeText={(text) => this.setState({ inputPassword: text })}
                            autoCapitalize="none"
                            autoCorrect={false}
                            secureTextEntry
                 />
                <TouchableOpacity style={Styles.buttonLogin}>
                    <Text style={Styles.textButtonLogin}>Logar</Text>
                </TouchableOpacity>
                
                <TouchableOpacity onPress={() => this.props.navigation.navigate('Register')}>
                    <Text style={Styles.registerText}>Criar Uma Conta</Text> 
                </TouchableOpacity>
                </View>
            </View>
        );
    }
};
//

/*<Image                     
                        style={Styles.logo}
                        source={require('../../images/logo.png')} 
                    />*/