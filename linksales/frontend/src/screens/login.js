import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

// Importações para UI segura e Ícones
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/api.js'; 

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  // Estado para controlar a visibilidade da senha
  const [hidePassword, setHidePassword] = useState(true);
  
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert('Erro', 'Por favor, preencha email e senha');
      return;
    }

    setLoading(true);

    try {
      const response = await API.post('/auth/login', { 
        email,
        password,
      });

      const { token, user } = response.data;
      await AsyncStorage.setItem('@linksales_token', token);
      await AsyncStorage.setItem('@linksales_user_id', String(user.id));

      // Alert.alert('Sucesso', 'Login realizado!'); // Opcional
      navigation.replace('MainTabs');

    } catch (error) {
      setLoading(false);
      if (error.response) {
        Alert.alert('Erro de Login', error.response.data.message || 'Credenciais inválidas.');
      } else if (error.request) {
        Alert.alert('Erro de Conexão', 'Não foi possível conectar ao servidor. Verifique se o backend está rodando e o IP está correto.');
      } else {
        Alert.alert('Erro', 'Ocorreu um erro inesperado.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Garante que a barra de status fique com ícones escuros */}
      <StatusBar style="dark" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.contentContainer}>
          <Image
            source={require('../assets/logo4.png')}
            style={styles.logo}
            resizeMode="contain"
          />
          
          <Text style={styles.title}>Bem-vindo de volta!</Text>
          
          {/* Input de Email */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              value={email}
              onChangeText={setEmail}
              placeholderTextColor="#1B71BD"
            />
          </View>
          
          {/* Input de Senha com Ícone */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]} // flex: 1 para ocupar o espaço sobrando
              placeholder="Senha"
              secureTextEntry={hidePassword} // Usa o estado
              value={password}
              onChangeText={setPassword}
              placeholderTextColor="#1B71BD"
            />
            <TouchableOpacity 
              onPress={() => setHidePassword(!hidePassword)} 
              style={styles.iconButton}
            >
              <Ionicons 
                name={hidePassword ? 'eye-off' : 'eye'} 
                size={24} 
                color="#1B71BD" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleLogin}
            disabled={loading}
          >
            <Text style={styles.buttonText}>
              {loading ? 'Carregando...' : 'Entrar'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.registerText}>
              Não tem conta? <Text style={styles.registerLink}>Cadastre-se</Text>
            </Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  contentContainer: {
    flex: 1,
    paddingHorizontal: 25,
    justifyContent: 'center',
  },
  logo: {
    width: 180,
    height: 80,
    alignSelf: 'center',
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B71BD',
    marginBottom: 30,
    textAlign: 'center',
  },
  // Estilo novo para o container do input (com a borda)
  inputContainer: {
    flexDirection: 'row', // Coloca input e icone lado a lado
    alignItems: 'center',
    height: 50,
    borderColor: '#1B71BD',
    borderWidth: 1.5,
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    backgroundColor: '#E6F0FA',
  },
  input: {
    height: '100%',
    fontSize: 16,
    color: '#1B71BD',
    width: '100%', // Ocupa tudo se não tiver ícone
  },
  iconButton: {
    padding: 5,
  },
  button: {
    backgroundColor: '#1B71BD',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 18,
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
  forgotPassword: {
    color: '#1B71BD',
    textAlign: 'center',
    marginBottom: 25,
    textDecorationLine: 'underline',
    fontSize: 16,
  },
  registerText: {
    textAlign: 'center',
    fontSize: 16,
    color: '#555',
  },
  registerLink: {
    color: '#1B71BD',
    fontWeight: '700',
  },
});