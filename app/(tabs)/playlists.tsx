import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const playlists = () => {
  return (
    <View style={styles.container}>
      <Text>playlists</Text>
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
});
