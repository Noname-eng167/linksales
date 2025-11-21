import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { TextInputMask } from 'react-native-masked-text';
import { TextInput } from 'react-native-gesture-handler';

export default function Register({ navigation }) {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [cpf, setCpf] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

 const handleRegister = () => {
  if (!name || !surname || !cpf || !birthdate || !email || !password || !confirmPassword) {
    Alert.alert('Erro', 'Por favor, preencha todos os campos.');
    return;
  }

  if (password.length < 8) {
    Alert.alert('Erro', 'A senha deve ter no mínimo 8 caracteres.');
    return;
  }

  if (password !== confirmPassword) {
    Alert.alert('Erro', 'As senhas não coincidem.');
    return;
  }

  navigation.replace('MainTabs');
};


  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Nome</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira seu nome"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
        />

        <Text style={styles.label}>Sobrenome</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira seu sobrenome"
          value={surname}
          onChangeText={setSurname}
          autoCapitalize="words"
        />

        <Text style={styles.label}>CPF</Text>
        <TextInputMask
          type={'cpf'}
          value={cpf}
          onChangeText={setCpf}
          style={styles.input}
          placeholder="000.000.000-00"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Data de Nascimento</Text>
        <TextInputMask
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
          value={birthdate}
          onChangeText={setBirthdate}
          style={styles.input}
          placeholder="DD/MM/AAAA"
          keyboardType="numeric"
        />

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira seu email"
          keyboardType="email-address"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />

        <Text style={styles.label}>Senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Insira sua senha"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />

        <Text style={styles.label}>Confirme sua senha</Text>
        <TextInput
          style={styles.input}
          placeholder="Confirme sua senha"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />

        <TouchableOpacity style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Cadastrar</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.link}>Já tem uma conta? Fazer login</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#F2F4F7',
    justifyContent: 'center',
    padding: 20,
  },
  form: {
    backgroundColor: '#fff',
    padding: 25,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 6,
    elevation: 4,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 12,
    backgroundColor: '#f9f9f9',
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1B71BD',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    marginTop: 20,
    textAlign: 'center',
    color: '#1B71BD',
    textDecorationLine: 'underline',
  },
});
