import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TextInputMask } from 'react-native-masked-text';
import AsyncStorage from '@react-native-async-storage/async-storage';
import API from '../services/api'; 

export default function AccountCenterScreen({ navigation }) {
  const [userData, setUserData] = useState({
    nome_comerciante: '', 
    email: '',
    cpf: '',
    telefone: '',
  });

  const [loading, setLoading] = useState(true);

  // Usamos useCallback para garantir que a função seja estável
  const fetchUserData = useCallback(async () => {
    try {
      setLoading(true);
      const userId = await AsyncStorage.getItem('@linksales_user_id');
      
      if (!userId) {
        Alert.alert('Erro', 'Usuário não identificado.');
        // navigation.replace('Login'); // Opcional: redirecionar se não tiver ID
        return;
      }

      const response = await API.get(`/auth/users/${userId}`);
      const data = response.data;
      
      setUserData({
        nome_comerciante: data.nome_comerciante || '',
        email: data.email || '',
        cpf: data.cpf || '', 
        telefone: data.telefone || '',
      });

    } catch (err) {
      console.error("Erro ao buscar dados:", err);
      Alert.alert('Erro', 'Não foi possível carregar seus dados.');
    } finally {
      setLoading(false);
    }
  }, []); // Sem dependências externas

  const saveData = async () => {
    try {
      const userId = await AsyncStorage.getItem('@linksales_user_id');
      await API.put(`/auth/users/${userId}`, userData);
      Alert.alert('Sucesso', 'Dados salvos com sucesso!');
    } catch (err) {
      console.error("Erro ao salvar:", err);
      Alert.alert('Erro', 'Falha ao salvar os dados.');
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]); // Agora fetchUserData é uma dependência válida

  const handleChange = (key, value) => {
    setUserData((prev) => ({ ...prev, [key]: value }));
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1B71BD" />
      </View>
    );
  }

  return (

    <SafeAreaView style={{ flex: 1, backgroundColor: '#fff' }}>
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Central de Conta</Text>

      <Field 
        label="Nome do Comerciante" 
        value={userData.nome_comerciante} 
        onChange={(v) => handleChange('nome_comerciante', v)} 
        placeholder="Nome da Loja" 
      />
      
      <Field
        label="E-mail"
        value={userData.email}
        onChange={(v) => handleChange('email', v)}
        placeholder="email@exemplo.com"
        keyboardType="email-address"
        autoCapitalize="none"
        // Pode adicionar editable={false} se não quiser permitir troca de email
      />

      <FieldMask
        label="CPF/CNPJ"
        type="cpf" 
        value={userData.cpf}
        onChange={(v) => handleChange('cpf', v)}
        placeholder="000.000.000-00"
        keyboardType="numeric"
      />
      
      <FieldMask
        label="Telefone"
        type="cel-phone"
        options={{
          maskType: 'BRL',
          withDDD: true,
          dddMask: '(99) '
        }}
        value={userData.telefone}
        onChange={(v) => handleChange('telefone', v)}
        placeholder="(99) 99999-9999"
        keyboardType="numeric"
      />

      <TouchableOpacity style={styles.saveButton} onPress={saveData}>
        <Text style={styles.saveButtonText}>Salvar Alterações</Text>
      </TouchableOpacity>
    </ScrollView>
    </SafeAreaView>
  );
}

function Field({ label, value, onChange, placeholder, keyboardType, autoCapitalize, maxLength, secureTextEntry, editable = true }) {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={[styles.input, !editable && { backgroundColor: '#eee', color: '#999' }]}
        value={value}
        onChangeText={onChange}
        placeholder={placeholder}
        keyboardType={keyboardType}
        autoCapitalize={autoCapitalize || 'sentences'}
        maxLength={maxLength}
        secureTextEntry={secureTextEntry}
        editable={editable}
      />
    </View>
  );
}

function FieldMask({ label, type, options, value, onChange, placeholder, keyboardType }) {
  return (
    <View style={{ marginBottom: 15 }}>
      <Text style={styles.label}>{label}</Text>
      <TextInputMask
        type={type}
        options={options}
        value={value}
        onChangeText={onChange}
        style={styles.input}
        placeholder={placeholder}
        keyboardType={keyboardType}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: '#fff',
    paddingBottom: 40,
    flexGrow: 1
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 25,
    color: '#1B71BD',
    textAlign: 'center',
    marginTop: 20
  },
  label: {
    fontSize: 14,
    color: '#555',
    marginBottom: 6,
    fontWeight: '500',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 14,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: '#fafafa',
    color: '#222',
  },
  saveButton: {
    backgroundColor: '#1B71BD',
    borderRadius: 10,
    paddingVertical: 14,
    marginTop: 30,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});