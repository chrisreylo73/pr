import React, { memo, useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useAppContext } from '~/services/AppContext';
import SongActionsModal from '~/components/SongActionsModal';
import FastImage from 'react-native-fast-image';
import ExpoFastImage from 'expo-fast-image';

const Song = ({ item }) => {
  // const [isModalVisable, setIsModalVisable] = useState(false);
  const {
    currentSong,
    setCurrentSong,
    // setIsPlayerVisible,
    // songToEdit,
    // setSongToEdit,
    // isSongActionsModalVisable,
    // setIsSongActionsModalVisable,
  } = useAppContext();

  // const startEditing = () => {
  //   setSongToEdit(item);
  //   setIsSongActionsModalVisable(true);
  // };

  const handlePress = useCallback(() => {
    setCurrentSong(item);
    //, setIsPlayerVisible(true);
  }, [currentSong]);

  const isCurrentSong = currentSong?.title === item.title;

  return (
    <TouchableOpacity style={styles.audioItem} onPress={handlePress}>
      <ImageBackground
        source={{ uri: item.coverArtUri }}
        style={[styles.albumArtContainer, { backgroundColor: item.backupColor }]}>
        <View style={styles.songInfoContainer}>
          <Text
            style={
              (styles.songTitle,
              {
                color: isCurrentSong ? '#FFA500' : 'white',
              })
            }
            numberOfLines={1}>
            {item.title}
          </Text>
          <Text
            style={[
              styles.artistName,
              {
                color: isCurrentSong ? '#7F6000' : '#777777',
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: -210,
    width: 320,
    height: 320,
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
  coverSongTitle: {
    color: 'white',
    fontSize: 30,
    opacity: 0.05,
  },
  coverInfoContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '50%',
  },
});
