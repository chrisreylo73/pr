import React, { memo, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppContext } from '../services/AppContext';
import { Audio } from 'expo-av';
const Footer = () => {
  const { currentSong, playState, setPlayState, setIsPlayerVisible, audio, setAudio } =
    useAppContext();

  const showPlayer = useCallback(() => {
    setIsPlayerVisible(true);
  }, []);

  const togglePlayState = async () => {
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

  return (
    <View style={styles.footer}>
      {currentSong && (
        <TouchableOpacity style={styles.playback} onPress={showPlayer}>
          <View style={styles.songInfoContainer}>
            <Text style={styles.songTitle} numberOfLines={1}>
              {currentSong.title}
            </Text>
            <Text style={styles.artistName} numberOfLines={1}>
              {currentSong.artist}
            </Text>
          </View>
          <TouchableOpacity style={styles.playPauseButton} onPress={togglePlayState}>
            <FontAwesome5 name={playState ? 'pause' : 'play'} size={20} color="white" />
          </TouchableOpacity>
        </TouchableOpacity>
      )}
    </View>
  );
};
export default memo(Footer);
const styles = StyleSheet.create({
  footer: {
    flexDirection: 'column',
    position: 'absolute',
    alignItems: 'center',
    left: 0,
    right: 0,
    zIndex: 10,
    bottom: 0,
    height: 70,
    elevation: 8,
    backgroundColor: 'black',
    borderTopWidth: 2,
    borderColor: '#111111',
  },
  playback: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 80,
  },
  songInfoContainer: {
    width: '85%',
    padding: 8,
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
    width: '10%',
    alignItems: 'center',
    paddingVertical: 10,
    justifyContent: 'center',
  },
});
