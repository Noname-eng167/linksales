import React from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  StyleSheet 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';

const lojas = [
  {
    id: '1',
    nome: 'Sapatária Muniz',
    endereco: 'R. Quinze de Novembro, 111',
    foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTvIFDmoNL2MNl6FNkUELeKILywpdo27yVXQ&s',
  },
  {
    id: '2',
    nome: 'Esposende',
    endereco: 'R. Cel. João Guilherme, 85',
    foto: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTbFFRboCGH2e1OHGjkqOPwv_Ye9Ni3S6fcvg&s',
  },
  {
    id: '3',
    nome: 'Renner',
    endereco: 'Shopping Caruaru',
    foto: 'https://amanha.com.br/images/p/14285/Fachada-de-uma-das-lojas-da-Renner.jpg',
  },
];

export default function CalcadosScreen({ navigation }) {
  
  const irParaPerfilLoja = (loja) => {
    navigation.navigate('StoreProfile', { loja: loja });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => irParaPerfilLoja(item)} 
      activeOpacity={0.7}
    >
      <Image
        source={{ uri: item.foto }}
        style={styles.foto}
        resizeMode="cover"
      />
      <View style={styles.infoContainer}>
        <Text style={styles.nome}>{item.nome}</Text>
        <View style={styles.enderecoContainer}>
          <Ionicons name="location-outline" size={14} color="#666" style={{ marginRight: 4 }} />
          <Text style={styles.endereco} numberOfLines={1}>{item.endereco}</Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color="#ccc" />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Cabeçalho */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#1B71BD" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Lojas de Calçados</Text>
        <View style={{ width: 24 }} /> 
      </View>

      <FlatList
        data={lojas}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        contentContainerStyle={styles.lista}
        showsVerticalScrollIndicator={false}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    elevation: 2, 
    shadowColor: '#000', 
    shadowOpacity: 0.1,
    shadowRadius: 3,
    shadowOffset: { width: 0, height: 2 },
    marginBottom: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B71BD',
  },
  lista: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 12,
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  foto: {
    width: 70,
    height: 70,
    borderRadius: 10,
    backgroundColor: '#eee',
  },
  infoContainer: {
    flex: 1,
    marginLeft: 16,
    justifyContent: 'center',
  },
  nome: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333',
    marginBottom: 4,
  },
  enderecoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  endereco: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
});