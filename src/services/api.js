import axios from 'axios';

const api = axios.create({
  baseURL: 'http://easy-list2018.herokuapp.com/',
});

export default api;