import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

// Importação das telas
import Home from './home'; // Ajuste se for minúsculo (home)
import Profile from './profile'; // Ajuste se for minúsculo (profile)
import SettingsScreen from './SettingsScreen';
import AccountAuthScreen from './AccountAuthScreen';
import AccountCenterScreen from './AccountCenterScreen';
import Archived from './Archived';
import Favorites from './Favorites';

// Telas de categoria e detalhes
import RoupasScreen from './Roupas';
import LivrariasScreen from './Livrarias';
import CalcadosScreen from './Calcados';
import EletronicosScreen from './eletronicos';
import StoreProfileScreen from './StoreProfileScreen'; // Adicionado para funcionar a navegação interna

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={Home} />
      
      {/* Categorias */}
      <HomeStack.Screen name="Roupas" component={RoupasScreen} />
      <HomeStack.Screen name="Livros" component={LivrariasScreen} />
      <HomeStack.Screen name="Calcados" component={CalcadosScreen} />
      <HomeStack.Screen name="Eletronicos" component={EletronicosScreen} />
      
      {/* Tela de Detalhes da Loja (Acessível pela Home) */}
      <HomeStack.Screen name="StoreProfile" component={StoreProfileScreen} />
    </HomeStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    // 🟢 AQUI ESTAVA O PROBLEMA: Garanta que initialRouteName seja 'ProfileMain'
    <ProfileStack.Navigator screenOptions={{ headerShown: false }} initialRouteName="ProfileMain">
      
      {/* Esta deve ser a tela principal da pilha */}
      <ProfileStack.Screen name="ProfileMain" component={Profile} />
      
      {/* Outras telas acessíveis pelo Profile */}
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="AccountAuth" component={AccountAuthScreen} />
      <ProfileStack.Screen name="AccountCenter" component={AccountCenterScreen} />
      
      <ProfileStack.Screen name="Archived" component={Archived} />
      <ProfileStack.Screen name="Favorites" component={Favorites} />
    </ProfileStack.Navigator>
  );
}

export default function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: '#1B71BD',
        tabBarInactiveTintColor: 'gray',
        // Ícones da barra inferior
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <Ionicons name="home" size={size} color={color} />;
          } else if (route.name === 'Profile') {
            return <FontAwesome5 name="user-alt" size={size} color={color} />;
          }
          return null;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackScreen} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} />
    </Tab.Navigator>
  );
}