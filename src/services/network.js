import { NetInfo } from 'react-native';

const network = {
    connected: null,
    isConnected(){
        NetInfo.isConnected.fetch().done((isConnected) => {
            this.connected = isConnected;            
        });
    },
    changeConnection(){
        NetInfo.isConnected.addEventListener('connectionChange', (res) => {
            this.connected = res;              
            if(res){
              ToastAndroid.show('Você está Online', ToastAndroid.SHORT);              
            }
            else{
                ToastAndroid.show('Você está Offline', ToastAndroid.SHORT); 
            }
        });
    }
}

export default network;