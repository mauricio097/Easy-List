import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

const Styles = StyleSheet.create({
  leftComponentIcon: {
    color: '#FFF',
    fontSize: 20,
  },
  rightComponentText: {
    color: '#FFF',
    fontSize: 15,
    fontWeight: 'bold'
  },
  contentView:{
    flex:1
  },
  listView: {
    marginTop: 10,
    marginHorizontal: 10,
    backgroundColor: '#E7E7E7',
    flex:0.95
  },
  itemListView: {
    alignItems: "center",
    backgroundColor: '#FFF',
    margin: 4,
    padding: 20,
    borderRadius: 5,
    flexDirection: 'row',
  },
  itemIconText: {
    fontSize: 25,
    marginRight: 15
  },
  inputName:{
    backgroundColor: '#E7E7E7',
    width: '30%',
    height: 40,
    marginRight: 20,
    borderRadius: 5
  },
  inputPrice:{
    backgroundColor: '#E7E7E7',
    width: '20%',
    height: 40,
    marginRight: 20,
    borderRadius: 5,
    textAlign:'center'
  },
  inputQuantity:{
    backgroundColor: '#E7E7E7',
    width: '20%',
    height: 40,
    marginRight: 20,
    borderRadius: 5,
    textAlign:'center'
  },
  totalButtonView:{
      backgroundColor: colors.background,
      flex:0.05,
      alignItems: 'center',
      justifyContent: 'center'
  },
  buttonTotalText:{
    color:'#FFF',
    fontWeight: 'bold',
    fontSize: 15
  }
});

export default Styles;
