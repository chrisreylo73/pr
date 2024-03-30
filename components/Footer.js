import React, { memo, useCallback } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import { useAppContext } from '../services/AppContext';
const Footer = () => {
  const { currentSong, playState, setPlayState, setIsPlayerVisible } = useAppContext();

  const togglePlayState = useCallback(() => {
    setPlayState((prevState) => !prevState);
  }, []);

  const showPlayer = useCallback(() => {
    setIsPlayerVisible(true);
  }, []);

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
            <FontAwesome5 name={playState ? 'play' : 'pause'} size={20} color="white" />
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
    borderTopWidth: 1,
    borderColor: '#111111',
  },
  playback: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 80,
  },
  currentRouteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '60%',
  },
  routeContainer: {
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  route: {
    width: 8,
    aspectRatio: 1,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 1,
  },
  router: {
    padding: 5,
    alignItems: 'center',
    height: 50,
    width: '100%',
  },
  songInfoContainer: {
    width: '80%',
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
    padding: 20,
  },
  routeTitle: {
    color: 'white',
    fontSize: 12,
  },
});
