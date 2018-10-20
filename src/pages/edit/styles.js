import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  leftComponentIcon: {
    color: '#FFF',
    fontSize: 28,
  },
  rightComponentIcon: {
    color: '#FFF',
    fontSize: 15,
  },
  containerView: {
    marginTop: 10,
    marginHorizontal: 10,
  },
  itemListView: {
    flexBasis: 0,
    alignItems: "center",
    backgroundColor: "#FFF",
    flexGrow: 1,
    margin: 4,
    padding: 20,
    borderRadius: 5,
    flexDirection: 'row',
  },
  itemListText: {
    marginHorizontal: 20,
    marginTop: 5
  },
  itemListInput:{
    backgroundColor: '#E7E7E7'
  },
  itemListIcon: {
    fontSize: 25,
    flex: 1
  }
});

export default Styles;