import React, { useState, useEffect } from "react";
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
import Modal from "react-native-modal";
import { FontAwesome5 } from "@expo/vector-icons";
import { useAppContext } from "../services/AppContext";
import { AntDesign, MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

const Player = () => {
  const {
    currentSong,
    playState,
    isPlayerVisible,
    setIsPlayerVisible,
    setPlayState,
    isShuffleOn,
    setIsShuffleOn,
  } = useAppContext();

  const [spinValue] = useState(new Animated.Value(0));
  const [startAngle, setStartAngle] = useState(0);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      const { width, height } = Dimensions.get("window");
      const centerX = width / 2;
      const centerY = height / 2;
      const x = gestureState.x0 - centerX;
      const y = gestureState.y0 - centerY;
      const angle = (Math.atan2(y, x) * 180) / Math.PI;
      setStartAngle(angle);
    },
    onPanResponderMove: (evt, gestureState) => {
      const { width, height } = Dimensions.get("window");
      const centerX = width / 2;
      const centerY = height / 2;
      const x = gestureState.moveX - centerX;
      const y = centerY - gestureState.moveY;
      let angle = (Math.atan2(y, x) * 180) / Math.PI;
      angle *= -1;
      angle -= startAngle;
      spinValue.setValue(angle);
    },
    onPanResponderRelease: () => {
      setStartAngle(spinValue._value);
    },
  });

  return (
    <Modal
      style={styles.modal}
      isVisible={isPlayerVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={300}
      animationOutTiming={300}
      coverScreen={true}
      hasBackdrop={true}
      backdropOpacity={1}
      backdropColor="#090909"
      useNativeDriver={true}
      onRequestClose={() => setIsPlayerVisible(false)}
    >
      {currentSong && currentSong.title && currentSong.artist && (
        <>
          <View style={styles.infoContainer}>
            <Text style={styles.songTitle}>{currentSong.title}</Text>
            <Text style={styles.artistName}>{currentSong.artist}</Text>
          </View>
          <View style={styles.outerCircle}>
            <View style={styles.middleCircle}>
              <View style={styles.innerCircle}>
                <Animated.View
                  style={[
                    styles.record,
                    {
                      transform: [
                        {
                          rotate: spinValue.interpolate({
                            inputRange: [-180, 180],
                            outputRange: ["-180deg", "180deg"],
                          }),
                        },
                      ],
                    },
                  ]}
                  {...panResponder.panHandlers}
                >
                  {currentSong.coverArtUri ? (
                    <ImageBackground
                      source={{ uri: currentSong.coverArtUri }}
                      style={{ flex: 1 }}
                    />
                  ) : (
                    <View
                      style={[
                        {
                          flex: 1,
                          alignItems: "center",
                          padding: 10,
                          justifyContent: "center",
                          backgroundColor: currentSong.backupColor,
                        },
                      ]}
                    >
                      <Text style={styles.recordSongTitle}>
                        {currentSong.title.toUpperCase()}
                      </Text>
                    </View>
                  )}
                </Animated.View>
              </View>
            </View>
          </View>
          <View style={styles.playbackButtonContainer}>
            <TouchableOpacity style={styles.prevButton}>
              <FontAwesome5 name="backward" size={20} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.playPauseButton}
              onPress={() => setPlayState(!playState)}
            >
              <FontAwesome5
                name={playState ? "play" : "pause"}
                size={20}
                color="white"
              />
            </TouchableOpacity>
            <TouchableOpacity style={styles.nextButton}>
              <FontAwesome5 name="forward" size={20} color="white" />
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => setIsPlayerVisible(false)}
          >
            <AntDesign name="left" size={20} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.shuffleButton}
            onPress={() => setIsShuffleOn(!isShuffleOn)}
          >
            {isShuffleOn ? (
              <MaterialCommunityIcons
                name="shuffle-disabled"
                size={30}
                color="white"
              />
            ) : (
              <MaterialCommunityIcons name="shuffle" size={25} color="white" />
            )}
          </TouchableOpacity>
          <TouchableOpacity style={styles.addToPlaylistButton}>
            <Entypo name="add-to-list" size={24} color="white" />
          </TouchableOpacity>
        </>
      )}
    </Modal>
  );
};

export default Player;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
    flex: 1,
    alignItems: "center",
  },
  outerCircle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 725,
    aspectRatio: 1,
    borderRadius: 1000,
    borderColor: "#060606",
    borderWidth: 5,
  },
  middleCircle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 600,
    aspectRatio: 1,
    borderRadius: 1000,
    borderColor: "#060606",
    borderWidth: 5,
  },
  innerCircle: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    width: 475,
    aspectRatio: 1,
    borderRadius: 1000,
    borderColor: "#060606",
    borderWidth: 5,
  },
  record: {
    overflow: "hidden",
    width: 350,
    height: 350,
    borderRadius: 1000,
    borderColor: "white",
    borderWidth: 2,
  },
  infoContainer: {
    padding: 10,
    zIndex: 10,
    position: "absolute",
    top: 160,
    left: 10,
    borderRadius: 15,
    // elevation: 8,
  },
  songTitle: {
    fontSize: 14,
    color: "white",
  },
  artistName: {
    fontSize: 12,
    color: "#777777",
  },
  playPauseButton: {
    padding: 8,
  },
  playbackButtonContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    height: 70,
    position: "absolute",
    bottom: 90,
  },
  nextButton: { marginBottom: 20, marginLeft: 45, padding: 10 },
  prevButton: { marginBottom: 20, marginRight: 45, padding: 10 },
  shuffleButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
  },
  addToPlaylistButton: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    left: 20,
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 20,
  },
  recordSongTitle: {
    color: "white",
    fontSize: 30,
    opacity: 0.3,
  },
});
