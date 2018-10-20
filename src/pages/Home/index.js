import React, { Component } from 'react';
import { View, Text, FlatList, TouchableOpacity, AsyncStorage } from 'react-native';
import Styles from './styles';
import FontAwesome, { Icons } from 'react-native-fontawesome';
import Header from '../../components/header';
import Api from '../../services/api';

export default class Home extends Component {

  static navigationOptions = {
    header: null
  };

  constructor(props) {
    super(props);
  }

  state = {
    data: []
  };

  selectItem(item) {
    this.props.navigation.navigate('Details', item);
  };

  componentDidMount(){
    this.getList();
  }

  async getList(){
    try {
        const token = await AsyncStorage.getItem('@EasyList:token');

        const response = await Api.get('/list/user/1', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        this.setState({ data: response.data });
    } catch(error){
        alert(error);//this.setState({error: error});
    }
  };

  render() {
    return (
      <View>
        <Header title='EasyList' />
        <View style={Styles.containerView}>
          <FlatList
            data={this.state.data}
            keyExtractor={item => item.id}
            renderItem={({ item }) => {
              return (
                <TouchableOpacity onPress={() => this.selectItem(item)}>
                  <View style={Styles.itemListView}>
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

