import { StyleSheet, FlatList, SafeAreaView } from "react-native";
import { useState, useEffect } from "react";
import * as MediaLibrary from "expo-media-library";
import MusicInfo from "expo-music-info-2";
import { Storage } from "expo-storage";
import { useAppContext } from "~/services/AppContext";
import Song from "~/components/Song";

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

  // const backupColors = [
  //   "#81E979",
  //   "#20FC8F",
  //   "#06D6A0",
  //   "#058E3F",
  //   "#FCE694",
  //   "#F9CB40",
  //   "#FFBE0B",
  //   "#FCAA67",
  //   "#FF8811",
  //   "#F15025",
  //   "#FF5A5F",
  //   "#D7263D",
  //   "#DB222A",
  //   "#F24333",
  //   "#7CC6FE",
  //   "#3A86FF",
  //   "#00CECB",
  //   "#2F52E0",
  //   "#5E2BFF",
  //   "#232ED1",
  // ];
  const backupColors = [
    "#99B2DD",
    "#C9C8D3",
    "#F87575",
    "#B8D3D1",
    "#BFD3C1",
    "#D66853",
    "#AF3E4D",
    "#B0C592",
    "#7EA8BE",
    "#F2A359",
    "#7E9181 ",
    "#9ABCA7",
    "#A997DF",
    "#457EAC",
    "#EB5E28",
    "#A22C29",
  ];
  // Get song data once page mounts
  useEffect(() => {
    fetchData();
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
      // console.log("NEW SONGS");
      // console.log("storedAudioFileCount:  ", storedAudioFileCount);
      // console.log("fetchedAudioFileCount:  ", fetchedAudioFileCount);
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
    const artistNames = [
      ...new Set(allSongs.map((song) => song.artist)),
    ].sort();
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
      <FlatList
        contentContainerStyle={{ paddingBottom: 340, paddingTop: 20 }}
        data={songData}
        renderItem={({ item }) => <Song item={item} />}
        keyExtractor={(item) => item.uri}
      />
    </SafeAreaView>
  );
};

export default index;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#080808",
  },
});
