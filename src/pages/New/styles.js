import {StyleSheet} from 'react-native';

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#E7E7E7',
        //justifyContent: 'space-between',
    },
    containerAdd: {
        //flex: 1,
        backgroundColor: '#E7E7E7',
        flexDirection: 'row',
        marginTop: 50,
        justifyContent: 'center',
    },
    inputNameList: {
        backgroundColor: '#fff',
        marginTop: 50,
        marginHorizontal: 30,
        borderRadius: 5,
        justifyContent:'center',
        
    },
    inputAddList:{
        backgroundColor: '#FFF',
        height: 45,
        marginTop: 10,
        marginHorizontal: 20,
        borderRadius: 5,
        flexDirection: 'row',
        flex:0.7
    },
    iconAdd: {
        marginTop: 10, 
        fontSize: 40,
        color: '#1E5C5A'
    },
    containerList:{
        justifyContent: 'center',
        backgroundColor:'#E7E7E7',
        paddingTop: 30,
        borderRadius: 2,
        alignItems: 'center',
        flexDirection: 'row',
        marginHorizontal: 20
    },
    itemList: {
        backgroundColor:'#fff',
        flex:0.5,
        height: 35,
        borderRadius: 5,
        textAlignVertical: 'center',
        textAlign: 'center'
    }
});

export default Styles;