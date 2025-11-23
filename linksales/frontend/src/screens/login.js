import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/api.js'; 

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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
      <StatusBar style="dark" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <View style={styles.contentContainer}>
          
          {/* Logo em Texto */}
          <Text style={styles.logoText}>Link Sales</Text>
          
          {/* Título */}
          <Text style={styles.title}>Acesse sua conta</Text>
          
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
          
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { flex: 1 }]}
              placeholder="Senha"
              secureTextEntry={hidePassword}
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
          
          <TouchableOpacity onPress={() => navigation.navigate('UserTypeScreen')}>
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
    justifyContent: 'center', // Mantém todo o conteúdo centralizado verticalmente na tela
  },
  logoText: {
    fontSize: 40,
    fontWeight: 'bold',
    color: '#1B71BD',
    alignSelf: 'center', // Centraliza horizontalmente
    marginBottom: 40, // AUMENTADO: De 10 para 40, para afastar e subir a logo em relação ao título
    letterSpacing: -1,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 30, // AJUSTADO: De 40 para 30, para equilibrar o espaço com os inputs
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
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
    width: '100%',
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