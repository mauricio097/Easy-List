import React,{Component} from 'react';
import { View,StyleSheet,Text, TouchableOpacity } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Styles from './styles';


export default class header extends Component{
    constructor(props){
        super(props);
    }

    render(){
        return(
            <View style={Styles.header}>            
                <View style={Styles.leftComponent}>
                    {this.props.leftComponent}                    
                </View>
                <View style={Styles.centerComponent}>
                    <Text style={Styles.text}>
                        {this.props.title}
                    </Text>
                </View>
                <View style={Styles.rightComponent}>
                        {this.props.rightComponent}
                </View>
            </View>
        );
    }
}


