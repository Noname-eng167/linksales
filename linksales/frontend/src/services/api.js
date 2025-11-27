import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ ATENÇÃO: Para desenvolvimento local com Expo Go no celular físico, 
// você DEVE usar o IP da sua máquina (ex: 192.168.X.X).
// Se estiver no Emulador Android do PC, use '10.0.2.2'.
// Para produção, isso deve vir de uma variável de ambiente (ex: process.env.API_URL)
const API_URL = 'http://10.0.0.214:3000'; 

const api = axios.create({
  baseURL: API_URL,
  timeout: 10000, // 🔒 Segurança 3.2: Define um limite de 10 segundos para não travar o app
  headers: {
    'Content-Type': 'application/json',
  },
});

// 🔒 Interceptor de Requisição: Injeta o Token automaticamente
api.interceptors.request.use(
  async (config) => {
    try {
      // Recupera o token salvo no Login
      const token = await AsyncStorage.getItem('@linksales_token');
      
      if (token) {
        // Adiciona o token no cabeçalho Authorization
        config.headers.Authorization = `Bearer ${token}`;
      }
    } catch (error) {
      console.error("Erro ao recuperar token:", error);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 🔒 Interceptor de Resposta: Trata erros globais (Segurança 4.1)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    // Aqui você pode tratar erros globais, como Token Expirado (401)
    if (error.response && error.response.status === 401) {
      // Opcional: Limpar o storage e forçar logout se o token for inválido
      // await AsyncStorage.multiRemove(['@linksales_token', '@linksales_user_id']);
      console.log("Sessão expirada ou não autorizada.");
    }
    
    // Repassa o erro para o componente tratar (ex: mostrar Alert)
    return Promise.reject(error);
  }
);

export default api;