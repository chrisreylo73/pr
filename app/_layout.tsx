import { StyleSheet, Text, TouchableHighlightBase, View } from 'react-native';
import { Navigator, usePathname, Slot, Link, Stack } from 'expo-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Player from '../components/Player';
import { AppProvider } from '../services/AppContext';
import { StatusBar } from 'expo-status-bar';

const _layout = () => {
  return (
    <AppProvider>
      <StatusBar hidden />
      <Header />
      <Slot />
      <Footer />
      <Player />
    </AppProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
