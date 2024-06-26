import { useState, useEffect, memo } from 'react';
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
import { Feather, AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const EditSongModal = () => {
  const {
    songData,
    setSongData,
    isEditSongModalVisable,
    setIsEditSongModalVisable,
    songToEdit,
    backupColors,
  } = useAppContext();
  const [songTitle, setSongTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [backupColor, setBackupColor] = useState('');

  useEffect(() => {
    setSongTitle(songToEdit?.title);
    setArtistName(songToEdit?.artist);
    setBackupColor(songToEdit?.backupColor);
  }, [songToEdit]);

  const onClose = () => {
    // Keyboard.dismiss();
    setTimeout(() => {}, 5000);
    setIsEditSongModalVisable(false);
    setSongTitle(songToEdit?.title);
    setArtistName(songToEdit?.artist);
  };

  const onChangeSongTitle = (inputText) => {
    setSongTitle(inputText);
  };
  const onChangeArtistName = (inputText) => {
    setArtistName(inputText);
  };

  const formatSting = (str) => {
    const formattedString = str.trim().replace(/\s+/g, ' ').toLowerCase();
    return formattedString.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  };

  const onUpdate = async () => {
    const songs = [...songData];
    const updatedSongData = songs
      .map((song) =>
        song.uri === songToEdit?.uri
          ? {
              ...songToEdit,
              title: formatSting(songTitle),
              artist: artistName ? formatSting(artistName) : 'Unknown Artist',
              // album: albumName ? formatSting(albumName) : 'Unknown Album',
              backupColor: backupColor,
            }
          : song
      )
      .sort((a, b) => a.title.localeCompare(b.title));

    await Storage.setItem({
      key: 'songData',
      value: JSON.stringify(updatedSongData),
    });

    setSongData(updatedSongData);
    Keyboard.dismiss();
    setIsEditSongModalVisable(false);
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.colorItem,
        { backgroundColor: item, borderColor: backupColor === item ? 'white' : 'transparent' },
      ]}
      item={item}
      onPress={() => setBackupColor(item)}
    />
  );

  return (
    <Modal
      style={styles.modal}
      isVisible={isEditSongModalVisable}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={300}
      animationOutTiming={300}
      coverScreen={true}
      hasBackdrop={true}
      backdropOpacity={1}
      backdropColor="#080808"
      useNativeDriver={true}
      onRequestClose={onClose}>
      <LinearGradient colors={['#000000', '#111111', '#000000']} style={styles.gradient}>
        <Text style={[styles.inputHeader]}>SONG TITLE</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeSongTitle}
          value={songTitle}
          caretHidden={false}
          autoCorrect={false}
          scrollEnabled={false}
          numberOfLines={1}
        />
        <Text style={styles.inputHeader}>ARTIST NAME</Text>
        <TextInput
          style={styles.input}
          onChangeText={onChangeArtistName}
          value={artistName}
          caretHidden={false}
          autoCorrect={false}
          numberOfLines={1}
        />
        {/* <Text style={styles.inputHeader}>ALBUM NAME</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeAlbumName}
        value={albumName}
        caretHidden={false}
        autoCorrect={false}
        numberOfLines={1}
      /> */}
        <Text style={styles.inputHeader}>COVER ART</Text>
        <TouchableOpacity style={[styles.cover, { overflow: 'hidden' }]}>
          <ImageBackground
            source={{ uri: songToEdit?.coverArtUri }}
            style={[styles.albumArtContainer, { backgroundColor: 'black' }]}></ImageBackground>
        </TouchableOpacity>
        <Text style={styles.inputHeader}>BACKUP COLOR</Text>
        <FlatList
          data={backupColors}
          renderItem={renderItem}
          keyExtractor={(index) => index.toString()}
          numColumns={8}
          contentContainerStyle={styles.colorList}
        />
        <TouchableOpacity style={styles.backButton} onPress={onClose}>
          <AntDesign name="left" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.saveButton} onPress={onUpdate}>
          <Text>SAVE</Text>
        </TouchableOpacity>
      </LinearGradient>
    </Modal>
  );
};

export default memo(EditSongModal);

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  gradient: {
    paddingTop: 60,
    width: '100%',
    height: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputHeader: {
    marginVertical: 10,
    width: '90%',
    color: '#333333',
  },
  input: {
    width: '90%',
    height: 40,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 2,
    // backgroundColor: 'black',
    // borderRadius: 10,
    textAlign: 'auto',
    fontSize: 15,
    color: '#FFA500',
    paddingHorizontal: 10,
  },
  cover: {
    height: 270,
    aspectRatio: 1,
    borderColor: '#111111',
    borderWidth: 2,
    borderRadius: 20,
  },
  albumArtContainer: {
    height: '100%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
  },
  colorItem: {
    borderRadius: 10,
    borderWidth: 4,
    margin: 4,
    width: 30,
    height: 30,
  },
  saveButton: {
    backgroundColor: '#ffffff',
    borderRadius: 10,
    position: 'absolute',
    bottom: 30,
    padding: 10,
    width: '90%',
    fontWeight: 'bolder',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
