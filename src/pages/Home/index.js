import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, AsyncStorage, Alert, NetInfo } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/Header';
import Api from '../../services/api';
import storage from '../../services/storage';


export default class Home extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);

    this.state = {
      data: [],
      refresh: true,
      status: false
    };

    this.refresh = this.refresh.bind(this);

    NetInfo.isConnected.fetch().done((isConnected) => {
      this.setState({ status: isConnected });
    });

    NetInfo.isConnected.addEventListener('connectionChange', (res) => {
      this.setState({ status: res });
    });
  }

  selectItem(item) {
    this.props.navigation.navigate('Details', item);
  };

  handleAdd() {
    this.props.navigation.navigate('New');
  }

  refresh() {
    this.getList();
    this.setState({ refresh: true });
  }

  componentDidMount() {
    this.subs = [
      this.props.navigation.addListener('willFocus', () => this.refresh()),
    ];
  }

  removeItem(id) {
    storage.remove({
      key: 'list',
      id: id
    });
    this.refresh();

    try {
      const response = Api.delete(`/list/${id}`);
      this.refresh();
    }
    catch (error) {
      alert(error);
      this.setState({ error: 'Erro ao Deletar Lista' });
    }
  }

  settings(){
    this.props.navigation.navigate('Settings');
  }

  confirmationRemoveItem(item) {
    let title = item.name;
    Alert.alert(
      title,
      'Deseja remover esse Item? ',
      [
        { text: 'Não', style: 'cancel' },
        { text: 'Sim', onPress: () => this.removeItem(item.id) },
      ],
      { cancelable: false }
    )
  }

  async getList() {
    
    if(!this.state.status){
      storage.getAllDataForKey('list').then(lists => {
        this.setState({ data: lists });
      });
    }
    else{
      id = await AsyncStorage.getItem('@EasyList:id');
      
      try{
        const response = await Api.get(`/list/user/${id}`);        
        this.setState({ data: response.data });
      }
      catch(error){
        this.setState({error: error});
      }
    }
  };

  render() {
    return (
      <View style={Styles.contentView}>
        <Header title='EasyList'
          leftComponent={
            <TouchableOpacity onPress={() => this.settings()}>
              <FontAwesome style={Styles.leftComponentIcon}>{Icons.cog}</FontAwesome>              
            </TouchableOpacity>
          }

          rightComponent={
            <TouchableOpacity onPress={() => this.handleAdd()}>
              <FontAwesome style={Styles.rightComponentIcon}>{Icons.plus}</FontAwesome>              
            </TouchableOpacity>
          }
        />
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
      </View>
    );
  }
}