import React from 'react';
import { View, Text, FlatList, Image, StyleSheet } from 'react-native';

export default function Archived() {
  const archivedImages = []; // Preencher com dados do BD

  return (
    <View style={styles.container}>
      {archivedImages.length === 0 ? (
        <Text style={styles.empty}>Nenhuma imagem arquivada.</Text>
      ) : (
        <FlatList
          data={archivedImages}
          keyExtractor={(__item, index) => index.toString()}
          numColumns={3}
          renderItem={({ item }) => (
            <Image source={{ uri: item.uri }} style={styles.image} />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  empty: {
    textAlign: 'center',
    color: '#777',
    marginTop: 20,
  },
  image: {
    width: 100,
    height: 100,
    margin: 5,
    borderRadius: 8,
  },
});
