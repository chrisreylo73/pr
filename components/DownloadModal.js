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
  KeyboardAvoidingView,
} from 'react-native';
import Modal from 'react-native-modal';
import { useAppContext } from '~/services/AppContext';
import { Storage } from 'expo-storage';
import { Feather, AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const DownloadModal = () => {
  const {
    songData,
    setSongData,
    isEditSongModalVisable,
    setIsEditSongModalVisable,
    isDownloadModalVisable,
    setIsDownloadModalVisable,
    backupColors,
  } = useAppContext();
  const [url, setUrl] = useState(
    'https://www.youtube.com/watch?v=HlTJ9ty3-7k&list=PL39VDaR03WJnGM0oQul7UlUMlGDeRErwJ&index=52'
  );
  const [songTitle, setSongTitle] = useState('');
  const [artistName, setArtistName] = useState('');
  const [backupColor, setBackupColor] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [gotError, setGotError] = useState(false);

  const urlChange = (inputText) => {
    setUrl(inputText);
  };

  const songTitleChange = (inputText) => {
    setSongTitle(inputText);
  };

  const artistNameChange = (inputText) => {
    setArtistName(inputText);
  };
  const onClose = () => {
    Keyboard.dismiss();
    setTimeout(() => {}, 5000);
    setIsDownloadModalVisable(false);
    setSongTitle('');
    setArtistName('');
    setBackupColor('');
  };
  const isValidUrl = () => {
    const youtubePattern =
      /^(http(s)?:\/\/)?(www\.)?(youtube\.com\/watch\?v=|youtu\.be\/)([\w\-]+)(\?\S*)?$/;
    return youtubePattern.test(url);
  };

  const resetError = () => {
    setTimeout(() => {
      setGotError(false);
    }, 5000);
  };

  const onDownload = async () => {
    if (!url) {
      setGotError(true);
      setErrorMessage('Please fill out URL');
      console.log('!url');
      resetError();
      return;
    } else if (!songTitle) {
      setGotError(true);
      setErrorMessage('Please fill out song title');
      console.log('!songTitle');
      resetError();
      return;
    } else if (!artistName) {
      setGotError(true);
      setErrorMessage('Please fill out artist name');
      console.log('!artistName');
      resetError();
      return;
    }
    // else if (!isValidUrl()) {
    //   setGotError(true);
    //   setErrorMessage('Invalid URL');
    //   console.log('!isValidUrl');
    //   resetError();
    //   return;
    // }
    setErrorMessage('');

    try {
      const audioUrl = await fetchAudioUrl();
      const downloadObject = FileSystem.createDownloadResumable(
        audioUrl,
        FileSystem.documentDirectory + songTitle + '.mp3'
      );
      const { uri } = await downloadObject.downloadAsync();
      console.log('Audio downloaded to:', uri);
      // const { sound } = await Audio.Sound.createAsync({ uri });
      // setSound(sound);
      // await sound.playAsync();
    } catch (error) {
      console.error('Failed to download audio:', error);
    }
    checkIfFileExists();
    // await sound.playAsync();
  };

  const checkIfFileExists = async () => {
    try {
      const fileUri = FileSystem.documentDirectory + songTitle + '.mp3';
      const fileInfo = await FileSystem.getInfoAsync(fileUri);
      console.log(fileInfo.exists);
      // return fileInfo.exists;
    } catch (error) {
      console.error('Error checking file existence:', error);
      return false;
    }
  };

  const fetchAudioUrl = async () => {
    const youtubeURL =
      'https://www.youtube.com/watch?v=HlTJ9ty3-7k&list=PL39VDaR03WJnGM0oQul7UlUMlGDeRErwJ&index=52';

    const info = await ytdl.getInfo(url);
    const audioFormat = ytdl.chooseFormat(info.formats, { filter: 'audioonly' });
    console.log(audioFormat.url);
    return audioFormat.url;
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
      isVisible={isDownloadModalVisable}
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
        <Text style={styles.inputHeader}>URL</Text>
        {/* <KeyboardAvoidingView> */}
        <TextInput
          style={styles.input}
          onChangeText={urlChange}
          value={url}
          caretHidden={false}
          autoCorrect={false}
          numberOfLines={1}
        />

        <Text style={[styles.inputHeader]}>SONG TITLE</Text>
        <TextInput
          style={styles.input}
          onChangeText={songTitleChange}
          value={songTitle}
          caretHidden={false}
          autoCorrect={false}
          scrollEnabled={false}
          numberOfLines={1}
        />
        <Text style={styles.inputHeader}>ARTIST NAME</Text>
        <TextInput
          style={styles.input}
          onChangeText={artistNameChange}
          value={artistName}
          caretHidden={false}
          autoCorrect={false}
          numberOfLines={1}
        />

        <Text style={styles.inputHeader}>COVER ART</Text>
        <TouchableOpacity style={[styles.cover, { overflow: 'hidden' }]}>
          <ImageBackground
            source={{ uri: null }}
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
        <TouchableOpacity style={styles.saveButton} onPress={onDownload}>
          <Feather name="download" size={24} color="black" />
        </TouchableOpacity>
        {/* </KeyboardAvoidingView> */}
      </LinearGradient>
    </Modal>
  );
};

export default memo(DownloadModal);

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
    textAlign: 'auto',
    fontSize: 15,
    color: '#FFA500',
    paddingHorizontal: 10,
  },
  cover: {
    height: 190,
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
