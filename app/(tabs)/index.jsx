import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ViewToken,
} from "react-native";
// 3rd Party Components
import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";
import { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import MusicInfo from "expo-music-info-2";
import { Storage } from "expo-storage";
import { StatusBar } from "expo-status-bar";
import { BarIndicator } from "react-native-indicators";
import { useAppContext } from "../../services/AppContext";
import { SafeAreaView } from "react-native-safe-area-context";
// Custom Components
import Song from "~/components/Song";
import Player from "~/components/Player";

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
    artistNames,
    setArtistNames,
    playlistNames,
    setPlaylistNames,
    isPlayerVisible,
    setIsPlayerVisible,
  } = useAppContext();

  const backupColors = [
    "#d93f27",
    "#152b53",
    "#1f6e8d",
    "#83a89f",
    "#f4ddb3",
    "#eda96c",
    "#a9ad8a",
    "#aa492c",
    "#afbeb9",
    "#7996a6",
    "#6c7280",
    "#4d4a53",
    "#ef343b",
    "#009287",
    "#63a29f",
    "#bf0d01",
    "#61737f",
    "#939da9",
    "#d87067",
    "#edc393",
    "#979680",
    "#fae6c3",
    "#f8ca1d",
    "#800f01",
    "#530900",
    "#1d0b01",
    "#f8aa00",
    "#f7e5a5",
    "#f69f69",
    "#f17859",
    "#c6d8cc",
    "#2e4660",
    "#fed295",
    "#5d9b84",
    "#ee3d36",
    "#ee592e",
  ];

  // Get song data once page mounts
  useEffect(() => {
    fetchData();

    // console.log(songData);
    console.log("DATA MOUNTED");
  }, []);

  // await Storage.setItem({ key: "songData", value: [] });
  const fetchData = async () => {
    // await Storage.setItem({ key: "songData", value: [] });
    // Show loading till method finishes
    setIsLoading(true);
    // Get Data from storage
    const storedSongData = await Storage.getItem({ key: "songData" });
    setSongData(JSON.parse(storedSongData));
    const storedArtistNames = await Storage.getItem({ key: "artistNames" });
    setArtistNames(JSON.parse(storedArtistNames));
    const storedplaylistNames = await Storage.getItem({ key: "playlistNames" });
    setPlaylistNames(JSON.parse(storedplaylistNames));
    // Get the number of songs in storage
    const storedAudioFileCount = await Storage.getItem({
      key: "audioFileCount",
    });
    // Ask for permmissions to grab songs, only continue if granted
    const { status } = await MediaLibrary.requestPermissionsAsync();
    if (status !== "granted") {
      return;
    }
    // Get all audiofile data from device
    let fetchedAudioFileData = await MediaLibrary.getAssetsAsync({
      mediaType: "audio",
      first: 10000,
    });

    const fetchedAudioFileCount = String(fetchedAudioFileData.assets.length);

    // Compare the number of stored audioFiles to the ones freshly fetched. If they differ handle new songs
    if (storedAudioFileCount !== fetchedAudioFileCount) {
      console.log("NEW SONGS");
      console.log("storedAudioFileCount:  ", storedAudioFileCount);
      console.log("fetchedAudioFileCount:  ", fetchedAudioFileCount);
      handleNewSongs(fetchedAudioFileData.assets);
    }
    setIsLoading(false);
  };

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
            console.log("Title: ", filename.replace(/\.[^/.]+$/, ""));
            console.log(
              "Artist: ",
              metadata && metadata.artist ? metadata.artist : "Unknown"
            );
            return {
              uri: uri,
              title: filename.replace(/\.[^/.]+$/, ""),
              duration: formatSongDuration(duration),
              artist:
                metadata && metadata.artist
                  ? metadata.artist
                  : "Unknown Artist",
              album:
                metadata && metadata.album ? metadata.album : "Unknown Album",
              coverArtUri:
                metadata && metadata.picture && metadata.picture.pictureData
                  ? metadata.picture.pictureData
                  : null,
              backupColor: getRandomColor(),
              playListNames: [],
            };
          } catch (error) {
            console.error("Error fetching metadata for song:", uri, error);
          }
        }
      })
    );
    // combine all the songs together and sort the data alphabetically
    let allSongs = [...songData, ...songsWithMetadata];
    allSongs = allSongs.sort((a, b) => a.title.localeCompare(b.title));
    // Get all unique artist names
    const artistNames = [...new Set(allSongs.map((song) => song.artist))];
    console.log(artistNames);
    // Split songs by artist
    // const songsByArtist = allSongs.reduce((acc, song) => {
    //   acc[song.artist] = [...(acc[song.artist] || []), song];
    //   return acc;
    // }, {});
    // console.log("artist names: ", Object.keys(songsByArtist));

    // store data
    await Storage.setItem({
      key: "songData",
      value: JSON.stringify(allSongs),
    });
    await Storage.setItem({
      key: "audioFileCount",
      value: JSON.stringify(audioFileData.length),
    });
    await Storage.setItem({
      key: "artistNames",
      value: JSON.stringify(artistNames),
    });
    setSongData(allSongs);
    setArtistNames(artistNames);
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
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar />
      {isLoading === true ? (
        <View style={styles.loadingContainer}>
          <BarIndicator color="white" />
        </View>
      ) : (
        <FlatList
          contentContainerStyle={{ paddingBottom: 340, paddingTop: 30 }}
          data={songData}
          renderItem={({ item }) => (
            <Song
              item={item}
              setCurrentSong={setCurrentSong}
              currentSong={currentSong}
              setIsPlayerVisible={setIsPlayerVisible}
              isPlayerVisible={isPlayerVisible}
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
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    flex: 1,
    // paddingTop: 40,
    // paddingHorizontal: 20,

    backgroundColor: "#090909",
    // borderBottomRadius: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    // color: "#CCCCCC", // Light color scheme
    color: "#333333",
  },
  audioItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333333",
    backgroundColor: "#222222",
    height: 60,
  },
  songInfoContainer: {
    justifyContent: "flex-start",
    width: "60%",
    overflow: "hidden",
    height: "100%",
  },
  albumArtContainer: {
    aspectRatio: 1,
    width: 40,
    borderRadius: 10,
    backgroundColor: "#111111",
  },
  songTitle: {
    marginLeft: 5,
    color: "white",
  },
  artistName: {
    marginLeft: 5,
    color: "#444444",
  },
});
