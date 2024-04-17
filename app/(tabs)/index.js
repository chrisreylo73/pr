import { StyleSheet, FlatList, SafeAreaView, TouchableOpacity } from 'react-native';
import { memo, useCallback, useState, useEffect } from 'react';
import * as MediaLibrary from 'expo-media-library';
import MusicInfo from 'expo-music-info-2';
import { Storage } from 'expo-storage';
import { useAppContext } from '~/services/AppContext';
import Song from '~/components/Song';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';

const index = () => {
  const { backupColors, setIsLoading, songData, setSongData, setArtistNames, setPlaylistNames } =
    useAppContext();
  // Get song data once page mounts
  useEffect(() => {
    fetchData();
    console.log('DATA MOUNTED');
  }, []);

  useEffect(() => {
    getArtistNames();
  }, [songData]);

  const fetchData = useCallback(async () => {
    // Show loading till method finishes
    setIsLoading(true);

    // Get the number of songs in storage
    const storedAudioFileCount = await Storage.getItem({
      key: 'audioFileCount',
    });
    // Ask for permmissions to grab songs, only continue if granted
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== 'granted') {
      return;
    }
    // Get all audiofile data from device
    let fetchedAudioFileData = await MediaLibrary.getAssetsAsync({
      mediaType: 'audio',
      first: 10000,
    });

    const fetchedAudioFileCount = String(fetchedAudioFileData.assets.length);

    // Compare the number of stored audioFiles to the ones freshly fetched. If they differ handle new songs
    if (storedAudioFileCount !== fetchedAudioFileCount) {
      await handleNewSongs(fetchedAudioFileData.assets);
    } else {
      // Get Data from storage
      const storedSongData = await Storage.getItem({ key: 'songData' });
      setSongData(JSON.parse(storedSongData));
      const storedArtistNames = await Storage.getItem({ key: 'artistNames' });
      setArtistNames(JSON.parse(storedArtistNames));
    }
    const storedPlaylistNames = await Storage.getItem({ key: 'playlistNames' });
    setPlaylistNames(JSON.parse(storedPlaylistNames));
    setIsLoading(false);
  }, []);

  const handleNewSongs = async (audioFileData) => {
    const songsWithMetadata = await Promise.all(
      audioFileData.map(async ({ uri, filename, duration }) => {
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
              title: formatSting(filename.replace(/\.[^/.]+$/, '')),
              duration: formatSongDuration(duration),
              artist: metadata && metadata.artist ? formatSting(metadata.artist) : 'Unknown Artist',
              album: metadata && metadata.album ? formatSting(metadata.album) : 'Unknown Album',
              coverArtUri:
                metadata && metadata.picture && metadata.picture.pictureData
                  ? metadata.picture.pictureData
                  : null,
              backupColor: getRandomColor(),
              playListNames: [],
            };
          } catch (error) {
            console.error('Error fetching metadata for song:', uri, error);
          }
        }
      })
    );
    // combine all the songs together and sort the data alphabetically
    let allSongs = [...songData, ...songsWithMetadata];
    allSongs = allSongs.sort((a, b) => a.title.localeCompare(b.title));
    // store data
    await Storage.setItem({
      key: 'songData',
      value: JSON.stringify(allSongs),
    });
    await Storage.setItem({
      key: 'audioFileCount',
      value: JSON.stringify(audioFileData.length),
    });
    setSongData(allSongs);
  };

  const formatSting = (str) => {
    const formattedString = str.trim().replace(/\s+/g, ' ').toLowerCase();
    return formattedString.replace(/\b\w/g, (char) => char.toUpperCase()); // Capitalize first letter of each word
  };

  const getArtistNames = async () => {
    // Get all unique artist names
    const allSongs = songData;
    const artistNames = [...new Set(allSongs.map((song) => song.artist))];

    artistNames.sort();

    await Storage.setItem({
      key: 'artistNames',
      value: JSON.stringify(artistNames),
    });

    setArtistNames(artistNames);
    // console.log(artistNames);
  };

  // Used to get Random song color
  const getRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * backupColors.length);
    return backupColors[randomIndex];
  };

  // check for duplicates when getting song data
  const uriExists = (uriToCheck) => {
    return songData.some((song) => song.uri === uriToCheck);
  };

  // Format song duration
  const formatSongDuration = (durationInSeconds) => {
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = Math.floor(durationInSeconds % 60);
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const renderItem = ({ item, index }) => <Song item={item} index={index} listType={'allSongs'} />;

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient colors={['#000000', '#111111', '#000000']} style={styles.gradient}>
        <FlatList
          data={songData}
          renderItem={renderItem}
          keyExtractor={(item) => item.uri}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={6}
          contentContainerStyle={styles.flatListContent}
        />
      </LinearGradient>
      {/* <TouchableOpacity style={styles.moreButton}>
        <Feather name="plus" size={15} color="white" />
      </TouchableOpacity> */}
    </SafeAreaView>
  );
};

export default index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333740',
  },
  flatListContent: { paddingBottom: 340, paddingTop: 20 },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
  moreButton: {
    position: 'absolute',
    // right: 20,
    bottom: 70,
    backgroundColor: 'black',
    padding: 10,
  },
});
