import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ViewToken,
} from 'react-native';

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from 'react-native-reanimated';
import { useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
import MusicInfo from 'expo-music-info-2';
import { Storage } from 'expo-storage';
import { StatusBar } from 'expo-status-bar';
import { BarIndicator } from 'react-native-indicators';
import Song from '~/components/Song';
import { Link, router } from 'expo-router';
import Player from '~/components/Player';
import { useAppContext } from '../../services/AppContext';
import { SafeAreaView } from 'react-native-safe-area-context';

const index = () => {
  const {
    currentSong,
    setCurrentSong,
    playState,
    setPlayState,
    isLoading,
    setIsLoading,
    songData,
    setSongData,
    isPlayerVisible,
    setIsPlayerVisible,
  } = useAppContext();

  // const [isPlayerVisible, setIsPlayerVisible] = useState(false);
  const backupColors = [
    '#d93f27',
    '#152b53',
    '#1f6e8d',
    '#83a89f',
    '#f4ddb3',
    '#eda96c',
    '#a9ad8a',
    '#aa492c',
    '#afbeb9',
    '#7996a6',
    '#6c7280',
    '#4d4a53',
    '#ef343b',
    '#009287',
    '#63a29f',
    '#bf0d01',
    '#61737f',
    '#939da9',
    '#d87067',
    '#edc393',
    '#979680',
    '#fae6c3',
    '#f8ca1d',
    '#800f01',
    '#530900',
    '#1d0b01',
    '#f8aa00',
    '#f7e5a5',
    '#f69f69',
    '#f17859',
    '#c6d8cc',
    '#2e4660',
    '#fed295',
    '#5d9b84',
    '#ee3d36',
    '#ee592e',
  ];
  // Animation

  const viewableItems = useSharedValue([]);

  useEffect(() => {
    fetchData();
    console.log('SONGS MOUNTED');
    // setHideFooter(false);
  }, []);

  const fetchData = async () => {
    setIsLoading(true);
    // await Storage.setItem({ key: "songData", value: [] });
    const storedSongData = await Storage.getItem({ key: 'songData' });
    setSongData(JSON.parse(storedSongData));
    const storedAudioFileCount = await Storage.getItem({ key: 'audioFileCount' });

    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      return;
    }

    let media = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: 1000,
    });

    console.log('storedAudioFileCount', storedAudioFileCount);
    console.log('media.assets.length', media.assets.length);

    if (storedAudioFileCount !== String(media.assets.length)) {
      // setAudioFileCount(media.assets.length);
      const songsWithMetadata = await Promise.all(
        media.assets.map(async ({ uri, filename, duration }) => {
          if (!uriExists(uri)) {
            try {
              const metadata = await MusicInfo.getMusicInfoAsync(uri, {
                title: false,
                artist: true,
                album: true,
                genre: false,
                picture: true,
              });
              console.log('Title: ', filename.replace(/\.[^/.]+$/, ''));
              console.log('Artist: ', metadata && metadata.artist ? metadata.artist : 'Unknown');
              return {
                uri: uri,
                title: filename.replace(/\.[^/.]+$/, ''),
                duration: formatSongDuration(duration),
                artist: metadata && metadata.artist ? metadata.artist : 'Unknown Artist',
                album: metadata && metadata.album ? metadata.album : 'Unknown Album',
                coverArtUri:
                  metadata && metadata.picture && metadata.picture.pictureData
                    ? metadata.picture.pictureData
                    : null,
                backupColor: getRandomColor(),
              };
            } catch (error) {
              console.error('Error fetching metadata for song:', uri, error);
            }
          }
        })
      );

      songsWithMetadata.sort((a, b) => a.title.localeCompare(b.title));
      // console.log(songsWithMetadata, ":::songsWithMetadata:::");
      await Storage.setItem({ key: 'songData', value: JSON.stringify(songsWithMetadata) });
      await Storage.setItem({ key: 'audioFileCount', value: JSON.stringify(media.assets.length) });
      setSongData(songsWithMetadata);
    }
    setIsLoading(false);
  };

  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * backupColors.length);

    // Return the color at the randomly selected index
    return backupColors[randomIndex];
  };

  const uriExists = (uriToCheck) => {
    return songData.some((song) => song.uri === uriToCheck);
  };

  const formatSongDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {isLoading ? (
        <View style={styles.loadingContainer}>
          <BarIndicator color="white" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 340, paddingTop: 30 }}
          data={songData}
          onViewableItemsChanged={({ viewableItems: vItems }) => {
            console.log(viewableItems);
            viewableItems.value = vItems;
          }}
          renderItem={({ item }) => (
            <Song
              item={item}
              setCurrentSong={setCurrentSong}
              currentSong={currentSong}
              setIsPlayerVisible={setIsPlayerVisible}
              isPlayerVisible={isPlayerVisible}
              viewableItems={viewableItems}
            />
          )}
          keyExtractor={(item) => item.uri}
        />
      )}
      {isPlayerVisible ? (
        <Player
          currentSong={currentSong}
          setCurrentSong={setCurrentSong}
          isPlayerVisible={isPlayerVisible}
          setIsPlayerVisible={setIsPlayerVisible}
          setPlayState={setPlayState}
          playState={playState}
        />
      ) : (
        <></>
      )}
    </SafeAreaView>
  );
};

export default index;

const styles = StyleSheet.create({
  loadingContainer: {
    // ...StyleSheet.absoluteFillObject,
    zIndex: 10,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    // paddingTop: 40,
    //paddingHorizontal: 20,
    //backgroundColor: "#090909",
    backgroundColor: '#090909',
    // borderBottomRadius: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    // color: "#CCCCCC", // Light color scheme
    color: '#333333',
  },
  audioItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#333333',
    backgroundColor: '#222222',
    height: 60,
  },
  songInfoContainer: {
    justifyContent: 'flex-start',
    width: '60%',
    overflow: 'hidden',
    height: '100%',
  },
  albumArtContainer: {
    aspectRatio: 1,
    width: 40,
    borderRadius: 10,
    backgroundColor: '#111111',
  },
  songTitle: {
    marginLeft: 5,
    color: 'white',
  },
  artistName: {
    marginLeft: 5,
    color: '#444444',
  },
});
