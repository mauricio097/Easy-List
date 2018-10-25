import { StyleSheet } from 'react-native';
import Colors from '../../config/colors';


const Styles = StyleSheet.create({
    contentView: {
        flex:1
    },
    listView:{
        flex:1
    },
    itemListView: {
        flexBasis: 0,
        alignItems: "center",
        backgroundColor: "#FFF",
        flexGrow: 1,
        margin: 4,
        padding: 20,
        borderRadius: 5,
        flexDirection: 'row'
    },
    itemListText: {
        flex: 1,
        fontSize: 20,
        marginLeft: 10
    },
    itemListIcon: {
        fontSize: 30
    },
    minusBarButton:{
        fontSize: 28, 
        color: '#ba2727'
    },
    leftComponentIcon: {
        color: '#FFF',
        fontSize: 25,
        marginLeft:8
    },
    rightComponentIcon:{
        color: '#FFF',
        fontSize: 25,
        
    }
});

export default Styles;