import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useAppContext } from '~/services/AppContext';
import ArtistPlaylist from '~/components/ArtistPlaylist';
import { LinearGradient } from 'expo-linear-gradient';

const artists = () => {
  const { artistNames } = useAppContext();

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000000', '#111111', '#000000']} style={styles.gradient}>
        <FlatList
          contentContainerStyle={{ paddingBottom: 110, paddingTop: 10 }}
          data={artistNames}
          extraData={artistNames}
          renderItem={({ item, index }) => <ArtistPlaylist playlistName={item} index={index} />}
          keyExtractor={(index) => index.toString()}
          numColumns={2}
        />
      </LinearGradient>
    </View>
  );
};

export default artists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#080808',
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
  },
});
