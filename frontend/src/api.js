import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000' });

export const fetchData = () => API.get('/');

export const fetchUsers = () => API.get('/api/users');
