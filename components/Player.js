import { useState, useEffect } from 'react';
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
} from 'react-native';
import Modal from 'react-native-modal';
import { FontAwesome5 } from '@expo/vector-icons';
// import { FontAwesome } from "@expo/vector-icons";
import { Ionicons } from '@expo/vector-icons';

const Player = ({ setIsPlayerVisible, isPlayerVisible, currentSong, playState, setPlayState }) => {
  const [spinValue] = useState(new Animated.Value(0));
  const [startAngle, setStartAngle] = useState(0); // Store initial angle when rotation starts
  useEffect(() => {
    console.log(startAngle);
  }, [startAngle]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderGrant: (evt, gestureState) => {
      const { width, height } = Dimensions.get('window');
      const centerX = width / 2;
      const centerY = height / 2;
      const x = gestureState.x0 - centerX; // Use x0 and y0 for initial touch position
      const y = gestureState.y0 - centerY; // Flip the y-axis
      const angle = (Math.atan2(y, x) * 180) / Math.PI; // Convert to degrees
      setStartAngle(angle);
    },
    onPanResponderMove: (evt, gestureState) => {
      const { width, height } = Dimensions.get('window');
      const centerX = width / 2;
      const centerY = height / 2;
      const x = gestureState.moveX - centerX;
      const y = centerY - gestureState.moveY; // Flip the y-axis
      let angle = (Math.atan2(y, x) * 180) / Math.PI; // Convert to degrees
      angle *= -1; // Invert the angle
      angle -= startAngle; // Adjust angle relative to initial angle
      console.log(angle);
      spinValue.setValue(angle);
    },
    onPanResponderRelease: () => {
      // const { width, height } = Dimensions.get("window");
      // const centerX = width / 2;
      // const centerY = height / 2;
      // const x = gestureState.x0 - centerX; // Use x0 and y0 for initial touch position
      // const y = gestureState.y0 - centerY; // Flip the y-axis
      // const angle = (Math.atan2(y, x) * 180) / Math.PI; // Convert to degrees
      // setStartAngle(angle);
      // Set the new startAngle to the last angle when the finger is lifted
      setStartAngle(spinValue._value); // Accessing the current angle from spinValue
    },
  });

  return (
    <Modal
      style={styles.modal}
      isVisible={isPlayerVisible}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={500}
      animationOutTiming={500}
      coverScreen={true}
      hasBackdrop={true}
      backdropOpacity={1}
      backdropColor="transparent"
      onRequestClose={() => setIsPlayerVisible(false)}>
      <View style={styles.infoContainer}>
        <Text style={styles.songTitle}>{currentSong.title}</Text>
        <Text style={styles.artistName}>{currentSong.artist}</Text>
      </View>
      <Animated.View
        style={[
          styles.record,
          {
            transform: [
              {
                rotate: spinValue.interpolate({
                  inputRange: [-180, 180],
                  outputRange: ['-180deg', '180deg'],
                }),
              },
            ],
          },
        ]}
        {...panResponder.panHandlers}>
        <ImageBackground source={{ uri: currentSong.coverArtUri }} style={{ flex: 1 }} />
      </Animated.View>
      <TouchableOpacity style={styles.backButton} onPress={() => setIsPlayerVisible(false)}>
        <FontAwesome5 name="angle-left" size={24} color="white" />
      </TouchableOpacity>
      <View style={styles.playbackButtonContainer}>
        <TouchableOpacity style={styles.prevButton}>
          <FontAwesome5 name="backward" size={20} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.playPauseButton} onPress={() => setPlayState(!playState)}>
          {playState ? (
            <FontAwesome5 name="play" size={20} color="white" />
          ) : (
            <FontAwesome5 name="pause" size={20} color="white" />
          )}
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome5 style={styles.nextButton} name="forward" size={20} color="white" />
        </TouchableOpacity>
      </View>
    </Modal>
  );
};

export default Player;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'flex-end',
    width: '100%',
    height: '100%',
    flex: 1,
    alignSelf: 'center',
    backgroundColor: '#090909',
  },
  record: {
    overflow: 'hidden',
    position: 'absolute',
    top: 180,
    backgroundColor: 'black',
    width: '90%',
    aspectRatio: 1,
    borderRadius: 200,
    alignSelf: 'center',
    // elevation: 8,
    borderColor: 'white',
    borderWidth: 2,
  },
  infoContainer: {
    position: 'absolute',
    top: 130,
    left: 30,
  },
  songTitle: {
    fontSize: 14,
    color: 'white',
  },
  artistName: {
    fontSize: 12,
    color: '#777777',
  },
  playPauseButton: {
    padding: 8,

    //backgroundColor: "blue",
  },
  playbackButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 70,
    position: 'absolute',
    alignSelf: 'center',
    bottom: '20%',

    // backgroundColor: "blue",
  },
  nextButton: { marginBottom: 30, marginLeft: 45, padding: 10 },
  prevButton: { marginBottom: 30, marginRight: 45, padding: 10 },
  shuffleButton: {},
  backButton: { position: 'absolute', top: 0, left: 0, padding: 20 },
});
