import axios from 'axios';

const api = axios.create({
  baseURL: 'http://easy-list2018.herokuapp.com/'
});

api.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsiaWQiOjF9LCJpYXQiOjE1NDA0NDE3NDIsImV4cCI6MTU0MzAzMzc0Mn0.AHdtqn-YIvp_XPejpYWg99U4it9yLml8zCRarfCxY7E';

export default api;