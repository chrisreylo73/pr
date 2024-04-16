import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
  PanResponder,
  Animated,
  ImageBackground,
  Keyboard,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import ytdl from 'react-native-ytdl';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import { Feather } from '@expo/vector-icons';
import { Audio } from 'expo-av';

const Add = () => {
  const [url, setUrl] = useState(
    'https://www.youtube.com/watch?v=HlTJ9ty3-7k&list=PL39VDaR03WJnGM0oQul7UlUMlGDeRErwJ&index=52'
  );
  const [songTitle, setSongTitle] = useState('');
  const [artistName, setArtistName] = useState('');
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

  const onPress = async () => {
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

  // async function downloadAudio() {
  //   const audioUrl = await fetchAudioUrl();
  //   const destinationPath = `${RNFS.DocumentDirectoryPath}/audio.mp3`;

  //   const downloadResult = await RNFS.downloadFile({
  //     fromUrl: audioUrl,
  //     toFile: destinationPath,
  //   });

  //   if (downloadResult.statusCode === 200) {
  //     console.log('Audio downloaded successfully');
  //   } else {
  //     console.error('Failed to download audio');
  //   }
  // }

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000000', '#111111', '#000000']} style={styles.gradient}>
        <View style={styles.inputContainer}>
          <Text style={[styles.inputHeader, { paddingTop: 10 }]}>URL</Text>
          <TextInput
            style={styles.input}
            onChangeText={urlChange}
            value={url}
            caretHidden={false}
            autoCorrect={false}
            autoCapitalize="characters"></TextInput>
          <Text style={[styles.inputHeader, { paddingTop: 10 }]}>SONG TITLE</Text>
          <TextInput
            style={styles.input}
            onChangeText={songTitleChange}
            value={songTitle}
            caretHidden={false}
            autoCorrect={false}
            autoCapitalize="characters"></TextInput>
          <Text style={[styles.inputHeader, { paddingTop: 10 }]}>SONG ARTIST</Text>
          <TextInput
            style={styles.input}
            onChangeText={artistNameChange}
            value={artistName}
            caretHidden={false}
            autoCorrect={false}
            autoCapitalize="characters"></TextInput>
          <Text style={[styles.inputHeader, { paddingTop: 10 }]}>COVER ART</Text>
          <TouchableOpacity style={styles.coverArtContainer}></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.downloadButton} onPress={onPress}>
          <Feather name="download" size={24} color="black" />
        </TouchableOpacity>
      </LinearGradient>
    </View>
  );
};

export default Add;

const styles = StyleSheet.create({
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#080808',
  },
  inputContainer: {
    width: '90%',
    alignSelf: 'center',
    position: 'absolute',
    top: 0,
  },
  inputHeader: {
    marginTop: 15,
    width: '100%',
    color: '#333333',
    marginBottom: 5,
  },
  input: {
    width: '100%',
    height: 40,
    borderBottomColor: '#FFFFFF',
    borderBottomWidth: 1,
    backgroundColor: 'black',
    textAlign: 'auto',
    fontSize: 15,
    color: '#FFA500',
    paddingHorizontal: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    elevation: 5,
  },
  downloadButton: {
    alignSelf: 'center',
    position: 'absolute',
    width: '90%',
    height: 40,
    borderRadius: 10,
    backgroundColor: 'white',
    bottom: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },
  coverArtContainer: {
    width: 250,
    aspectRatio: 1,
    elevation: 10,
    borderRadius: 20,
    borderColor: '#111111',
    borderWidth: 1,
    backgroundColor: 'black',
    // alignSelf: 'center',
  },
});
