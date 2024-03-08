import { StyleSheet, Text, TouchableHighlightBase, View } from 'react-native';
import React from 'react';
import { Navigator, usePathname, Slot, Link, Stack } from 'expo-router';

const _layout = () => {
  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="player" options={{ presentation: 'modal' }} />
    </Stack>
  );
};

export default _layout;

const styles = StyleSheet.create({});
