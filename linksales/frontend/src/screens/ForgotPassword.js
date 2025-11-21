import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, Alert, StyleSheet } from 'react-native';

export default function ForgotPassword({ navigation }) {
  const [email, setEmail] = useState('');

  const handleSend = () => {
    if (!email.trim()) {
      Alert.alert('Erro', 'Por favor, insira seu e-mail.');
      return;
    }
    Alert.alert('Sucesso', `Instruções enviadas para ${email}`);
    setEmail('');
    navigation.navigate('Login');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recuperar Senha</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu e-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      <TouchableOpacity style={styles.button} onPress={handleSend}>
        <Text style={styles.buttonText}>Enviar</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')}>
        <Text style={styles.link}>Voltar para login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, backgroundColor: '#fff' },
  title: { fontSize: 24, marginBottom: 20, textAlign: 'center', color: '#1B71BD' },
  input: { borderWidth: 1, borderColor: '#1B71BD', borderRadius: 8, padding: 10, marginBottom: 20 },
  button: { backgroundColor: '#1B71BD', padding: 12, borderRadius: 8, alignItems: 'center' },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  link: { marginTop: 15, textAlign: 'center', color: '#1B71BD', textDecorationLine: 'underline' },
});
