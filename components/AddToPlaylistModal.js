import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ImageBackground,
  Keyboard,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import { useAppContext } from '~/services/AppContext';
import { Storage } from 'expo-storage';
import { Feather } from '@expo/vector-icons';
import { AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';

const AddToPlaylistModal = ({
  isAddToPlaylistVisable,
  setIsAddToPlaylistVisable,
  currentSong,
  playlistNames,
}) => {
  useEffect(() => {
    console.log(currentSong.playListNames);
  }, [currentSong]);

  return (
    <Modal
      style={styles.modal}
      isVisible={isAddToPlaylistVisable}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      coverScreen={true}
      hasBackdrop={true}
      backdropOpacity={1}
      backdropColor="#080808"
      useNativeDriver={true}
      onRequestClose={() => setIsAddToPlaylistVisable(false)}>
      <FlatList
        data={playlistNames}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.itemContainer}>
            <Text style={styles.title}>{item.toUpperCase()}</Text>
          </TouchableOpacity>
        )}
        keyExtractor={(index) => index.toString()}
        contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => setIsAddToPlaylistVisable(false)}>
        <AntDesign name="left" size={20} color="white" />
      </TouchableOpacity>
    </Modal>
  );
};

export default AddToPlaylistModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 0,
    marginHorizontal: 0,
  },
  itemContainer: {
    backgroundColor: 'black',
    width: 350,
    padding: 8,
    margin: 8,
    height: 50,
    // aspectRatio: 1,
    borderRadius: 15,
    borderColor: '#0B0B0B',
    borderWidth: 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
  },
});
