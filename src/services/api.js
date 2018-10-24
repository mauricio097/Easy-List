import axios from 'axios';

const api = axios.create({
  baseURL: 'http://easy-list2018.herokuapp.com/'
});

api.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsiaWQiOjF9LCJpYXQiOjE1NDAzNTY5MzksImV4cCI6MTU0MDQ0MzMzOX0.PFwQVbi1zYJtF1jmmNmKyeF18V_nbqDjnyp84ZbQUik';

export default api;