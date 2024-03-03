import React, { useState, useEffect, useRef } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  Animated,
  Easing,
  ImageBackground,
} from 'react-native';

const Song = React.memo(({ item, setCurrentSong, currentSong }) => {
  return (
    <TouchableOpacity style={styles.audioItem} onPress={() => setCurrentSong(item)}>
      {item.coverArtUri ? (
        <ImageBackground
          source={{ uri: item.coverArtUri }}
          style={[styles.albumArtContainer, { backgroundColor: 'black' }]}>
          <View style={styles.songInfoContainer}>
            <Text style={styles.songTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.artistName} numberOfLines={1}>
              {item.artist}
            </Text>
          </View>
          {}
        </ImageBackground>
      ) : (
        <View style={[styles.albumArtContainer, { backgroundColor: item.backupColor }]}>
          {}
          <View style={styles.songInfoContainer}>
            <Text style={styles.songTitle} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.artistName} numberOfLines={1}>
              {item.artist}
            </Text>
          </View>
          {}
        </View>
      )}
    </TouchableOpacity>
  );
});
export default Song;
const styles = StyleSheet.create({
  audioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    aspectRatio: 1,
    marginTop: -120,
    marginBottom: -100,
    width: 320,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 2,
    borderBottomWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.2)',
    overflow: 'hidden',
    borderRadius: 10,
    elevation: 8,
  },
  songInfoContainer: {
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    padding: 8,
    borderColor: 'black',
  },
  albumArtContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
    borderColor: 'black',
    borderRadius: 10,
  },
  songTitle: {
    fontSize: 16,
    color: 'white',
  },
  artistName: {
    fontSize: 14,
    color: '#777777',
  },
  image: {
    borderRadius: 10,
    flex: 1,
    resizeMode: 'cover',
    overflow: 'hidden',
  },
});
