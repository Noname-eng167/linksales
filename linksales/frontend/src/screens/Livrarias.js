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
    nome: 'Livraria Leitura',
    endereco: 'Shopping Caruaru',
    foto: 'https://www.shoppingibirapuera.com.br/wp-content/uploads/2024/06/LEITURA.jpeg',
  },
  {
    id: '2',
    nome: 'Livraria Municipal',
    endereco: 'Centro de Caruaru',
    foto: 'https://images.adsttc.com/media/images/6307/7b0c/cbf2/2510/43df/5b9e/large_jpg/livraria-cabeceira-estudio-guega_6.jpg',
  },
  {
    id: '3',
    nome: 'Livraria Luz e Vida',
    endereco: 'Shopping Difusora',
    foto: 'https://erikanovaes.com.br/wp-content/uploads/2020/01/LIVRARIA-LUZ-E-VIDA-Projeto-Erika-Novaes.jpg',
  },
];

export default function LivrariasScreen({ navigation }) {
  
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
        <Text style={styles.headerTitle}>Livrarias</Text>
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