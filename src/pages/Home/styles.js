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
        fontSize: 20
    },
    itemListIcon: {
        fontSize: 30
    },
    buttonNewText:{
       backgroundColor: Colors.button,
       width: 60,
       height: 60,
       textAlign: 'center',
       textAlignVertical: 'center',
       borderRadius: 30,
       fontSize: 35,
       color:"#FFF"
    },
    addButtonView:{
        alignItems:'flex-end'
    },
    buttonAdd:{
        marginHorizontal:20,
        marginBottom:20
    }
});

export default Styles;