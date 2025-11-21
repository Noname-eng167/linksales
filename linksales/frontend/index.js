import { registerRootComponent } from 'expo';
import React from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import App from './App';

// Envolve o App com GestureHandlerRootView aqui também
function Main() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <App />
    </GestureHandlerRootView>
  );
}

// Expo precisa disso para registrar o componente raiz
registerRootComponent(Main);
