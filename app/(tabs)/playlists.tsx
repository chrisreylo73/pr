import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ViewToken,
} from 'react-native';
import React from 'react';
import Footer from '~/components/Footer';
import { Entypo } from '@expo/vector-icons';

const playlists = () => {
  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.addButton}>
        <Entypo name="plus" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default playlists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#090909',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 110,
    right: 10,
    width: 60,
    height: 60,
    backgroundColor: 'black',
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#101010',
  },
});
