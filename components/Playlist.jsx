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
import { useAppContext } from "~/services/AppContext";
import PlaylistSongs from "~/components/PlaylistSongs";
const Playlist = ({ name }) => {
  const [isModalVisable, setIsModalVisable] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setIsModalVisable(true)}
      >
        <Text style={styles.title}>{name?.toUpperCase()}</Text>
      </TouchableOpacity>
      <PlaylistSongs
        isModalVisable={isModalVisable}
        setIsModalVisable={setIsModalVisable}
        playlistName={name}
      />
    </>
  );
};

export default Playlist;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "black",
    width: 170,
    padding: 8,
    margin: 8,
    aspectRatio: 1,
    borderRadius: 20,
    elevation: 8,
    borderColor: "#111111",
    borderWidth: 2,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
  },
});
