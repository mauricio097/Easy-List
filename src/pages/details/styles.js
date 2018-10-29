import { StyleSheet } from 'react-native';
import colors from '../../config/colors';

const Styles = StyleSheet.create({
  leftComponentIcon: {
    color: '#FFF',
    fontSize: 20,
  },
  rightComponentIcon: {
    color: '#FFF',
    fontSize: 20,
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
    padding: 20,
    borderRadius: 5,
    flexDirection: 'row',
  },
  itemIconText: {
    fontSize: 25,
    marginRight: 15
  },
  minusBarButton:{
      fontSize: 25, 
      color: '#ba2727'
  },
  inputName:{
    backgroundColor: '#E7E7E7',
    width: '30%',
    height: 40,
    marginRight: 20,
    borderRadius: 5,
    textAlign:'center'
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
    width: '22%',
    height: 40,
    marginRight: 20,
    borderRadius: 5,
    textAlign:'center'
  },
  totalButtonView:{
      backgroundColor: colors.background,
      flex:0.07,
      alignItems: 'center',
      justifyContent: 'center'
  },
  buttonTotalText:{
    color:'#FFF',
    fontWeight: 'bold',
    fontSize: 20
  }
});

export default Styles;
