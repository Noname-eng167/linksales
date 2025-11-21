import React, { useEffect, useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ActivityIndicator,
} from 'react-native';
import * as LocalAuthentication from 'expo-local-authentication';
import { Ionicons } from '@expo/vector-icons'; // Se quiser usar o ícone de olho

// Em produção, busque isso do SecureStore
const STORED_PASSWORD_MOCK = 'minhasenha123'; 

export default function AccountAuthScreen({ navigation }) {
  const [biometrySupported, setBiometrySupported] = useState(false);
  const [biometryEnrolled, setBiometryEnrolled] = useState(false);
  
  const [passwordInput, setPasswordInput] = useState('');
  
  // Estado 1: Controla se o INPUT DE SENHA aparece na tela
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  
  // Estado 2: Controla se o TEXTO da senha está visível (olho)
  const [isTextVisible, setIsTextVisible] = useState(false);
  
  const [loading, setLoading] = useState(true);

  // Memoizando a função para usar no useEffect sem warning
  const authenticateWithBiometrics = useCallback(async () => {
    try {
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Autentique-se para acessar',
        fallbackLabel: 'Usar senha',
        cancelLabel: 'Cancelar'
      });

      if (result.success) {
        navigation.replace('AccountCenter');
      } else {
        // Se falhar, mostra o input
        setShowPasswordInput(true);
      }
    } catch (error) {
       console.error("Erro bio:", error);
       setShowPasswordInput(true);
    }
  }, [navigation]);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      try {
        const hardware = await LocalAuthentication.hasHardwareAsync();
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        
        if (isMounted) {
          setBiometrySupported(hardware);
          setBiometryEnrolled(enrolled);
          setLoading(false);

          if (hardware && enrolled) {
            // Tenta autenticar
            setTimeout(() => authenticateWithBiometrics(), 100);
          } else {
            setShowPasswordInput(true);
          }
        }
      } catch (_err) {
        if (isMounted) {
          setLoading(false);
          setShowPasswordInput(true);
        }
      }
    })();

    return () => { isMounted = false; };
  }, [authenticateWithBiometrics]);

  const handlePasswordSubmit = () => {
    if (passwordInput === STORED_PASSWORD_MOCK) {
      navigation.replace('AccountCenter');
    } else {
      Alert.alert('Acesso Negado', 'Senha incorreta.');
      setPasswordInput('');
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#1B71BD" />
        <Text style={{marginTop: 10, color: '#666'}}>Verificando segurança...</Text>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Autenticação</Text>

      {(!biometrySupported || !biometryEnrolled) && (
        <Text style={styles.infoText}>
          Biometria indisponível. Use sua senha.
        </Text>
      )}

      {/* Renderiza o Input apenas se necessário */}
      {showPasswordInput && (
        <>
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.input}
              placeholder="Senha do app"
              secureTextEntry={!isTextVisible} // Controlado pelo novo estado
              value={passwordInput}
              onChangeText={setPasswordInput}
            />
            <TouchableOpacity 
              onPress={() => setIsTextVisible(!isTextVisible)}
              style={styles.eyeButton}
            >
              <Ionicons 
                name={isTextVisible ? 'eye-off' : 'eye'} 
                size={24} 
                color="#1B71BD" 
              />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.submitButton, !passwordInput && styles.submitButtonDisabled]}
            onPress={handlePasswordSubmit}
            disabled={!passwordInput}
          >
            <Text style={styles.submitButtonText}>Entrar</Text>
          </TouchableOpacity>
        </>
      )}

      {/* Botão para tentar biometria novamente */}
      {biometrySupported && biometryEnrolled && (
         <TouchableOpacity
             style={[styles.submitButton, styles.outlineButton]}
             onPress={authenticateWithBiometrics}
         >
           <Text style={[styles.submitButtonText, { color: '#1B71BD' }]}>Usar Biometria</Text>
         </TouchableOpacity>
      )}

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 28,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 26,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
    color: '#1B71BD',
  },
  infoText: {
    fontSize: 15,
    color: '#666',
    marginBottom: 28,
    textAlign: 'center',
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 10,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 28,
    backgroundColor: '#fafafa',
  },
  input: {
    flex: 1,
    fontSize: 17,
    color: '#222',
    height: 48,
  },
  eyeButton: {
    padding: 5,
  },
  submitButton: {
    backgroundColor: '#1B71BD',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    shadowColor: '#1B71BD',
    shadowOpacity: 0.3,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
  },
  outlineButton: {
    marginTop: 15,
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#1B71BD',
    shadowOpacity: 0, 
  },
  submitButtonDisabled: {
    backgroundColor: '#a3c0e9',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});