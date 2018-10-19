import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
    ViewGrid: {
        marginTop: 10,
        marginHorizontal: 10
    }, 
    item: {
      flexBasis: 0,
      alignItems: "center",
      backgroundColor: "#FFF",
      flexGrow: 1,
      margin: 4,
      padding: 20,
      borderRadius: 5,
      flexDirection: 'row'
    },
    text: {
     // color: "#333333",
      flex:1,
      fontSize: 20
    },
    IconItem: {
        fontSize: 30
    },
    icon: {
      color: '#FFF',
      fontSize: 32,
  },
  });

export default Styles;