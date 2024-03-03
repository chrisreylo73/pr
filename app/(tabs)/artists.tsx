import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const Artists = () => {
  return (
    <View style={styles.container}>
      <Text>Artists</Text>
    </View>
  );
};

export default Artists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
