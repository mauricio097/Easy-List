import {StyleSheet} from 'react-native';
import Colors from '../../config/colors';

const Styles = StyleSheet.create({
    rightComponentIcon:{
        color: '#FFF',
        fontSize: 20,
    },
    leftComponentIcon:{
        color: '#FFF',
        fontSize: 20,
    },
    nameBarView:{
        marginTop: 20,
        marginHorizontal: 30,
    },
    nameBarInput:{
        backgroundColor: '#FFF',
        borderRadius:5,
        height: 40
    },
    addBarView:{
        marginTop: 20,
        marginHorizontal: 30,
        borderRadius:5,
        flexDirection: 'row',
        height: 40
    },
    addBarInput:{
        backgroundColor: '#FFF', 
        borderRadius: 5, 
        flex: 1
    },
    addBarButton:{
        fontSize: 35, 
        marginLeft: 10, 
        color: Colors.button
    },
    minusBarButton:{
        fontSize: 35, 
        marginLeft: 10, 
        color: '#ba2727'
    },
    listItemView:{
        flexBasis: 0,
        alignItems: "center",
        backgroundColor: "#FFF",
        flexGrow: 1,
        margin: 4,
        padding: 20,
        borderRadius: 5,
        flexDirection: 'row'
    },
    listItemText:{
        flex:1,
        fontSize: 20
    },
    containerView: {
        marginTop: 10,
        marginHorizontal:10
    }
});

export default Styles;