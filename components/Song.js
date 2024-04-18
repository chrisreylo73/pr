import React, { memo, useState, useCallback, useEffect } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import { useAppContext } from '~/services/AppContext';
// import SongActionsModal from '~/components/SongActionsModal';
import FastImage from 'react-native-fast-image';
import ExpoFastImage from 'expo-fast-image';

const Song = ({ item, listType, listName, index }) => {
  // const [isModalVisable, setIsModalVisable] = useState(false);
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
  } = useAppContext();

  const startEditing = useCallback(() => {
    setSongToEdit(item);
    setIsEditSongModalVisable(true);
  }, [songToEdit]);

  const handlePress = useCallback(() => {
    setCurrentSong(item);
    setCurrentSongIndex(index);
    let playlist = {};
    let filteredSongs = [];
    const allSongs = [...songData];
    if (listType === 'allSongs') {
      playlist = {
        name: listName,
        type: listType,
        data: allSongs,
      };
    } else if (listType === 'artist' && currentPlaylist.name !== listName) {
      filteredSongs = allSongs.filter((song) => song.artist === listName);
      playlist = {
        name: listName,
        type: listType,
        data: filteredSongs,
      };
    } else if (listType === 'playlist' && currentPlaylist.name !== listName) {
      filteredSongs = allSongs.filter((song) => song.playListNames.includes(listName));
      playlist = {
        name: listName,
        type: listType,
        data: filteredSongs,
      };
    }
    setCurrentPlaylist(playlist);

    // console.log(index);
    // console.log('listType:  ', playlist.type);
    // console.log('listName:  ', playlist.name);
  }, [currentSong]);

  const isCurrentSong = currentSong?.title === item.title;

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
    // borderBottomWidth: 0,
    borderColor: 'rgba(0, 0, 0, 0.3)',
    borderRadius: 15,
    // elevation: 5,
    // transform: [{ rotateZ: '1deg' }],
  },
  songInfoContainer: {
    // overflow: 'hidden',
    borderRadius: 0,
    justifyContent: 'flex-start',
    flex: 1,
    // width: '110%',
    // height: '110%',
    backgroundColor: 'rgba(0, 0, 0, 0.85)',
    padding: 8,
    // borderWidth: 1,
    // borderColor: '#111111',
    // borderLeftWidth: 1,
    // borderRightWidth: 1,
    // borderTopWidth: 1,
  },
  albumArtContainer: {
    // overflow: 'hidden',
    // borderRadius: 0,
    flex: 1,
    height: '100%',
    backgroundColor: 'white',
    // borderWidth: 1,
    // borderColor: '#111111',
    // borderColor: 'black',
    // borderRadius: 10,
    // borderWidth: 1,
  },
  songTitle: {
    fontSize: 16,
    color: 'white',
  },
  artistName: {
    fontSize: 14,
    color: '#777777',
  },
  // image: {
  //   overflow: 'hidden',
  //   borderRadius: 20,
  //   flex: 1,
  //   resizeMode: 'cover',
  //   overflow: 'hidden',
  // },
  coverSongTitle: {
    color: 'white',
    fontSize: 30,
    opacity: 0.05,
  },
  coverInfoContainer: {
    // overflow: 'hidden',
    // borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '50%',
  },
});
