import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Alert,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Importa a logo
import Logo from '../assets/LINKSALES.png';

export default function Profile() {
  const navigation = useNavigation();

  // Estado do Usuário (Nome e Foto)
  const [username, setUsername] = useState('Luis Henrique');
  const [profileImage, setProfileImage] = useState(null);

  // Galeria de Imagens (Posts)
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  // Seguidores (Mock)
  const [followers] = useState([
    { id: '1', name: 'Ana' },
    { id: '2', name: 'Bruno' },
    { id: '3', name: 'Carla' },
    { id: '4', name: 'Diego' },
    { id: '5', name: 'Elisa' },
  ]);
  const [following] = useState([
    { id: 'a', name: 'Fernanda' },
    { id: 'b', name: 'Gustavo' },
    { id: 'c', name: 'Helena' },
    { id: 'd', name: 'Igor' },
  ]);

  // Modais
  const [listModalVisible, setListModalVisible] = useState(false);
  const [listModalTitle, setListModalTitle] = useState('');
  const [listModalData, setListModalData] = useState([]);

  const [editModalVisible, setEditModalVisible] = useState(false);
  const [tempName, setTempName] = useState('');

  // --- FUNÇÕES DE IMAGEM ---

  const requestPermission = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Permita acesso à galeria para selecionar imagens.');
      return false;
    }
    return true;
  };

  // Adicionar foto na Galeria (Botão +)
  const addToGallery = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 5], // Aspecto de feed
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      const newImage = { uri: result.assets[0].uri };
      setImages([newImage, ...images]); // Adiciona no topo
    }
  };

  // Alterar Foto de Perfil (Dentro do Editar)
  const changeProfilePicture = async () => {
    const hasPermission = await requestPermission();
    if (!hasPermission) return;

    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1], // Quadrado para perfil
      quality: 1,
    });

    if (!result.canceled && result.assets.length > 0) {
      setProfileImage(result.assets[0].uri);
    }
  };

  const removeGalleryImage = (index) => {
    Alert.alert(
      'Remover post',
      'Deseja apagar esta foto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Apagar',
          style: 'destructive',
          onPress: () => {
            const newImages = [...images];
            newImages.splice(index, 1);
            setImages(newImages);
          },
        },
      ]
    );
  };

  // --- FUNÇÕES DE MODAL ---

  const openListModal = (type) => {
    if (type === 'followers') {
      setListModalTitle('Seguidores');
      setListModalData(followers);
    } else if (type === 'following') {
      setListModalTitle('Seguindo');
      setListModalData(following);
    }
    setListModalVisible(true);
  };

  const openEditModal = () => {
    setTempName(username); // Preenche com o nome atual
    setEditModalVisible(true);
  };

  const saveProfileChanges = () => {
    setUsername(tempName);
    setEditModalVisible(false);
  };

  // --- RENDERIZAÇÃO ---

  const renderListItem = ({ item }) => (
    <View style={styles.listItem}>
      <View style={styles.avatarPlaceholder} />
      <Text style={styles.listItemText}>{item.name}</Text>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      
      {/* Top Bar */}
      <View style={styles.topBar}>
        <Image source={Logo} style={styles.logo} resizeMode="contain" />
        <TouchableOpacity onPress={() => navigation.navigate('Settings')}>
          <Ionicons name="settings-outline" size={26} color="#1B71BD" />
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        
        {/* Foto e Nome */}
        <View style={styles.headerProfile}>
          <TouchableOpacity onPress={openEditModal} activeOpacity={0.9}>
            <Image
              source={profileImage ? { uri: profileImage } : { uri: 'https://via.placeholder.com/150' }}
              style={styles.profileImage}
            />
            <View style={styles.editBadge}>
              <Ionicons name="pencil" size={12} color="#fff" />
            </View>
          </TouchableOpacity>
          
          <Text style={styles.username}>{username}</Text>
          <Text style={styles.userHandle}>@usuario_loja</Text>
        </View>

        {/* Estatísticas */}
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>{images.length}</Text>
            <Text style={styles.statLabel}>Posts</Text>
          </View>
          <TouchableOpacity style={styles.statItem} onPress={() => openListModal('followers')}>
            <Text style={styles.statNumber}>{followers.length}</Text>
            <Text style={styles.statLabel}>Seguidores</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.statItem} onPress={() => openListModal('following')}>
            <Text style={styles.statNumber}>{following.length}</Text>
            <Text style={styles.statLabel}>Seguindo</Text>
          </TouchableOpacity>
        </View>

        {/* Botões de Ação (Novos) */}
        <View style={styles.actionsRow}>
          
          {/* Botão 1: Editar Perfil */}
          <TouchableOpacity style={styles.editProfileBtn} onPress={openEditModal}>
            <Text style={styles.editProfileText}>Editar perfil</Text>
          </TouchableOpacity>

          {/* Botão 2: Adicionar Foto (+) */}
          <TouchableOpacity style={styles.addPhotoBtn} onPress={addToGallery}>
            <Ionicons name="add" size={24} color="#fff" />
          </TouchableOpacity>

        </View>

        {/* Galeria */}
        <View style={styles.galleryContainer}>
          {images.length === 0 ? (
            <Text style={styles.emptyGalleryText}>Nenhuma publicação ainda.</Text>
          ) : (
            images.map((image, index) => (
              <TouchableOpacity
                key={index.toString()}
                onPress={() => setSelectedImage(image.uri)}
                onLongPress={() => removeGalleryImage(index)}
                activeOpacity={0.8}
              >
                <Image source={{ uri: image.uri }} style={styles.galleryImage} />
              </TouchableOpacity>
            ))
          )}
        </View>
      </ScrollView>

      {/* --- MODAL: Editar Perfil --- */}
      <Modal visible={editModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Perfil</Text>

            <TouchableOpacity style={styles.modalAvatarContainer} onPress={changeProfilePicture}>
               <Image
                source={profileImage ? { uri: profileImage } : { uri: 'https://via.placeholder.com/150' }}
                style={styles.modalAvatar}
              />
              <Text style={styles.changePhotoText}>Alterar foto</Text>
            </TouchableOpacity>

            <Text style={styles.inputLabel}>Nome de exibição</Text>
            <TextInput
              style={styles.input}
              value={tempName}
              onChangeText={setTempName}
              placeholder="Seu nome"
            />

            <View style={styles.modalActions}>
              <TouchableOpacity 
                style={[styles.modalBtn, styles.cancelBtn]} 
                onPress={() => setEditModalVisible(false)}
              >
                <Text style={styles.cancelText}>Cancelar</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.modalBtn, styles.saveBtn]} 
                onPress={saveProfileChanges}
              >
                <Text style={styles.saveText}>Salvar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* --- MODAL: Imagem Full Screen --- */}
      <Modal visible={!!selectedImage} transparent={true} animationType="fade">
        <View style={styles.fullImageContainer}>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedImage(null)}>
            <Ionicons name="close" size={30} color="#fff" />
          </TouchableOpacity>
          {selectedImage && (
            <Image source={{ uri: selectedImage }} style={styles.fullImage} resizeMode="contain" />
          )}
        </View>
      </Modal>

      {/* --- MODAL: Seguidores/Seguindo --- */}
      <Modal visible={listModalVisible} transparent={true} animationType="slide">
        <View style={styles.modalOverlay}>
          <View style={styles.modalContentList}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{listModalTitle}</Text>
              <TouchableOpacity onPress={() => setListModalVisible(false)}>
                <Ionicons name="close" size={24} color="#333" />
              </TouchableOpacity>
            </View>
            <FlatList
              data={listModalData}
              keyExtractor={(item) => item.id}
              renderItem={renderListItem}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  logo: { width: 100, height: 30 },
  
  scrollContainer: { alignItems: 'center', paddingBottom: 40 },
  
  headerProfile: { alignItems: 'center', marginTop: 20 },
  profileImage: { width: 100, height: 100, borderRadius: 50 },
  editBadge: {
    position: 'absolute', bottom: 0, right: 0,
    backgroundColor: '#1B71BD', padding: 6, borderRadius: 20,
    borderWidth: 2, borderColor: '#fff'
  },
  username: { fontSize: 20, fontWeight: 'bold', marginTop: 10, color: '#222' },
  userHandle: { fontSize: 14, color: '#666', marginBottom: 20 },

  statsRow: { flexDirection: 'row', justifyContent: 'space-around', width: '100%', marginBottom: 20 },
  statItem: { alignItems: 'center' },
  statNumber: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  statLabel: { fontSize: 14, color: '#666' },

  actionsRow: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  editProfileBtn: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
    marginRight: 10,
  },
  editProfileText: { color: '#222', fontWeight: '600' },
  addPhotoBtn: {
    backgroundColor: '#1B71BD',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },

  galleryContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    paddingHorizontal: 2, // Pequeno ajuste
  },
  galleryImage: {
    width: 120, // Ajuste conforme tamanho da tela ou use porcentagem
    height: 120,
    margin: 1,
    backgroundColor: '#eee',
  },
  emptyGalleryText: { color: '#999', marginTop: 20 },

  // Modais
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { width: '85%', backgroundColor: '#fff', borderRadius: 15, padding: 20 },
  modalContentList: { width: '90%', height: '60%', backgroundColor: '#fff', borderRadius: 15, padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 },
  modalTitle: { fontSize: 18, fontWeight: 'bold', color: '#222' },
  
  modalAvatarContainer: { alignSelf: 'center', marginBottom: 20, alignItems: 'center' },
  modalAvatar: { width: 80, height: 80, borderRadius: 40, marginBottom: 8 },
  changePhotoText: { color: '#1B71BD', fontWeight: '600', fontSize: 14 },

  inputLabel: { fontSize: 14, color: '#666', marginBottom: 5 },
  input: {
    borderWidth: 1, borderColor: '#ddd', borderRadius: 8,
    paddingHorizontal: 10, paddingVertical: 8, fontSize: 16, marginBottom: 20
  },

  modalActions: { flexDirection: 'row', justifyContent: 'flex-end', gap: 15 },
  modalBtn: { paddingVertical: 8, paddingHorizontal: 15, borderRadius: 6 },
  cancelBtn: { backgroundColor: '#f5f5f5' },
  saveBtn: { backgroundColor: '#1B71BD' },
  cancelText: { color: '#666', fontWeight: '600' },
  saveText: { color: '#fff', fontWeight: '600' },

  listItem: { flexDirection: 'row', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#eee' },
  avatarPlaceholder: { width: 35, height: 35, borderRadius: 17.5, backgroundColor: '#ddd', marginRight: 10 },
  listItemText: { fontSize: 16, color: '#333' },

  fullImageContainer: { flex: 1, backgroundColor: '#000', justifyContent: 'center', alignItems: 'center' },
  fullImage: { width: '100%', height: '80%' },
  closeButton: { position: 'absolute', top: 50, right: 20, padding: 10 },
});