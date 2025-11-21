import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

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

export default function LivrariasScreen() {
  const irParaPerfilLoja = (loja) => {
    alert(`Abrir perfil da loja: ${loja.nome}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Livrarias</Text>
      <FlatList
        data={lojas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.loja} onPress={() => irParaPerfilLoja(item)}>
            <Image source={{ uri: item.foto }} style={styles.foto} />
            <View style={styles.info}>
              <Text style={styles.nome}>{item.nome}</Text>
              <Text style={styles.endereco}>{item.endereco}</Text>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.lista}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 40,
    paddingBottom: 20,
  },
  titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginBottom: 20,
  },
  lista: {
    paddingHorizontal: 16,
  },
  loja: {
    flexDirection: 'row',
    backgroundColor: '#f7f7f7',
    borderRadius: 10,
    marginBottom: 16,
    padding: 12,
    elevation: 2,
    alignItems: 'center',
  },
  foto: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
    backgroundColor: '#ddd',
  },
  info: {
    flex: 1,
  },
  nome: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  endereco: {
    fontSize: 14,
    color: '#555',
    marginTop: 4,
  },
});
