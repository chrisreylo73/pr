import { StyleSheet, Text, TouchableHighlightBase, View } from 'react-native';
import React from 'react';
import { Stack, Tabs, Slot } from 'expo-router';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Header from '../components/Header';
import Footer from '../components/Footer';

const _layout = () => {
  //   const Stack = createStackNavigator();
  return (
    //  <NavigationContainer>
    // <Tabs
    //   screenOptions={{
    //     title: 'P  O  C  K  E  T       R  E  C  O  R  D  S',
    //     headerStyle: { backgroundColor: 'black' },
    //     headerTitleStyle: { fontWeight: 'bold', fontSize: 15, color: 'white' },
    //     headerTitleAlign: 'center',
    //   }}>
    //   <Stack.Screen name="(tabs)" options={{}} />
    // </Tabs>
    //  </NavigationContainer>
    <>
      <Header />
      <Slot />
      <Footer />
    </>
  );
};
// screenOptions={{
//   title: 'P  O  C  K  E  T       R  E  C  O  R  D  S',
//   headerStyle: { backgroundColor: 'black' },
//   headerTitleStyle: { fontWeight: 'bold', fontSize: 15, color: 'white' },
//   headerTitleAlign: 'center',
// }}>
export default _layout;

const styles = StyleSheet.create({});
