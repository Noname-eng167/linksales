import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

export default function EditProfileName() {
  const [name, setName] = useState('');

  const handleSave = () => {
    // Lógica de salvar no BD virá aqui
    console.log('Novo nome salvo:', name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Novo Nome do Perfil:</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite seu nome"
        value={name}
        onChangeText={setName}
      />
      <Button title="Salvar" onPress={handleSave} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 16,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 12,
    marginBottom: 20,
    borderRadius: 6,
  },
});
