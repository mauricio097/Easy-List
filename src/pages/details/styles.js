import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  leftComponentIcon: {
    color: '#FFF',
    fontSize: 28,
  },
  rightComponentText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold'
  },
  contentView: {
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
  itemNameText: {
    fontSize: 25,
    flex: 1
  },
  itemIconText: {
    fontSize: 25,
    flex: 1
  },
});

export default Styles;