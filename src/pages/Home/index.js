import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, AsyncStorage, Alert } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/Header';
import Api from '../../services/api';
import { NavigationEvents } from 'react-navigation';

export default class Home extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      refresh: true
    };

    this.refresh = this.refresh.bind(this);
  }

  selectItem(item) {
    this.props.navigation.navigate('Details',item);
  };

  handleAdd(){
    this.props.navigation.navigate('New');
  }

  refresh(){
    this.getList();
    this.setState({ refresh: true});
  }

  componentDidMount(){
    this.refresh();
    this.subs = [
      this.props.navigation.addListener('willFocus', () => this.refresh()),
    ]; 
  }

  async removeItem(id){
    try{
        const response = await Api.delete(`/list/${id}`);
        this.refresh();
      }
      catch(error){
          alert(error);
          this.setState({error: 'Erro ao Deletar Lista'});
      }
  }

  confirmationRemoveItem(item){
    let title = item.name;
    Alert.alert(
      title,
      'Deseja remover esse Item? ',
      [
        {text: 'Não', style: 'cancel'},
        {text: 'Sim', onPress: () => this.removeItem(item.id) },
      ],
      { cancelable: false }
    )
  }

  async getList(){
    const idUser = await AsyncStorage.getItem('@EasyList:id');
    try {
        const response = await Api.get(`/list/user/${idUser}`);

        this.setState({ data: response.data });
    } catch(error){
        alert(error);//this.setState({error: error});
    }
  };

  render() {
    return (
      <View style={Styles.contentView}>
        <Header title='EasyList' />
          <View style={Styles.listView}>
            <FlatList
              data={this.state.data}
              extraData={this.state}
              keyExtractor={item => `${item.id}`}
              renderItem={({ item }) => {
                return (                    
                    <TouchableOpacity onPress={() => this.selectItem(item)}>                    
                      <View style={Styles.itemListView}> 
                      <TouchableOpacity onPress={() => this.confirmationRemoveItem(item)}>
                        <FontAwesome style={Styles.minusBarButton}>{Icons.minusSquare}</FontAwesome>
                      </TouchableOpacity>                   
                        <Text style={Styles.itemListText}>{item.name}</Text>
                        <Text style={Styles.itemListIcon}>
                          <FontAwesome>{Icons.angleRight}</FontAwesome>
                        </Text>
                      </View>
                    </TouchableOpacity>
                );
              }}
            />
          </View>
          <View style={Styles.addButtonView}>
            <TouchableOpacity style={Styles.buttonAdd} onPress={() => this.handleAdd()}>                  
              <Text style={Styles.buttonNewText}>
                <FontAwesome>{Icons.plus}</FontAwesome>
              </Text>    
            </TouchableOpacity>
          </View>
        </View>
    );
  }
}

