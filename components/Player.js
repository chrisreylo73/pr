import React, { memo, useState, useEffect, useCallback, useRef } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Dimensions,
  ImageBackground,
  Settings,
} from 'react-native';
import Modal from 'react-native-modal';
import { useAppContext } from '~/services/AppContext';
import { AntDesign, MaterialCommunityIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import AddToPlaylistModal from '~/components/AddToPlaylistModal';
import SpinningRecord from '~/components/SpinningRecord';
import { Audio } from 'expo-av';
import { debounce } from 'lodash';
// import { Gesture, GestureDetector, GestureHandlerRootView } from 'react-native-gesture-handler';
// import Animated, {
//   useAnimatedStyle,
//   useSharedValue,
//   withTiming,
//   Easing,
//   runOnJS,
// } from 'react-native-reanimated';
import CircularProgress from 'react-native-circular-progress-indicator';

const Player = () => {
  const {
    currentSong,
    playState,
    isPlayerVisible,
    setIsPlayerVisible,
    setPlayState,
    isShuffleOn,
    setIsShuffleOn,
    playlistNames,
    audio,
    setAudio,
    currentSongIndex,
    setCurrentSongIndex,
    currentPlaylist,
    setCurrentPlaylist,
    setCurrentSong,
    songData,
    setSongData,
  } = useAppContext();

  const [isAddToPlaylistVisable, setIsAddToPlaylistVisable] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);

  useEffect(() => {
    if (audio) {
      audio.setOnPlaybackStatusUpdate(onPlaybackStatusUpdate);
    }

    // console.log(currentSong.duration);
  }, [audio]);

  const onPlaybackStatusUpdate = (status) => {
    if (status.isLoaded) {
      setPosition(Number((status.positionMillis / 60000).toFixed(2)));

      // console.log((status.positionMillis / 60000).toFixed(2));
    }
  };

  const debouncedHandleSongChange = useCallback(debounce(handleSongChange, 1000), []);

  useEffect(() => {
    if (!currentSong) return;
    if (audio) {
      audio.unloadAsync();
    }
    setPlayState(true);
    debouncedHandleSongChange(currentSong);
    return () => {
      if (audio) {
        audio.unloadAsync();
      }
    };
  }, [currentSong?.uri]);

  async function handleSongChange(currentSong) {
    try {
      if (audio) {
        await audio.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync({ uri: currentSong.uri });
      setAudio(sound);
      sound.playAsync();
    } catch (error) {
      console.log('@ handleSongChange: ', error);
    }
  }

  const handleClose = useCallback(() => {
    setIsPlayerVisible(false);
  }, []);

  const playPauseButtonPressed = async () => {
    try {
      if (audio) {
        await audio.setPositionAsync(position * 60000);
        if (playState) {
          await audio.pauseAsync();

          setPlayState(false);
        } else {
          await audio.playAsync();

          setPlayState(true);
        }
      } else {
        console.log('audio === null');
      }
    } catch (error) {
      console.log('@ playPauseButtonPressed:  ', error);
    }
  };

  const prevButtonPressed = async () => {
    try {
      if (currentSongIndex !== 0) {
        // if (audio) {
        //   await audio.stopAsync();
        //   await audio.unloadAsync();
        // }
        const prevSongIndex = currentSongIndex - 1;
        setCurrentSongIndex(prevSongIndex);
        setCurrentSong(currentPlaylist.data[prevSongIndex]);
      }
    } catch (error) {
      console.log('@ prevButtonPressed:  ', error);
    }
  };

  const nextButtonPressed = async () => {
    try {
      if (currentSongIndex !== currentPlaylist.data.length - 1) {
        // if (audio) {
        //   await audio.stopAsync();
        //   await audio.unloadAsync();
        // }
        const nextSongIndex = currentSongIndex + 1;
        setCurrentSongIndex(nextSongIndex);
        setCurrentSong(currentPlaylist.data[nextSongIndex]);
      }
    } catch (error) {
      console.log('@ nextButtonPressed:  ', error);
    }
  };

  const shuffleButtonPressed = async () => {
    try {
      let updatedPlaylistData = [];
      if (isShuffleOn === false) {
        updatedPlaylistData = shuffleArray(currentPlaylist.data);
      } else if (isShuffleOn === true) {
        const songDataCopy = [...songData];
        if (currentPlaylist.type === 'allSongs') {
          updatedPlaylistData = songDataCopy;
          setCurrentSongIndex(updatedPlaylistData.findIndex((song) => song === currentSong));
        } else if (currentPlaylist.type === 'artist') {
          updatedPlaylistData = songDataCopy.filter((song) => song.artist === currentPlaylist.name);
          setCurrentSongIndex(updatedPlaylistData.findIndex((song) => song === currentSong));
        } else if (currentPlaylist.type === 'playlist') {
          updatedPlaylistData = songDataCopy.filter((song) =>
            song.playListNames.includes(currentPlaylist.name)
          );
          setCurrentSongIndex(updatedPlaylistData.findIndex((song) => song === currentSong));
        }
      }
      setCurrentPlaylist({
        ...currentPlaylist,
        data: updatedPlaylistData,
      });
      setIsShuffleOn((prevState) => !prevState);
    } catch (error) {
      console.log('@ shuffleButtonPressed:  ', error);
    }
  };

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements at indices i and j
    }
    return array;
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={isPlayerVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      coverScreen={true}
      hasBackdrop={true}
      backdropOpacity={1}
      backdropColor="#090909"
      useNativeDriver={true}
      onRequestClose={handleClose}>
      <View style={styles.infoContainer}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {currentSong?.title}
        </Text>
        <Text style={styles.artistName} numberOfLines={1}>
          {currentSong?.artist}
        </Text>
      </View>
      <View style={styles.outerCircle}>
        <View style={styles.middleCircle}>
          <View style={styles.innerCircle}>
            {/* <CircularProgress
              value={val}
              activeStrokeWidth={12}
              progressValueColor={'#ecf0f1'}
              maxValue={360}
            /> */}
            <SpinningRecord
              currentSong={currentSong}
              setPlayState={setPlayState}
              playstate={playState}
              setPosition={setPosition}
              position={position}
              audio={audio}
            />
          </View>
        </View>
      </View>
      <View style={styles.playbackButtonContainer}>
        <TouchableOpacity style={styles.prevButton} onPress={prevButtonPressed}>
          <FontAwesome5 name="backward" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playPauseButton} onPress={playPauseButtonPressed}>
          <FontAwesome5 name={playState ? 'pause' : 'play'} size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.nextButton} onPress={nextButtonPressed}>
          <FontAwesome5 name="forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.backButton} onPress={handleClose}>
        <AntDesign name="left" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.shuffleButton} onPress={shuffleButtonPressed}>
        <MaterialCommunityIcons
          name={isShuffleOn ? 'shuffle' : 'shuffle-disabled'}
          size={isShuffleOn ? 28 : 25}
          color="white"
        />
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.addToPlaylistButton}
        onPress={() => setIsAddToPlaylistVisable(true)}>
        <Entypo name="add-to-list" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.currentPlaylistName}>
        <Text style={{ color: '#FFA500' }}>{currentPlaylist?.name}</Text>
      </View>
      <AddToPlaylistModal
        isAddToPlaylistVisable={isAddToPlaylistVisable}
        setIsAddToPlaylistVisable={setIsAddToPlaylistVisable}
        currentSong={currentSong}
        setCurrentSong={setCurrentSong}
        playlistNames={playlistNames}
        songData={songData}
        setSongData={setSongData}
      />
    </Modal>
  );
};

