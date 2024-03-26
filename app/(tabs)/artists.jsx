import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { useAppContext } from '~/services/AppContext';
import ArtistPlaylist from '~/components/ArtistPlaylist';
const artists = () => {
  const { artistNames } = useAppContext();

  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 110, paddingTop: 10 }}
        data={artistNames}
        extraData={artistNames}
        renderItem={({ item, index }) => <ArtistPlaylist playlistName={item} index={index} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
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
});
