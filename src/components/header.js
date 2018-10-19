import React,{Component} from 'react';
import { View,StyleSheet,Text, TouchableOpacity } from 'react-native';
import FontAwesome, { Icons } from 'react-native-fontawesome';


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

const Styles = StyleSheet.create({
    header:{
        backgroundColor: '#38ADA9',
        height: 50,
        flexDirection: 'row',                
    },
    leftComponent: {        
        height: 50,
        flex: 0.1,
        alignItems: 'center',
        justifyContent:'center',
        marginLeft: 5
    },
    centerComponent: {               
        height: 50,
        flex: 0.8,
        alignItems: 'center',
        justifyContent:'center'
    },
    rightComponent: {        
        height: 50,        
        alignItems:'center',
        flex: 0.1,
        justifyContent:'center',
        marginHorizontal: 5
    },
    text: {
        color: '#FFF',
        fontSize: 20,
        fontWeight: 'bold'
    }
});
