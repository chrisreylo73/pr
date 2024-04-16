import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ViewToken,
  Keyboard,
} from 'react-native';
import Modal from 'react-native-modal';
import Song from '~/components/Song';
import { useAppContext } from '~/services/AppContext';
import Footer from '~/components/Footer';
import { AntDesign } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const ArtistPlaylistModal = ({ isModalVisable, setIsModalVisable, playlistName }) => {
  const {
    currentSong,
    setCurrentSong,
    songData,
    artistNames,
    setArtistNames,
    isPlayerVisible,
    setIsPlayerVisible,
  } = useAppContext();

  const onClose = () => {
    Keyboard.dismiss();
    setTimeout(() => {}, 5000);
    setIsModalVisable(false);
  };
  const renderItem = ({ item }) => <Song item={item} />;

  return (
    <Modal
      style={styles.modal}
      isVisible={isModalVisable}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationInTiming={400}
      animationOutTiming={300}
      coverScreen={true}
      hasBackdrop={true}
      backdropOpacity={1}
      backdropColor="#090909"
      useNativeDriver={true}
      onRequestClose={onClose}>
      <LinearGradient colors={['#000000', '#111111', '#000000']} style={styles.gradient}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backButton} onPress={() => setIsModalVisable(false)}>
            <AntDesign name="left" size={20} color="white" />
          </TouchableOpacity>
          <Text style={styles.title}>{playlistName.toUpperCase()}</Text>
        </View>
        <FlatList
          contentContainerStyle={{ paddingBottom: 340, paddingTop: 30 }}
          data={songData.filter((song) => song.artist === playlistName)}
          renderItem={renderItem}
          keyExtractor={(item) => item.uri}
        />
        <Footer />
      </LinearGradient>
    </Modal>
  );
};

export default ArtistPlaylistModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  header: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 70,
    backgroundColor: 'black',
    elevation: 10,
    borderBottomWidth: 1,
    borderColor: '#111111',
  },
  title: {
    fontSize: 15,
    fontWeight: 'bold',
    marginBottom: 5,
    alignSelf: 'center',
    letterSpacing: 2,
    color: 'white',
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
  },
});
