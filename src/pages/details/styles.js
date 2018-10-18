import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    ViewGrid: {
        marginTop: 10,
        marginHorizontal: 10
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
    itemText: {
        fontSize:20,
        marginHorizontal:20,
        marginTop:5
    }
  });

export default Styles;