import { StyleSheet, Text, TouchableHighlightBase, View } from 'react-native';
import React from 'react';
import { Stack, Tabs, Slot } from 'expo-router';
import Header from '../components/Header';
import Footer from '../components/Footer';

const _layout = () => {
  return (
    <>
      <Header />
      <Slot />
      <Footer />
    </>
  );
};

export default _layout;

const styles = StyleSheet.create({});
