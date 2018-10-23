import React, { PureComponent } from 'react';
import { View, Text, NetInfo } from 'react-native';

function CheckInternet() {
  return (
    <View >
      <Text >No Internet Connection</Text>
    </View>
  );
}

function Connected() {
  return (
    <View >
      <Text>Internet Connected..!!</Text>
    </View>
  );
}

export default class InternetConnectivity extends PureComponent {
   state = {
    isConnected: true
  };

  componentDidMount() {
    NetInfo.isConnected.addEventListener('connectionChange', this.handleConnectivityChange);
  }

  componentWillUnmount() {
    NetInfo.isConnected.removeEventListener('connectionChange', this.handleConnectivityChange);
  }

  handleConnectivityChange = isConnected => {
      this.setState({isConnected });
  };

  render() {
    if (!this.state.isConnected) {
      return <CheckInternet />;
    }
    return <Connected />;
  }
}