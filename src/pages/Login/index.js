import React,{Component} from 'react';
import {View,Text,StatusBar} from 'react-native';
import Styles from './styles';

export default class login extends Component{
    
    static navigationOptions = {
        header: null,        
    }
    
    render(){
        return(
            <View style={Styles.contentView}>                
                <Text>Hello World</Text>
            </View>
        );
    }
};