import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { Entypo } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const AltFooter = () => {
  const router = useRouter();

  return (
    <View style={styles.footer}>
      <TouchableOpacity style={styles.openPlayerButton} onPress={() => router.push('player')}>
        <Entypo name="chevron-up" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default AltFooter;
const styles = StyleSheet.create({
  footer: {
    flexDirection: 'column',
    position: 'absolute',
    alignItems: 'center',
    // justifyContent: "space-between",
    left: 0,
    right: 0,
    zIndex: 10,
    bottom: 0,
    height: 60,
    elevation: 8,
    backgroundColor: 'black',
    borderTopWidth: 2,
    borderColor: '#111111',
  },

  openPlayerButton: {
    padding: 10,
  },
  //   playback: {
  //     flexDirection: 'row',
  //     // position: "absolute",
  //     alignItems: 'center',
  //     justifyContent: 'space-between',
  //     // left: 0,
  //     // right: 0,
  //     // zIndex: 10,
  //     // bottom: 0,
  //     height: 80,
  //     // elevation: 8,
  //     // backgroundColor: "blue",
  //     // borderTopWidth: 2,
  //     // borderColor: "#101010",
  //   },
  //   currentRouteContainer: {
  //     flexDirection: 'row',
  //     alignItems: 'center',
  //     justifyContent: 'space-evenly',
  //     width: '60%',
  //   },
  //   routeContainer: {
  //     // backgroundColor: "blue",
  //     width: 30,
  //     height: 30,
  //     alignItems: 'center',
  //     justifyContent: 'center',
  //   },
  //   route: {
  //     // color: "white",
  //     // backgroundColor: "white",
  //     width: 8,
  //     aspectRatio: 1,
  //     borderRadius: 100,
  //     borderColor: 'white',
  //     borderWidth: 1,
  //   },
  //   router: {
  //     padding: 5,
  //     alignItems: 'center',
  //     // backgroundColor: "blue",
  //     height: 50,
  //     width: '100%',
  //   },
  //   songInfoContainer: {
  //     width: '80%',
  //     // backgroundColor: "red",
  //     padding: 8,
  //   },
  //   songTitle: {
  //     fontSize: 14,
  //     color: 'white',
  //   },
  //   artistName: {
  //     fontSize: 12,
  //     color: '#777777',
  //   },
  //   playPauseButton: {
  //     padding: 20,
  //     // backgroundColor: "blue",
  //   },
  //   routeTitle: {
  //     color: 'white',
  //     fontSize: 12,
  //   },
});
