import { SafeAreaView, StyleSheet, Text } from 'react-native';
import React, { memo, useCallback } from 'react';

const Header = () => {
  return (
    <SafeAreaView style={styles.header}>
      <Text style={styles.title}>POCKET RECORDS</Text>
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
});