export default memo(Player);

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  infoContainer: {
    padding: 10,
    zIndex: 10,
    position: 'absolute',
    top: 160,
    left: 10,
    borderRadius: 15,
  },
  songTitle: {
    fontSize: 14,
    color: 'white',
  },
  artistName: {
    fontSize: 12,
    color: '#777777',
  },
  outerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 725,
    aspectRatio: 1,
    borderRadius: 1000,
    borderColor: '#060606',
    borderWidth: 5,
  },
  middleCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 600,
    aspectRatio: 1,
    borderRadius: 1000,
    borderColor: '#060606',
    borderWidth: 5,
  },
  innerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 475,
    aspectRatio: 1,
    borderRadius: 1000,
    borderColor: '#060606',
    borderWidth: 5,
  },
  record: {
    overflow: 'hidden',
    width: 350,
    height: 350,
    borderRadius: 1000,
    borderColor: 'white',
    borderWidth: 2,
  },

  playPauseButton: {
    padding: 8,
  },
  playbackButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 70,
    position: 'absolute',
    bottom: 90,
  },
  nextButton: { marginBottom: 20, marginLeft: 45, padding: 10 },
  prevButton: { marginBottom: 20, marginRight: 45, padding: 10 },
  shuffleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    padding: 20,
    bottom: 0,
    right: 0,
  },
  addToPlaylistButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    padding: 20,
    bottom: 0,
    left: 0,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
  },
  recordSongTitle: {
    color: 'white',
    fontSize: 30,
    opacity: 0.3,
  },
  currentPlaylistName: {
    position: 'absolute',
    padding: 5,
    bottom: 0,
  },
});
