import axios from 'axios';

const api = axios.create({
  baseURL: 'https://simexpro.azurewebsites.net/',
  headers: {
    'Access-Control-Allow-Origin': '*', // o el dominio permitido
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  },
});

export default api;
