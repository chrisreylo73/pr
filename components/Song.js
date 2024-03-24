import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

import { useAppContext } from "../services/AppContext";

import SongActionsModal from "~/components/SongActionsModal";
const Song = React.memo(({ item }) => {
  const [isModalVisable, setIsModalVisable] = useState(false);
  const { currentSong, setCurrentSong, setIsPlayerVisible } = useAppContext();
  return (
    <TouchableOpacity
      style={styles.audioItem}
      onPress={() => {
        setCurrentSong(item), setIsPlayerVisible(true);
      }}
      onLongPress={() => setIsModalVisable(true)}
    >
      <ImageBackground
        source={{ uri: item.coverArtUri }}
        style={[
          styles.albumArtContainer,
          { backgroundColor: item.backupColor },
        ]}
      >
        {currentSong && currentSong.title && currentSong.title == item.title ? (
          <View style={styles.songInfoContainer}>
            <Text
              style={(styles.songTitle, { color: "#FFA500" })}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text
              style={[styles.artistName, , { color: "#7F6000" }]}
              numberOfLines={1}
            >
              {item.artist}
            </Text>
          </View>
        ) : (
          <View style={styles.songInfoContainer}>
            <Text
              style={(styles.songTitle, { color: "white" })}
              numberOfLines={1}
            >
              {item.title}
            </Text>
            <Text
              style={[styles.artistName, , { color: "#777777" }]}
              numberOfLines={1}
            >
              {item.artist}
            </Text>
          </View>
        )}
      </ImageBackground>
      {isModalVisable && (
        <SongActionsModal
          isModalVisable={isModalVisable}
          setIsModalVisable={setIsModalVisable}
          item={item}
        />
      )}
    </TouchableOpacity>
  );
});

export default Song;
const styles = StyleSheet.create({
  audioItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    marginBottom: -210,
    width: 320,
    height: 320,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 2,
    borderBottomWidth: 1,
    borderColor: "rgba(0, 0, 0, 0.2)",
    overflow: "hidden",
    borderRadius: 10,
    elevation: 8,
  },
  songInfoContainer: {
    justifyContent: "flex-start",
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.85)",
    padding: 8,
    borderColor: "black",
  },
  albumArtContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 10,
  },
  songTitle: {
    fontSize: 16,
    color: "white",
  },
  artistName: {
    fontSize: 14,
    color: "#777777",
  },
  image: {
    borderRadius: 10,
    flex: 1,
    resizeMode: "cover",
    overflow: "hidden",
  },
  coverSongTitle: {
    color: "white",
    fontSize: 30,
    opacity: 0.05,
  },
  coverInfoContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "50%",
  },
});
