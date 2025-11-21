import React from 'react';
import { View, Text, FlatList, StyleSheet, Image } from 'react-native';

export default function Favorites() {
  const favoriteProfiles = []; // Preencher com dados do BD

  return (
    <View style={styles.container}>
      {favoriteProfiles.length === 0 ? (
        <Text style={styles.empty}>Nenhum perfil favoritado.</Text>
      ) : (
        <FlatList
          data={favoriteProfiles}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.profileCard}>
              <Image source={{ uri: item.avatar }} style={styles.avatar} />
              <Text style={styles.name}>{item.name}</Text>
            </View>
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
  profileCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ccc',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  name: {
    fontSize: 16,
    color: '#111',
  },
});
