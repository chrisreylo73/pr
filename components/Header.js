import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React, { memo, useCallback } from 'react';
import { Feather } from '@expo/vector-icons';
import { useAppContext } from '~/services/AppContext';

const Header = () => {
  const { setIsDownloadModalVisable } = useAppContext();

  return (
    <View style={styles.header}>
      <Text style={styles.title}>POCKET RECORDS</Text>
      <TouchableOpacity style={styles.moreButton} onPress={() => setIsDownloadModalVisable(true)}>
        <Feather name="more-vertical" size={15} color="white" />
      </TouchableOpacity>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  header: {
    alignSelf: 'center',
    width: '100%',
    backgroundColor: 'black',
    paddingTop: 10,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    alignSelf: 'center',
    letterSpacing: 10,
    color: 'white',
    paddingHorizontal: 20,
  },
  moreButton: {
    position: 'absolute',
    right: 20,
    top: 0,
    padding: 10,
  },
});
