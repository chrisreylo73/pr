import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ViewToken,
} from "react-native";
import { useAppContext } from "../../services/AppContext";
import { useState, useEffect } from "react";
import ArtistPlaylist from "~/components/ArtistPlaylist";
const artists = () => {
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

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 110, paddingTop: 10 }}
        data={artistNames}
        extraData={artistNames}
        renderItem={({ item, index }) => (
          <ArtistPlaylist playlistName={item} index={index} />
        )}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
    </View>
  );
};

export default artists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#080808",
  },
});
