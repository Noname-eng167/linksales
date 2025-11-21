import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  ScrollView, 
  TouchableOpacity 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

export default function StoreProfileScreen({ route, navigation }) {
  // Pega os dados passados pela tela anterior
  // Se não vier nada, usa um objeto vazio {} para não dar erro
  const { loja } = route.params || {};

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        {/* Cabeçalho com Botão Voltar */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#1B71BD" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Perfil da Loja</Text>
          <View style={{ width: 40 }} />
        </View>

        {/* Card Principal da Loja */}
        <View style={styles.profileCard}>
          <Image 
            source={{ uri: loja?.foto || 'https://via.placeholder.com/150' }} 
            style={styles.storeImage} 
          />
          <Text style={styles.storeName}>{loja?.nome || 'Nome da Loja'}</Text>
          <Text style={styles.storeCategory}>Moda & Vestuário</Text>
          
          {/* Avaliação (Exemplo) */}
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFD700" />
            <Text style={styles.ratingText}>4.8 (120 avaliações)</Text>
          </View>
        </View>

        {/* Seção de Informações (Endereço, Contato) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Informações</Text>
          
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={22} color="#666" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Endereço</Text>
              <Text style={styles.infoValue}>{loja?.endereco || 'Endereço não informado'}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="time-outline" size={22} color="#666" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Horário</Text>
              <Text style={styles.infoValue}>Aberto agora • Fecha às 22:00</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="call-outline" size={22} color="#666" />
            <View style={styles.infoTextContainer}>
              <Text style={styles.infoLabel}>Telefone</Text>
              <Text style={styles.infoValue}>(81) 99999-9999</Text>
            </View>
          </View>
        </View>

        {/* Botão de Ação Principal */}
        <TouchableOpacity style={styles.actionButton} activeOpacity={0.8}>
          <Text style={styles.actionButtonText}>Ver Produtos</Text>
        </TouchableOpacity>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f6f8',
  },
  scrollContent: {
    paddingBottom: 30,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profileCard: {
    alignItems: 'center',
    backgroundColor: '#fff',
    marginHorizontal: 20,
    marginTop: 10,
    padding: 25,
    borderRadius: 20,
    elevation: 4, // Sombra Android
    shadowColor: '#000', // Sombra iOS
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
  },
  storeImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 15,
    backgroundColor: '#eee',
  },
  storeName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B71BD',
    textAlign: 'center',
  },
  storeCategory: {
    fontSize: 16,
    color: '#666',
    marginTop: 5,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    backgroundColor: '#FFF9E5',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
  },
  ratingText: {
    marginLeft: 5,
    fontSize: 14,
    fontWeight: '600',
    color: '#F5A623',
  },
  section: {
    marginTop: 25,
    marginHorizontal: 20,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  infoTextContainer: {
    marginLeft: 15,
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginLeft: 38, // Alinha com o texto
  },
  actionButton: {
    backgroundColor: '#1B71BD',
    marginHorizontal: 20,
    marginTop: 30,
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    elevation: 3,
  },
  actionButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
  },
});