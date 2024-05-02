import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Animated,
  PanResponder,
  Dimensions,
} from 'react-native';
import React, { memo, useState, useEffect, useCallback, useRef } from 'react';

// import Animated from 'react-native-reanimated';

const SpinningRecord = ({ currentSong, playstate, setPosition, audio, position }) => {
  const [angle, setAngle] = useState(0);

  useEffect(() => {
    let rotationInterval;
    if (playstate) {
      rotationInterval = setInterval(() => {
        setAngle((prevAngle) => (prevAngle + 0.1) % 360);
      }, 16);
    }
    return () => clearInterval(rotationInterval);
  }, [playstate]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: async (event, gestureState) => {
      const { dx, dy } = gestureState;

      const { width, height } = Dimensions.get('window');
      const centerX = width / 2;
      const centerY = height / 2;
      const x = centerX - gestureState.moveX;
      const y = gestureState.moveY - centerY;
      const finger = centerX - dx;
      const newAngle = (((Math.atan2(y, x) * 180) / Math.PI) * -1 + 360) % 360;
      const prevAngle = angle;
      const angleDiff = newAngle - prevAngle;
      if (angleDiff >= 0) {
        // console.log('clockwise');
        // if (position <= currentSong?.duration) {
        setPosition((prev) => Number((prev + 0.01).toFixed(2)));
        console.log(position);
        // }
      } else {
        // console.log('counter-clockwise');
        if (position >= 0) {
          setPosition((prev) => Number((prev - 0.01).toFixed(2)));
          console.log(position);
        }
      }
      setAngle(newAngle);
    },
  });

  const onSeekSliderValueChange = async (value) => {
    if (audio) {
      await audio.setPositionAsync(value);
      setPosition(value);
    }
  };

  const rotateStyle = {
    transform: [{ rotate: `${angle}deg` }],
  };

  return (
    <>
      <Animated.View {...panResponder.panHandlers} style={[styles.record, rotateStyle]}>
        {currentSong?.coverArtUri ? (
          <ImageBackground source={{ uri: currentSong?.coverArtUri }} style={{ flex: 1 }} />
        ) : (
          <View
            style={[
              {
                flex: 1,
                alignItems: 'center',
                padding: 10,
                justifyContent: 'center',
                backgroundColor: currentSong?.backupColor || 'black',
              },
            ]}>
            <Text style={styles.recordSongTitle}>{currentSong?.title.toUpperCase()}</Text>
          </View>
        )}
      </Animated.View>
    </>
  );

  //   let angle = (Math.atan2(y, x) * 180) / Math.PI;

  //   let xValue = dx * 2;
  //   const yValue = dy * 2;

  // If the touch position is below the center, invert xValue for rotation in the opposite direction
  //   console.log(xValue);
  //   console.log(yValue);
  //   return (
  //     <GestureHandlerRootView style={{ flex: 1 }}>
  //       <PanGestureHandler {...panResponder.panHandlers}>
  //         <Animated.View style={[styles.record, rotateStyle]}>
  //           {currentSong?.coverArtUri ? (
  //             <ImageBackground source={{ uri: currentSong?.coverArtUri }} style={{ flex: 1 }} />
  //           ) : (
  //             <View
  //               style={[
  //                 {
  //                   flex: 1,
  //                   alignItems: 'center',
  //                   padding: 10,
  //                   justifyContent: 'center',
  //                   backgroundColor: currentSong?.backupColor || 'black',
  //                 },
  //               ]}>
  //               <Text style={styles.recordSongTitle}>{currentSong?.title.toUpperCase()}</Text>
  //             </View>
  //           )}
  //         </Animated.View>
  //       </PanGestureHandler>
  //     </GestureHandlerRootView>
  //   );
};

export default SpinningRecord;

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: 'center',
    flex: 1,
    alignItems: 'center',
  },
  infoContainer: {
    padding: 10,
    zIndex: 10,
    position: 'absolute',
    top: 160,
    left: 10,
    borderRadius: 15,
  },
  songTitle: {
    fontSize: 14,
    color: 'white',
  },
  artistName: {
    fontSize: 12,
    color: '#777777',
  },
  outerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 725,
    aspectRatio: 1,
    borderRadius: 1000,
    borderColor: '#060606',
    borderWidth: 5,
  },
  middleCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 600,
    aspectRatio: 1,
    borderRadius: 1000,
    borderColor: '#060606',
    borderWidth: 5,
  },
  innerCircle: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    width: 475,
    aspectRatio: 1,
    borderRadius: 1000,
    borderColor: '#060606',
    borderWidth: 5,
  },
  record: {
    overflow: 'hidden',
    width: 350,
    height: 350,
    borderRadius: 1000,
    borderColor: 'white',
    borderWidth: 2,
  },

  playPauseButton: {
    padding: 8,
  },
  playbackButtonContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    height: 70,
    position: 'absolute',
    bottom: 90,
  },
  nextButton: { marginBottom: 20, marginLeft: 45, padding: 10 },
  prevButton: { marginBottom: 20, marginRight: 45, padding: 10 },
  shuffleButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    padding: 20,
    bottom: 0,
    right: 0,
  },
  addToPlaylistButton: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    padding: 20,
    bottom: 0,
    left: 0,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
  },
  recordSongTitle: {
    color: 'white',
    fontSize: 30,
    opacity: 0.3,
  },
  currentPlaylistName: {
    position: 'absolute',
    padding: 5,
    bottom: 0,
  },
});
