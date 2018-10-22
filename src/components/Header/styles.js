import {StyleSheet} from 'react-native';
import Colors from '../../config/colors';

const Styles = StyleSheet.create({
    header:{
        backgroundColor: Colors.background,
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

export default Styles;