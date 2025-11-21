import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Alert 
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons'; // Ícones para deixar bonito
import AsyncStorage from '@react-native-async-storage/async-storage'; // Para o Logout

export default function SettingsScreen({ navigation }) {

  // Função de Logout
  const handleLogout = async () => {
    Alert.alert(
      "Sair",
      "Tem certeza que deseja sair da sua conta?",
      [
        { text: "Cancelar", style: "cancel" },
        { 
          text: "Sair", 
          style: "destructive",
          onPress: async () => {
            try {
              // 1. Remove o token e ID
              await AsyncStorage.multiRemove(['@linksales_token', '@linksales_user_id']);
              // 2. Reseta a navegação para não deixar voltar
              navigation.reset({
                index: 0,
                routes: [{ name: 'Login' }],
              });
            } catch (_error) {
              Alert.alert("Erro", "Não foi possível sair.");
            }
          }
        }
      ]
    );
  };

  // Componente auxiliar para não repetir código dos botões
  const OptionItem = ({ title, iconName, onPress, isDestructive }) => (
    <TouchableOpacity 
      style={styles.option} 
      onPress={onPress}
    >
      <View style={styles.optionContent}>
        <Ionicons name={iconName} size={22} color={isDestructive ? "red" : "#1B71BD"} style={{ marginRight: 15 }} />
        <Text style={[styles.optionText, isDestructive && { color: 'red', fontWeight: 'bold' }]}>
          {title}
        </Text>
      </View>
      {!isDestructive && <Ionicons name="chevron-forward" size={20} color="#ccc" />}
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.headerTitle}>Configurações</Text>

      <View style={styles.menuWrapper}>
        {/* Opção: Editar Perfil */}
        <OptionItem 
          title="Editar Nome do Perfil" 
          iconName="person-outline"
          onPress={() => navigation.navigate('EditProfileName')} 
        />

        {/* Opção: Arquivados */}
        <OptionItem 
          title="Arquivados" 
          iconName="archive-outline"
          onPress={() => navigation.navigate('Archived')} 
        />

        {/* Opção: Favoritos */}
        <OptionItem 
          title="Favoritos" 
          iconName="heart-outline"
          onPress={() => navigation.navigate('Favorites')} 
        />

        {/* Opção: Central de Conta (Vai para a autenticação antes) */}
        <OptionItem 
          title="Central de Conta" 
          iconName="shield-checkmark-outline"
          onPress={() => navigation.navigate('AccountAuth')} 
        />

        {/* Opção: Sair */}
        <OptionItem 
          title="Sair do App" 
          iconName="log-out-outline"
          onPress={handleLogout}
          isDestructive
        />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1B71BD',
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  menuWrapper: {
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between', // Separa texto da setinha
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#fff',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
});