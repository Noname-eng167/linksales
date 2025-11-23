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
  ScrollView,
  ActivityIndicator
} from 'react-native';

import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';

import API from '../services/api.js'; 

export default function Register({ navigation, route }) {
  // Pega o tipo enviado pela tela UserTypeScreen (padrão: cliente)
  const { userType } = route.params || { userType: 'cliente' };
  const isMerchant = userType === 'comerciante';

  // Estados do Formulário
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [document, setDocument] = useState(''); // CPF ou CNPJ
  const [phone, setPhone] = useState('');
  const [birthDate, setBirthDate] = useState(''); // Apenas Cliente
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Estados de UI
  const [hidePassword, setHidePassword] = useState(true);
  const [loading, setLoading] = useState(false);

  const handleRegister = async () => {
    // 1. Validação Básica
    if (!name || !email || !document || !password) {
      Alert.alert('Erro', 'Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Erro', 'As senhas não conferem.');
      return;
    }

    setLoading(true);

    try {
      // 2. Monta o objeto de dados dependendo do tipo
      const payload = {
        email,
        senha: password,
        tipo_conta: userType, // 'cliente' ou 'comerciante'
        telefone: phone,
        
        // Mapeamento dinâmico para o backend
        nome: name, 
        nome_comerciante: isMerchant ? name : undefined, 
        
        cpf: document, 
        
        nascimento: !isMerchant ? birthDate : undefined, 
      };

      // 3. Chamada API
      await API.post('/auth/users', payload);

      Alert.alert('Sucesso', 'Conta criada com sucesso! Faça login para continuar.', [
        { text: 'OK', onPress: () => navigation.navigate('Login') }
      ]);

    } catch (error) {
      console.error(error);
      if (error.response) {
        Alert.alert('Erro', error.response.data.message || error.response.data.error || 'Erro ao cadastrar.');
      } else {
        Alert.alert('Erro', 'Falha na conexão com o servidor.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
      <StatusBar style="dark" />
      
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          
          {/* Header com Voltar */}
          <View style={styles.header}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
              <Ionicons name="arrow-back" size={24} color="#333" />
            </TouchableOpacity>
            <Text style={styles.headerTitle}>
              {isMerchant ? 'Criar Loja' : 'Criar Conta'}
            </Text>
          </View>

          <Text style={styles.subtitle}>Preencha os dados abaixo.</Text>

          {/* === FORMULÁRIO === */}

          <Field 
            label={isMerchant ? "Nome da Loja" : "Nome Completo"}
            placeholder={isMerchant ? "Ex: Link Sales Modas" : "Ex: João da Silva"}
            value={name}
            onChange={setName}
            icon="person-outline"
          />

          <FieldMask
            label={isMerchant ? "CNPJ" : "CPF"}
            type={isMerchant ? 'cnpj' : 'cpf'}
            placeholder={isMerchant ? "00.000.000/0000-00" : "000.000.000-00"}
            value={document}
            onChange={setDocument}
            icon="card-outline"
          />

          {!isMerchant && (
            <FieldMask
              label="Data de Nascimento"
              type="datetime"
              options={{ format: 'YYYY-MM-DD' }}
              placeholder="DD/MM/AAAA"
              value={birthDate}
              onChange={setBirthDate}
              icon="calendar-outline"
            />
          )}

          <FieldMask
            label="Telefone / WhatsApp"
            type="cel-phone"
            options={{ maskType: 'BRL', withDDD: true, dddMask: '(99) ' }}
            placeholder="(00) 00000-0000"
            value={phone}
            onChange={setPhone}
            icon="call-outline"
          />

          <Field 
            label="E-mail"
            placeholder="email@exemplo.com"
            value={email}
            onChange={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
            icon="mail-outline"
          />

          {/* 6. Senha (COM ÍCONE DE OLHO) */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Senha</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={[styles.input, { flex: 1 }]}
                placeholder="Crie uma senha"
                secureTextEntry={hidePassword}
                value={password}
                onChangeText={setPassword}
                placeholderTextColor="#aaa"
              />
              <TouchableOpacity onPress={() => setHidePassword(!hidePassword)} style={{ padding: 5 }}>
                <Ionicons name={hidePassword ? 'eye-off' : 'eye'} size={22} color="#1B71BD" />
              </TouchableOpacity>
            </View>
          </View>

          {/* 7. Confirmar Senha (SEM ÍCONE DE OLHO - SEMPRE OCULTO) */}
          <View style={styles.inputWrapper}>
            <Text style={styles.label}>Confirmar Senha</Text>
            <View style={styles.inputContainer}>
              <Ionicons name="lock-closed-outline" size={20} color="#666" style={styles.inputIcon} />
              <TextInput
                style={styles.input}
                placeholder="Repita a senha"
                secureTextEntry={true} // Sempre true (sempre bolinhas)
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholderTextColor="#aaa"
              />
              {/* Removi o TouchableOpacity do olho daqui */}
            </View>
          </View>

          <TouchableOpacity 
            style={styles.button} 
            onPress={handleRegister}
            disabled={loading}
          >
            {loading ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Cadastrar</Text>
            )}
          </TouchableOpacity>

        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

// ... (Funções Field, FieldMask e Styles permanecem iguais)
function Field({ label, value, onChange, placeholder, keyboardType, autoCapitalize, icon }) {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon && <Ionicons name={icon} size={20} color="#666" style={styles.inputIcon} />}
        <TextInput
          style={styles.input}
          value={value}
          onChangeText={onChange}
          placeholder={placeholder}
          keyboardType={keyboardType}
          autoCapitalize={autoCapitalize || 'words'}
          placeholderTextColor="#aaa"
        />
      </View>
    </View>
  );
}

function FieldMask({ label, type, options, value, onChange, placeholder, icon }) {
  return (
    <View style={styles.inputWrapper}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputContainer}>
        {icon && <Ionicons name={icon} size={20} color="#666" style={styles.inputIcon} />}
        <TextInputMask
          type={type}
          options={options}
          value={value}
          onChangeText={onChange}
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#aaa"
          keyboardType="numeric"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    padding: 25,
    paddingBottom: 50,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 8,
    marginRight: 10,
    marginLeft: -10,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B71BD',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputWrapper: {
    marginBottom: 20,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    marginLeft: 4,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    paddingHorizontal: 15,
    height: 52,
    backgroundColor: '#fafafa',
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: '100%',
    fontSize: 16,
    color: '#333',
  },
  button: {
    backgroundColor: '#1B71BD',
    height: 56,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
    elevation: 4,
    shadowColor: '#1B71BD',
    shadowOpacity: 0.3,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 4 },
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});