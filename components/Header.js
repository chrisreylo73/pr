import { SafeAreaView, StyleSheet, Text, TouchableOpacity } from 'react-native';
import React, { memo, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.title}>POCKET RECORDS</Text>
      <TouchableOpacity style={styles.moreButton}>
        <Feather name="more-vertical" size={15} color="white" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default memo(Header);

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: 'black',
    paddingTop: 10,
    // elevation: 10,
    // borderBottomWidth: 2,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    // marginBottom: 10,
    alignSelf: 'center',
    letterSpacing: 10,
    color: 'white',
    paddingHorizontal: 20,
  },
  moreButton: {
    position: 'absolute',
    right: 20,
    top: 0,
    // backgroundColor: 'red',
    padding: 10,
  },
});
