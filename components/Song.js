import React, { memo, useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useAppContext } from '~/services/AppContext';

const Song = ({ item, listType, listName, index }) => {
  const {
    currentSong,
    setCurrentSong,
    songData,
    songToEdit,
    setSongToEdit,
    setIsEditSongModalVisable,
    setCurrentPlaylist,
    currentPlaylist,
    setCurrentSongIndex,
    isShuffleOn,
  } = useAppContext();

  const handlePress = useCallback(() => {
    setCurrentSong(item);
    setCurrentSongIndex(index);
    let playlist = {};
    let filteredSongs = [];
    const songDataCopy = [...songData];
    if (listType === 'allSongs') {
      filteredSongs = songDataCopy;
    } else if (listType === 'artist') {
      filteredSongs = songDataCopy.filter((song) => song.artist === listName);
    } else if (listType === 'playlist') {
      filteredSongs = songDataCopy.filter((song) => song.playListNames.includes(listName));
    }
    playlist = {
      name: listName,
      type: listType,
      data: isShuffleOn ? shuffleArray(filteredSongs) : filteredSongs,
    };
    setCurrentPlaylist(playlist);
  }, [currentSong, isShuffleOn]);

  const startEditing = useCallback(() => {
    setSongToEdit(item);
    setIsEditSongModalVisable(true);
  }, [songToEdit]);

  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Generate random index from 0 to i
      [array[i], array[j]] = [array[j], array[i]]; // Swap elements at indices i and j
    }
    return array;
  };

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      style={styles.audioItem}
      onPress={handlePress}
      onLongPress={startEditing}>
      <ImageBackground
        source={{ uri: item.coverArtUri }}
        style={[
          styles.albumArtContainer,
          { backgroundColor: item.coverArtUri ? '#000000' : item.backupColor },
        ]}>
        <View style={styles.songInfoContainer}>
          <Text
            style={
              (styles.songTitle,
              {
                color: currentSong?.title === item.title ? '#FFA500' : 'white',
              })
            }
            numberOfLines={1}>
            {item.title}
          </Text>
          <Text
            style={[
              styles.artistName,
              {
                color: currentSong?.title === item.title ? '#7F6000' : '#777777',
              },
            ]}
            numberOfLines={1}>
            {item.artist}
          </Text>
        </View>
      </ImageBackground>
    </TouchableOpacity>
  );
};

export default memo(Song);

const styles = StyleSheet.create({
  audioItem: {
    overflow: 'hidden',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: -210,
    width: 320,
    height: 320,
    borderLeftWidth: 2,
    borderRightWidth: 2,
    borderTopWidth: 3,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 15,
  },
  albumArtContainer: {
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
  },
  songInfoContainer: {
    borderRadius: 0,
    justifyContent: 'flex-start',
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    padding: 8,
  },
  songTitle: {
    fontSize: 16,
    color: 'white',
  },
  artistName: {
    fontSize: 14,
    color: '#777777',
  },
});
