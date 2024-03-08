import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAppContext } from '../services/AppContext';
const Footer = () => {
  const { currentSong, playState, setPlayState } = useAppContext();
  const router = useRouter();
  useEffect(() => {
    console.log(
      'currentSong: ',
      currentSong && currentSong.title && currentSong.artist ? currentSong.title : ''
    );
  }, [currentSong]);

  return (
    <>
      {currentSong && currentSong.title && currentSong.artist ? (
        <View style={styles.footer}>
          <TouchableOpacity style={styles.playback} onPress={() => router.push('player')}>
            <View style={styles.songInfoContainer}>
              <Text style={styles.songTitle} numberOfLines={1}>
                {currentSong.title}
              </Text>
              <Text style={styles.artistName} numberOfLines={1}>
                {currentSong.artist}
              </Text>
            </View>
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={() => setPlayState(!playState)}>
              {playState ? (
                <FontAwesome5 name="play" size={20} color="white" />
              ) : (
                <FontAwesome5 name="pause" size={20} color="white" />
              )}
            </TouchableOpacity>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.footer}></View>
      )}
    </>
  );
};

export default Footer;

const styles = StyleSheet.create({
  footer: {
    flexDirection: 'column',
    position: 'absolute',
    alignItems: 'center',
    // justifyContent: "space-between",
    left: 0,
    right: 0,
    zIndex: 10,
    bottom: 0,
    height: 100,
    elevation: 8,
    backgroundColor: 'black',
    borderTopWidth: 2,
    borderColor: '#111111',
  },
  playback: {
    flexDirection: 'row',
    // position: "absolute",
    alignItems: 'center',
    justifyContent: 'space-between',
    // left: 0,
    // right: 0,
    // zIndex: 10,
    // bottom: 0,
    height: 80,
    // elevation: 8,
    // backgroundColor: "blue",
    // borderTopWidth: 2,
    // borderColor: "#101010",
  },
  currentRouteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '60%',
  },
  routeContainer: {
    // backgroundColor: "blue",
    width: 30,
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
  },
  route: {
    // color: "white",
    // backgroundColor: "white",
    width: 8,
    aspectRatio: 1,
    borderRadius: 100,
    borderColor: 'white',
    borderWidth: 1,
  },
  router: {
    padding: 5,
    alignItems: 'center',
    // backgroundColor: "blue",
    height: 50,
    width: '100%',
  },
  songInfoContainer: {
    width: '80%',
    // backgroundColor: "red",
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
    // backgroundColor: "blue",
  },
  routeTitle: {
    color: 'white',
    fontSize: 12,
  },
});
