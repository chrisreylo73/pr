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
} from 'react-native';
import Modal from 'react-native-modal';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppContext } from '~/services/AppContext';
import { AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
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
    setPlaylistNames,
    audio,
    setAudio,
    currentSongIndex,
    setCurrentSongIndex,
    currentPlaylistName,
    currentPlaylistData,
    setCurrentSong,
  } = useAppContext();

  const [isAddToPlaylistVisable, setIsAddToPlaylistVisable] = useState(false);
  const [spinValue] = useState(new Animated.Value(0));
  const [startAngle, setStartAngle] = useState(0);

  useEffect(() => {
    (async () => {
      if (currentSong) {
        setPlayState(true);
        if (audio) {
          await audio.unloadAsync();
        }
        const uri = currentSong.uri;
        const { sound } = await Audio.Sound.createAsync({ uri });
        setAudio(sound);
        await sound.playAsync();
      }
    })();
    // setCurrentSongIndex(currentPlaylistData.findIndex((song) => song === currentSong));
    // console.log(currentSongIndex);
  }, [currentSong]);

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
    if (audio) {
      if (playState) {
        await audio.pauseAsync();
        setPlayState(false);
      } else {
        await audio.playAsync();
        setPlayState(true);
      }
    }
  };

  const prevButtonPressed = async () => {
    const prevSongIndex = currentSongIndex - 1;
    setCurrentSongIndex(prevSongIndex);
    setCurrentSong(currentPlaylistData[prevSongIndex]);
  };
  const nextButtonPressed = async () => {
    const nextSongIndex = currentSongIndex + 1;
    setCurrentSongIndex(nextSongIndex);
    setCurrentSong(currentPlaylistData[nextSongIndex]);
  };

  const shuffleButtonPressed = useCallback(() => {
    setIsShuffleOn((prevState) => !prevState);
  }, []);

  const addToPlaylistButtonPressed = useCallback(() => {}, []);

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
        <Text style={styles.artistName}>{currentSong?.artist}</Text>
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
          name={isShuffleOn ? 'shuffle-disabled' : 'shuffle'}
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
        <Text style={{ color: '#FFA500' }}>{currentPlaylistName}</Text>
      </View>
      <AddToPlaylistModal
        isAddToPlaylistVisable={isAddToPlaylistVisable}
        setIsAddToPlaylistVisable={setIsAddToPlaylistVisable}
        currentSong={currentSong}
        playlistNames={playlistNames}
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
  infoContainer: {
    padding: 10,
    zIndex: 10,
    position: 'absolute',
    top: 160,
    left: 10,
    borderRadius: 15,
    // elevation: 8,
  },
  songTitle: {
    fontSize: 14,
    color: 'white',
  },
  artistName: {
    fontSize: 12,
    color: '#777777',
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
