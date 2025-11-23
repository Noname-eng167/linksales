import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function UserTypeScreen({ navigation }) {
  
  const handleSelection = (type) => {
    // Navega para o registro enviando o tipo escolhido ('cliente' ou 'comerciante')
    navigation.navigate('Register', { userType: type });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Criar Conta</Text>
      </View>

      <Text style={styles.subtitle}>Como você deseja se cadastrar?</Text>

      <View style={styles.optionsContainer}>
        {/* Opção Cliente */}
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => handleSelection('cliente')}
          activeOpacity={0.8}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#E3F2FD' }]}>
            <Ionicons name="person" size={32} color="#1B71BD" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Sou Cliente</Text>
            <Text style={styles.cardDesc}>Quero comprar produtos e ver lojas.</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>

        {/* Opção Lojista */}
        <TouchableOpacity 
          style={styles.card} 
          onPress={() => handleSelection('comerciante')}
          activeOpacity={0.8}
        >
          <View style={[styles.iconContainer, { backgroundColor: '#FFF3E0' }]}>
            <Ionicons name="storefront" size={32} color="#F57C00" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.cardTitle}>Sou Lojista</Text>
            <Text style={styles.cardDesc}>Quero vender meus produtos e gerenciar minha loja.</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#ccc" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff', padding: 20 },
  header: { flexDirection: 'row', alignItems: 'center', marginBottom: 40 },
  backButton: { padding: 8, marginRight: 10 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#333' },
  subtitle: { fontSize: 20, fontWeight: '600', color: '#555', marginBottom: 30 },
  optionsContainer: { gap: 20 },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#eee',
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  iconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  textContainer: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#333', marginBottom: 4 },
  cardDesc: { fontSize: 14, color: '#666', lineHeight: 20 },
});