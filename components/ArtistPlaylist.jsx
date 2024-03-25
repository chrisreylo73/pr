import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  Alert,
  Dimensions,
  PanResponder,
  Animated,
  ImageBackground,
} from "react-native";
import ArtistPlaylistModal from "~/components/ArtistPlaylistModal";

const ArtistPlaylist = ({ playlistName }) => {
  const [isModalVisable, setIsModalVisable] = useState(false);

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setIsModalVisable(true)}
      >
        <Text style={styles.title}>{playlistName?.toUpperCase()}</Text>
      </TouchableOpacity>
      <ArtistPlaylistModal
        isModalVisable={isModalVisable}
        setIsModalVisable={setIsModalVisable}
        playlistName={playlistName}
      />
    </>
  );
};

export default ArtistPlaylist;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    width: 170,
    padding: 8,
    margin: 8,
    aspectRatio: 1,
    borderRadius: 15,
    elevation: 8,
    borderColor: "#0B0B0B",
    borderWidth: 2,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
  },
});
