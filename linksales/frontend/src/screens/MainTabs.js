import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

import Home from './home';
import Profile from './profile';
import SettingsScreen from './SettingsScreen';
import AccountAuthScreen from './AccountAuthScreen';
import AccountCenterScreen from './AccountCenterScreen';
import EditProfileName from './EditProfileName';
import Archived from './Archived';
import Favorites from './Favorites';

// Telas de categoria (Roupas, Livrarias, Calcados)
import RoupasScreen from './Roupas';
import LivrariasScreen from './Livrarias';
import CalcadosScreen from './Calcados';

const Tab = createBottomTabNavigator();
const HomeStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="HomeMain" component={Home} />
      <HomeStack.Screen name="Roupas" component={RoupasScreen} />
      <HomeStack.Screen name="Livros" component={LivrariasScreen} />
      <HomeStack.Screen name="Calcados" component={CalcadosScreen} />
    </HomeStack.Navigator>
  );
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator screenOptions={{ headerShown: false }}>
      <ProfileStack.Screen name="ProfileMain" component={Profile} />
      <ProfileStack.Screen name="Settings" component={SettingsScreen} />
      <ProfileStack.Screen name="AccountAuth" component={AccountAuthScreen} />
      <ProfileStack.Screen name="AccountCenter" component={AccountCenterScreen} />
      <ProfileStack.Screen name="EditProfileName" component={EditProfileName} />
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
