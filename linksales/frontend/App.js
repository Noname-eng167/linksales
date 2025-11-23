import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1. Importando as telas 
// (Ajustei para Maiúscula para evitar erros no Windows/Android)
import Login from './src/screens/login'; 
import Register from './src/screens/register'; 
import ForgotPassword from './src/screens/ForgotPassword';
import MainTabs from './src/screens/MainTabs'; 
import StoreProfileScreen from './src/screens/StoreProfileScreen';
import UserTypeScreen from './src/screens/UserTypeScreen'; // 🟢 ADICIONADO

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          
          {/* Fluxo de Autenticação */}
          <RootStack.Screen name="Login" component={Login} />
          
          {/* TELA DE SELEÇÃO  */}
          <RootStack.Screen name="UserTypeScreen" component={UserTypeScreen} />
          
          <RootStack.Screen name="Register" component={Register} />
          <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />

          {/* Fluxo Principal (Abas) */}
          <RootStack.Screen name="MainTabs" component={MainTabs} />

          {/* Telas de Detalhes */}
          <RootStack.Screen name="StoreProfile" component={StoreProfileScreen} />

        </RootStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}