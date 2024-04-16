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
import { Feather } from '@expo/vector-icons';
import ColorSellectModal from '~/components/ColorSellectModal';

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
  const [albumName, setAlbumName] = useState('');
  const [backupColor, setBackupColor] = useState('');
  const [isColorModalVisable, setIsColorModalVisable] = useState(false);

  useEffect(() => {
    setSongTitle(songToEdit?.title);
    setArtistName(songToEdit?.artist);
    setAlbumName(songToEdit?.album);
    setBackupColor(songToEdit?.backupColor);
  }, [songToEdit]);

  const onClose = () => {
    // Keyboard.dismiss();
    setTimeout(() => {}, 5000);
    setIsEditSongModalVisable(false);
    setSongTitle(songToEdit?.title);
    setArtistName(songToEdit?.artist);
    setAlbumName(songToEdit?.album);
  };

  const onChangeSongTitle = (inputText) => {
    setSongTitle(inputText);
  };
  const onChangeArtistName = (inputText) => {
    setArtistName(inputText);
  };
  const onChangeAlbumName = (inputText) => {
    setAlbumName(inputText);
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
              album: albumName ? formatSting(albumName) : 'Unknown Album',
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

      <Text style={styles.inputHeader}>ALBUM NAME</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeAlbumName}
        value={albumName}
        caretHidden={false}
        autoCorrect={false}
        numberOfLines={1}
      />

      <View style={{ justifyContent: 'flex-start', width: '100%' }}>
        <Text style={styles.inputHeader}>COVER ART</Text>
        <TouchableOpacity style={[styles.cover, { overflow: 'hidden' }]}>
          <ImageBackground
            source={{ uri: songToEdit?.coverArtUri }}
            style={[styles.albumArtContainer, { backgroundColor: 'black' }]}></ImageBackground>
        </TouchableOpacity>
      </View>
      <View style={{ justifyContent: 'flex-start', width: '100%' }}>
        <Text style={styles.inputHeader}>BACKUP COLOR</Text>
        <FlatList
          data={backupColors}
          renderItem={renderItem}
          keyExtractor={(index) => index.toString()}
          numColumns={8}
          contentContainerStyle={styles.colorList}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.createButton} onPress={onUpdate}>
          <Text style={{ color: 'white', margin: 5 }}>UPDATE</Text>
          <Feather name="check" size={25} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
          <Text style={{ color: 'white', margin: 5 }}>CANCEL</Text>
          <Feather name="x" size={25} color="white" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default memo(EditSongModal);

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  inputHeader: {
    marginVertical: 10,
    width: '100%',
    color: '#333333',
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 2,
    backgroundColor: 'black',
    // alignSelf: "center",
    borderRadius: 10,
    textAlign: 'auto',
    fontSize: 15,
    color: 'white',
    paddingHorizontal: 10,
  },
  coverContainer: {
    // flexDirection: 'row',
    width: '100%',
    // justifyContent: 'space-evenly',
    marginTop: 10,
  },
  cover: {
    // marginTop: 10,
    height: 150,
    aspectRatio: 1,
    borderColor: '#111111',
    borderWidth: 2,
    borderRadius: 20,
  },
  albumArtContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
  },
  // backButton: {
  //   position: 'absolute',
  //   top: 25,
  //   left: 0,
  //   padding: 20,
  // },
  cancelButton: {
    borderColor: '#111111',
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    padding: 5,
    flexDirection: 'row',
    marginLeft: 10,
  },
  createButton: {
    borderColor: '#111111',
    borderWidth: 2,
    borderRadius: 10,
    width: 100,
    padding: 5,
    flexDirection: 'row',
  },
  deleteButton: {
    padding: 10,
    left: 160,
    justifyContent: 'space-between',
  },
  buttonContainer: {
    // position: "absolute",
    marginTop: 5,
    // justifyContent: 'space-between',
    padding: 15,
    width: '100%',
    flexDirection: 'row',
  },
  colorItem: {
    borderRadius: 10,
    borderWidth: 4,
    margin: 4,
    width: 30,
    height: 30,
  },
});
