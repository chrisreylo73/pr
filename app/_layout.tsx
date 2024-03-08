import { StyleSheet, Text, TouchableHighlightBase, View } from 'react-native';
import React from 'react';
import { Navigator, usePathname, Slot, Link, Stack } from 'expo-router';
import Header from '../components/Header';
import Footer from '../components/Footer';
import AltFooter from '../components/AltFooter';
import { FontAwesome5 } from '@expo/vector-icons';
import { AppProvider } from '../services/AppContext';

const _layout = () => {
  return (
    <AppProvider>
      <Header />
      <Slot />
      <Footer />
    </AppProvider>
  );
};

export default _layout;

const styles = StyleSheet.create({});
