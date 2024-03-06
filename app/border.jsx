import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Navigator, usePathname, Slot, Link, Stack } from 'expo-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const border = () => {
  //   const navigation = useNavigation();

  //   React.useEffect(() => {
  //     navigation.setOptions({ headerShown: false });
  //   }, [navigation]);

  return (
    //  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <>
      <Header />
      <Slot />
      {/* <Footer /> */}
    </>
  );
};

export default border;

const styles = StyleSheet.create({});
