import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
  Image,
  ImageBackground,
} from "react-native";

import Animated, {
  useSharedValue,
  withTiming,
  useAnimatedStyle,
  Easing,
} from "react-native-reanimated";

import SongActionsModal from "~/components/SongActionsModal";
const Song = React.memo(
  ({
    item,
    setCurrentSong,
    currentSong,
    setIsPlayerVisible,
    isPlayerVisible,
  }) => {
    const [isModalVisable, setIsModalVisable] = useState(false);

    const chooseSong = () => {
      setIsPlayerVisible(true);
      setCurrentSong(item);
    };

    return (
      <TouchableOpacity
        style={styles.audioItem}
        onPress={chooseSong}
        onLongPress={() => setIsModalVisable(true)}
      >
        <SongActionsModal
          isModalVisable={isModalVisable}
          setIsModalVisable={setIsModalVisable}
          item={item}
        />
        {item.coverArtUri ? (
          <ImageBackground
            source={{ uri: item.coverArtUri }}
            style={[styles.albumArtContainer, { backgroundColor: "black" }]}
          >
            {currentSong &&
            currentSong.title &&
            currentSong.title == item.title ? (
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
        ) : (
          <View
            style={[
              styles.albumArtContainer,
              { backgroundColor: item.backupColor },
            ]}
          >
            {currentSong &&
            currentSong.title &&
            currentSong.title === item.title ? (
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
            {/* <View style={styles.coverInfoContainer}>
              <Text style={styles.coverSongTitle}> {item.title.toUpperCase()}</Text>
            </View> */}
          </View>
        )}
      </TouchableOpacity>
    );
  }
);

export default Song;
const styles = StyleSheet.create({
  audioItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    alignSelf: "center",
    // aspectRatio: 1,
    //marginTop: -100,
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
    // position: 'relative',
    // alignSelf: 'center',
    //flex: 1,

    color: "white",
    fontSize: 30,
    opacity: 0.05,
  },
  coverInfoContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: "50%",
    // flex: 1,
  },
});
