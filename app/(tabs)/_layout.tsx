import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { ParamListBase, TabNavigationState } from '@react-navigation/native';

import {
  createMaterialTopTabNavigator,
  MaterialTopTabNavigationOptions,
  MaterialTopTabNavigationEventMap,
} from '@react-navigation/material-top-tabs';
import { withLayoutContext, usePathname, Slot, Link, Stack, Tabs } from 'expo-router';

const { Navigator } = createMaterialTopTabNavigator();

export const MaterialTopTabs = withLayoutContext<
  MaterialTopTabNavigationOptions,
  typeof Navigator,
  TabNavigationState<ParamListBase>,
  MaterialTopTabNavigationEventMap
>(Navigator);

const Layout = () => {
  return (
    <MaterialTopTabs
      screenOptions={{
        tabBarStyle: {
          backgroundColor: 'black',
          height: 50,
          borderBottomColor: '#101010',
          borderWidth: 2,
        },
        tabBarActiveTintColor: '#555555',
        tabBarInactiveTintColor: 'black',
        tabBarIndicatorStyle: { backgroundColor: 'white' },
      }}>
      <MaterialTopTabs.Screen name="add" options={{ title: 'Add' }} />
      <MaterialTopTabs.Screen name="index" options={{ title: 'SONGS' }} />
      <MaterialTopTabs.Screen name="playlists" options={{ title: 'Playlists' }} />
    </MaterialTopTabs>
  );
};

export default Layout;
