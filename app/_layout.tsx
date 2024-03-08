import { StyleSheet, Text, TouchableHighlightBase, View } from 'react-native';
import React from 'react';
import { Navigator, usePathname, Slot, Link, Stack } from 'expo-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Player from '../components/Player';
import { FontAwesome5 } from '@expo/vector-icons';
import { AppProvider } from '../services/AppContext';
import * as NavigationBar from 'expo-navigation-bar';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';

const _layout = () => {
  return (
    <AppProvider>
      {/* <SafeAreaView> */}
      <StatusBar hidden />
      <Header />
      <Slot />
      <Footer />
      <Player />
      {/* </SafeAreaView> */}
    </AppProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
