import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TextInput, 
  FlatList, 
  Image, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

// Dados das Categorias (Ícones circulares no topo)
const categorias = [
  { id: '1', nome: 'Roupas', icone: 'shirt-outline', rota: 'Roupas' },
  { id: '2', nome: 'Livros', icone: 'book-outline', rota: 'Livros' },
  { id: '3', nome: 'Calçados', icone: 'footsteps-outline', rota: 'Calcados' },
  { id: '4', nome: 'Eletrônicos', icone: 'phone-portrait-outline', rota: 'Eletronicos' },
];

// Dados de Destaques (Feed estilo Instagram/Loja)
const destaques = [
  {
    id: '1',
    loja: 'Renner',
    produto: 'Coleção Verão 2025',
    imagem: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80',
    rota: 'Roupas' // Leva para a categoria ou loja específica
  },
  {
    id: '2',
    loja: 'Saraiva',
    produto: 'Best Sellers',
    imagem: 'https://images.unsplash.com/photo-1507842217121-9e9f1479b097?w=600&q=80',
    rota: 'Livros'
  },
  {
    id: '3',
    loja: 'Centauro',
    produto: 'Tênis de Corrida',
    imagem: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600&q=80',
    rota: 'Calcados'
  }
];

export default function Home() {
  const navigation = useNavigation();
  const [busca, setBusca] = useState('');

  const irPara = (rota) => {
    if (rota) {
      navigation.navigate(rota);
    } else {
      alert('Categoria em breve!');
    }
  };

  const renderCategoria = ({ item }) => (
    <TouchableOpacity style={styles.catItem} onPress={() => irPara(item.rota)}>
      <View style={styles.catIconContainer}>
        <Ionicons name={item.icone} size={24} color="#1B71BD" />
      </View>
      <Text style={styles.catText}>{item.nome}</Text>
    </TouchableOpacity>
  );

  const renderDestaque = ({ item }) => (
    <TouchableOpacity 
      style={styles.cardDestaque} 
      activeOpacity={0.9}
      onPress={() => irPara(item.rota)}
    >
      <Image source={{ uri: item.imagem }} style={styles.cardImage} resizeMode="cover" />
      <View style={styles.cardOverlay}>
        <Text style={styles.cardTitle}>{item.loja}</Text>
        <Text style={styles.cardSubtitle}>{item.produto}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        
        {/* Cabeçalho com Saudação e Carrinho */}
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Olá, Cliente 👋</Text>
            <Text style={styles.subtitle}>O que você procura hoje?</Text>
          </View>
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart-outline" size={24} color="#333" />
          </TouchableOpacity>
        </View>

        {/* Barra de Pesquisa */}
        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
          <TextInput 
            placeholder="Buscar lojas ou produtos..." 
            style={styles.searchInput} 
            value={busca}
            onChangeText={setBusca}
          />
        </View>

        {/* Categorias (Lista Horizontal) */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Categorias</Text>
          <FlatList
            data={categorias}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id}
            renderItem={renderCategoria}
            contentContainerStyle={styles.catList}
          />
        </View>

        {/* Feed de Destaques */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Destaques da Semana</Text>
          {destaques.map((item) => (
            <View key={item.id} style={{ marginBottom: 20 }}>
              {renderDestaque({ item })}
            </View>
          ))}
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 10,
    marginBottom: 20,
  },
  greeting: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B71BD',
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
  },
  cartButton: {
    padding: 10,
    backgroundColor: '#fff',
    borderRadius: 50,
    elevation: 2,
  },
  searchContainer: {
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 12,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginBottom: 25,
    height: 50,
    elevation: 2, // Sombra Android
    shadowColor: '#000', // Sombra iOS
    shadowOpacity: 0.05,
    shadowRadius: 5,
    shadowOffset: { width: 0, height: 2 },
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#333',
    fontSize: 16,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginLeft: 20,
    marginBottom: 15,
  },
  catList: {
    paddingLeft: 20,
    paddingRight: 10,
  },
  catItem: {
    alignItems: 'center',
    marginRight: 20,
  },
  catIconContainer: {
    width: 60,
    height: 60,
    backgroundColor: '#E6F0FA',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  catText: {
    fontSize: 12,
    color: '#555',
    fontWeight: '500',
  },
  cardDestaque: {
    marginHorizontal: 20,
    height: 200,
    borderRadius: 16,
    overflow: 'hidden',
    backgroundColor: '#000',
    elevation: 4,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    opacity: 0.8, // Deixa a imagem um pouco mais escura para o texto aparecer
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    padding: 15,
    backgroundColor: 'rgba(0,0,0,0.4)', // Gradiente escuro no fundo do texto
  },
  cardTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  cardSubtitle: {
    color: '#eee',
    fontSize: 14,
  },
});