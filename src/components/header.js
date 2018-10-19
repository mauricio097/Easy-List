import React,{Component} from 'react';
import { View,StyleSheet,Text } from 'react-native';

export default class header extends Component{
    render(){
        return(
            <View styles={Styles.header}>
                <Text>Hello Header</Text>
            </View>

        );
    }
}
//style: { color: '#fff',fontWeight:'bold',fontSize:20 }

/*<Header backgroundColor='#38ADA9'
                statusBarProps={{ barStyle: 'light-content' }}
                barStyle="light-content" // or directly
                leftComponent={this.props.leftComponent}
                centerComponent={{text: this.props.title,style: { color: '#fff',fontWeight:'bold',fontSize:20 }}}
                rightComponent={{text: this.props.title,style: { color: '#fff',fontWeight:'bold',fontSize:20 }}}
            />*/

const Styles = StyleSheet.create({
    header:{
      
    }
});