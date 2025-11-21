import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Seu IP correto (mantenha o que está funcionando para você)
const API_IP_ADDRESS = '10.0.0.214'; 

const api = axios.create({
  baseURL: `http://${API_IP_ADDRESS}:3000`, 
  headers: {
    'Content-Type': 'application/json',
  },
});

// O INTERCEPTOR MÁGICO (Isso que faltava funcionar direito)
api.interceptors.request.use(
  async (config) => {
    // 1. Busca o token salvo no celular
    const token = await AsyncStorage.getItem('@linksales_token');
    
    // 2. Se tiver token, cola ele na testa da requisição
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;