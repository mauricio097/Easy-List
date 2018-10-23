import { AsyncStorage } from 'react-native';

export default isLogged = () => {
  const token = null;//AsyncStorage.getItem('@EasyList:token');
  return token ? true:false;
};
