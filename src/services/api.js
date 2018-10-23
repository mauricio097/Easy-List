import axios from 'axios';



const api = axios.create({
  baseURL: 'http://easy-list2018.herokuapp.com/'
});

api.defaults.headers.common['Authorization'] = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXJhbXMiOnsiaWQiOjF9LCJpYXQiOjE1NDAyNjE2NzQsImV4cCI6MTU0MDM0ODA3NH0.XqbxGlCy3XDQwZLFA-6AYIA01y_qSatPtRdwHK58NbU';

export default api;