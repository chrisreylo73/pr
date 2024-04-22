import React, { memo, useState, useEffect, useCallback } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Dimensions,
  PanResponder,
  Animated,
  ImageBackground,
  Settings,
} from 'react-native';
import Modal from 'react-native-modal';
import { useAppContext } from '~/services/AppContext';
import { AntDesign, MaterialCommunityIcons, Entypo, FontAwesome5 } from '@expo/vector-icons';
import AddToPlaylistModal from '~/components/AddToPlaylistModal';
import { Audio } from 'expo-av';

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
  const [spinValue] = useState(new Animated.Value(0));
  const [startAngle, setStartAngle] = useState(0);

  useEffect(() => {
    (async () => {
      setPlayState(true);
      // try {
      if (audio) {
        // Unload the current sound
        await audio.stopAsync();
        await audio.unloadAsync();
      }
      const { sound } = await Audio.Sound.createAsync({ uri: currentSong.uri });
      setAudio(sound);
      // await sound.playAsync();
      // } catch (error) {
      //   console.log('@ useEffect [currentSong?uri] :  ', error);
      // }
      return () => {
        // Clean up function
        (async () => {
          // Unload all sounds when component unmounts
          if (audio) {
            // Unload the current sound
            await audio.stopAsync();
            await audio.unloadAsync();
          }
        })();
      };
    })();
  }, [currentSong?.uri]);
  useEffect(() => {
    (async () => {
      // if (audio) {
      //   // Unload the current sound
      //   await audio.stopAsync();
      //   await audio.unloadAsync();
      // }
      if (audio) {
        audio.playAsync();
      }
    })();
  }, [audio]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      const { width, height } = Dimensions.get('window');
      const centerX = width / 2;
      const centerY = height / 2;
      const x = gestureState.x0 - centerX;
      const y = gestureState.y0 - centerY;
      const angle = (Math.atan2(y, x) * 180) / Math.PI;
      setStartAngle(angle);
    },
    onPanResponderMove: (evt, gestureState) => {
      const { width, height } = Dimensions.get('window');
      const centerX = width / 2;
      const centerY = height / 2;
      const x = gestureState.moveX - centerX;
      const y = centerY - gestureState.moveY;
      let angle = (Math.atan2(y, x) * 180) / Math.PI;
      angle *= -1;
      angle -= startAngle;
      spinValue.setValue(angle);
    },
    onPanResponderRelease: () => {
      setStartAngle(spinValue._value);
    },
  });

  const handleClose = useCallback(() => {
    setIsPlayerVisible(false);
  }, []);

  const playPauseButtonPressed = async () => {
    try {
      if (playState) {
        await audio.pauseAsync();
        setPlayState(false);
      } else {
        await audio.playAsync();
        setPlayState(true);
      }
    } catch (error) {
      console.log('@ playPauseButtonPressed:  ', error);
    }
  };

  const prevButtonPressed = async () => {
    try {
      // if (audio) {
      //   await audio.unloadAsync();
      // }
      if (currentSongIndex !== 0) {
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
      // setTimeout(() => {
      if (currentSongIndex !== currentPlaylist.data.length - 1) {
        const nextSongIndex = currentSongIndex + 1;
        setCurrentSongIndex(nextSongIndex);
        setCurrentSong(currentPlaylist.data[nextSongIndex]);
      }
      // }, 3000);
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
            <Animated.View
              style={[
                styles.record,
                {
                  transform: [
                    {
                      rotate: spinValue.interpolate({
                        inputRange: [-180, 180],
                        outputRange: ['-180deg', '180deg'],
                      }),
                    },
                  ],
                },
              ]}
              {...panResponder.panHandlers}>
              {currentSong?.coverArtUri ? (
                <ImageBackground source={{ uri: currentSong?.coverArtUri }} style={{ flex: 1 }} />
              ) : (
                <View
                  style={[
                    {
                      flex: 1,
                      alignItems: 'center',
                      padding: 10,
                      justifyContent: 'center',
                      backgroundColor: currentSong?.backupColor || 'black',
                    },
                  ]}>
                  <Text style={styles.recordSongTitle}>{currentSong?.title.toUpperCase()}</Text>
                </View>
              )}
            </Animated.View>
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
