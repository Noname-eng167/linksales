import React from 'react';
import { View, StyleSheet, ScrollView, TextInput, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'; 

const dados = [
  {
    id: '1',
    titulo: 'Roupas',
    imagem: 'https://img.freepik.com/fotos-gratis/loja-de-roupas-loja-de-roupas-em-cabide-na-boutique-loja-moderna_1150-8886.jpg?semt=ais_hybrid&w=740',
    rota: 'Roupas'
  },
  {
    id: '2',
    titulo: 'Livros',
    imagem: 'https://img.freepik.com/fotos-gratis/disposicao-de-livros-de-vista-superior_23-2148882754.jpg?semt=ais_hybrid&w=740',
    rota: 'Livros' 
  },
  {
    id: '3',
    titulo: 'Calçados',
    imagem: 'https://img.freepik.com/vetores-gratis/sapatos-masculinos-femininos-classicos-com-fundo-realista-de-piso-de-madeira-clara-com-ilustracao-de-bombas-vermelhas-de-salto-alto-rosa_1284-65187.jpg?semt=ais_hybrid&w=740',
    rota: 'Calcados'
  }
];

const Home = () => {
  const navigation = useNavigation(); 

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color="#999" style={styles.searchIcon} />
        <TextInput placeholder="Pesquisar" style={styles.searchInput} />
      </View>

      <FlatList
        data={dados}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.content}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => {
              if (item.rota) {
                navigation.navigate(item.rota);
              }
            }}
          >
            <Image source={{ uri: item.imagem }} style={styles.image} />
            <Text style={styles.text}>{item.titulo}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FC',
    paddingTop: 60,
  },
  searchContainer: {
    backgroundColor: '#d3d3d3',
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 20,
    paddingHorizontal: 16,
    marginHorizontal: 20,
    marginBottom: 20,
    height: 40,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    color: '#333',
  },
  content: {
    paddingHorizontal: 20,
    paddingBottom: 100,
  },
  card: {
    flex: 1,
    backgroundColor: '#d3d3d3',
    margin: 8,
    borderRadius: 8,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 100,
  },
  text: {
    padding: 10,
    fontSize: 16,
    fontWeight: '500',
  },
});