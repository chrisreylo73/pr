import { StyleSheet, Text, TouchableHighlightBase, View } from 'react-native';
import React from 'react';
import { Navigator, usePathname, Slot, Link, Stack } from 'expo-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesome5 } from '@expo/vector-icons';

const _layout = () => {
  return (
    // <Stack>
    //   <Stack.Screen
    //     name="(tabs)"
    //     options={{
    //       // Hide the header for this route
    //       headerShown: false,

    //     }}
    //   />
    // </Stack>
    <>
      <Header />
      <Slot />
    </>
  );
};

export default _layout;

const styles = StyleSheet.create({});
