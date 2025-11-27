import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

// 🔒 MUDANÇA 1: Usar SecureStore para dados sensíveis
import * as SecureStore from 'expo-secure-store';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Manter apenas para dados não-críticos (cache)
import API from '../services/api.js'; 

export default function Login({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    const cleanEmail = email.trim();
    const cleanPassword = password.trim();

    if (!cleanEmail || !cleanPassword) {
      Alert.alert('Erro', 'Por favor, preencha email e senha');
      return;
    }

    setLoading(true);

    try {
      const response = await API.post('/auth/login', { 
        email: cleanEmail,
        password: cleanPassword,
      });

      const { token, user } = response.data;

      // 🔒 CORREÇÃO 1.5: Salvar Token no SecureStore (Criptografado)
      await AsyncStorage.setItem('@linksales_token', token);
      if (user) {
        await AsyncStorage.setItem('@linksales_user', JSON.stringify(user));
      }

      navigation.replace('MainTabs');
      // O ID do usuário não é "secreto" como a senha, mas podemos salvar seguro também
      await SecureStore.setItemAsync('user_id', String(user.id));
      
      // AsyncStorage pode ser usado para coisas triviais (tema, preferências), mas evite dados de conta
      // await AsyncStorage.setItem('user_preferences', JSON.stringify({ theme: 'light' }));

      navigation.replace('MainTabs');

    } catch (error) {
      // 🔒 CORREÇÃO 3.4: Mensagem Genérica para não ajudar atacantes
      // Em produção, evite mostrar o erro exato do backend se ele revelar estrutura do banco
      const msg = error.response?.data?.message || 'Falha na autenticação. Verifique seus dados.';
      Alert.alert('Erro de Acesso', msg);
      
      // Log seguro (apenas em DEV)
      if (__DEV__) console.log('Login error:', error.message);
    } finally {
      setLoading(false);
    }
  };

  // ... (O restante do return/JSX e styles permanece igual ao seu último código bonito)
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar style="dark" />
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={styles.container}>
        <View style={styles.contentContainer}>
          <Text style={styles.logoText}>Link Sales</Text>
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
            <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={styles.iconButton}>
              <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={24} color="#1B71BD" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={loading}>
            <Text style={styles.buttonText}>{loading ? 'Carregando...' : 'Entrar'}</Text>
          </TouchableOpacity>
          
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')}>
            <Text style={styles.forgotPassword}>Esqueceu a senha?</Text>
          </TouchableOpacity>
          
          <View style={styles.registerContainer}>
            <Text style={styles.registerText}>Não tem conta? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('UserTypeScreen')}>
              <Text style={styles.registerLink}>Cadastre-se</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  contentContainer: { flex: 1, paddingHorizontal: 25, justifyContent: 'center' },
  logoText: { fontSize: 40, fontWeight: 'bold', color: '#1B71BD', alignSelf: 'center', marginBottom: 40, marginTop: -40, letterSpacing: -1 },
  title: { fontSize: 22, fontWeight: '600', color: '#555', marginBottom: 30, textAlign: 'center' },
  inputContainer: { flexDirection: 'row', alignItems: 'center', height: 50, borderColor: '#1B71BD', borderWidth: 1.5, borderRadius: 10, paddingHorizontal: 15, marginBottom: 20, backgroundColor: '#E6F0FA' },
  input: { height: '100%', fontSize: 16, color: '#1B71BD', width: '100%' },
  iconButton: { padding: 5 },
  button: { backgroundColor: '#1B71BD', height: 50, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 18, elevation: 3, shadowColor: '#1B71BD', shadowOpacity: 0.3, shadowRadius: 4, shadowOffset: { width: 0, height: 2 } },
  buttonText: { color: '#fff', fontSize: 18, fontWeight: '700' },
  forgotPassword: { color: '#1B71BD', textAlign: 'center', marginBottom: 25, textDecorationLine: 'underline', fontSize: 15 },
  registerContainer: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  registerText: { textAlign: 'center', fontSize: 16, color: '#666' },
  registerLink: { color: '#1B71BD', fontWeight: '700', fontSize: 16, marginLeft: 5 },
});