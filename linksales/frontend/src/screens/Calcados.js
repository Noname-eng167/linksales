import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';

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

export default function CalcadosScreen() {
  const irParaPerfilLoja = (loja) => {
    alert(`Abrir perfil da loja: ${loja.nome}`);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Lojas de Calçados</Text>
      <FlatList
        data={lojas}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.loja}
            onPress={() => irParaPerfilLoja(item)}
          >
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
