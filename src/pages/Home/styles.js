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
      padding: 20
    },
    text: {
      color: "#333333"
    },
    itemEmpty: {
      backgroundColor: "transparent"
    },
  });

export default Styles;