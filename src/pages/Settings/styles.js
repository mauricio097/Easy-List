import { StyleSheet } from 'react-native';

const Styles = StyleSheet.create({
  leftComponentIcon: {
    color: '#FFF',
    fontSize: 20,
  },
  rightComponentIcon: {
    color: '#FFF',
    fontSize: 15,
  },
  containerView: {
    flex:1,
  },
  contentView: {
    flex:1,
    backgroundColor:'#E7E7E7'    
  },
  itemsView:{
    height:'12%',
    backgroundColor:'#FFF',
    borderRadius:5,
    justifyContent:'center',
    marginTop:5,
    marginHorizontal:5
  },
  itemFirstView:{
    flexDirection:'row',
    height: '20%',
    marginTop:5,
    alignItems:'center',
    backgroundColor: '#FFF',
    marginHorizontal:5,
    borderRadius:7,
  },
  itemFirstName:{
    fontSize: 25,
    fontWeight: 'bold'
  },
  itemFirstEmail:{
    fontSize: 16
  },
  itemFirstFields:{
    marginLeft: 15
  },
  avatar:{
    marginLeft:10
  },
  item:{
    flexDirection:'row',
    alignItems:'center',
    marginLeft:10
  },
  itemText:{
    marginLeft: 8,
    fontSize: 20,
  },
  icons:{
    fontSize: 22
  }
});

export default Styles;