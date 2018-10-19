import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    ViewGrid: {
        marginTop: 10,
        marginHorizontal: 10,
    },  
    ContainerItem: {
      flexBasis: 0,
      alignItems: "center",
      backgroundColor: "#FFF",
      flexGrow: 1,
      margin: 4,
      padding: 20,
      borderRadius: 5,
      flexDirection: 'row',
    },
    itemName: {
      fontSize: 20,
      flex:1
    }, 
    itemIcon: {
      fontSize: 25,
      flex:1
    },   
    itemText: {
        marginHorizontal:20,
        marginTop:5
    },
    headerRight:{
      fontSize:25,
      color: '#fff',
      marginHorizontal: 15
    },
    icon: {
      color: '#FFF',
      fontSize: 28,
    },
    textIcon: {
      color: '#FFF',
      fontSize: 15,
    }
  });

export default Styles;