import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// 1. Importando as telas 
import Login from './src/screens/login.js';
import Register from './src/screens/register'; 
import ForgotPassword from './src/screens/ForgotPassword';
import MainTabs from './src/screens/MainTabs'; 
import StoreProfileScreen from './src/screens/StoreProfileScreen';

const RootStack = createNativeStackNavigator();

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <NavigationContainer>
        <RootStack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          
          {/* Fluxo de Autenticação */}
          <RootStack.Screen name="Login" component={Login} />
          <RootStack.Screen name="Register" component={Register} />
          <RootStack.Screen name="ForgotPassword" component={ForgotPassword} />

          {/* Fluxo Principal (Abas) */}
          <RootStack.Screen name="MainTabs" component={MainTabs} />

          {/* Telas de Detalhes (que abrem por cima das abas) */}
          <RootStack.Screen name="StoreProfile" component={StoreProfileScreen} />

          {/* Nota: A tela 'Roupas' geralmente fica DENTRO de MainTabs.js.
             Só mantenha aqui se você quiser abrir ela fora do menu inferior.
             <RootStack.Screen name="Roupas" component={Roupas} /> 
          */}

        </RootStack.Navigator>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
}