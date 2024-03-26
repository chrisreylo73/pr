import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useAppContext } from '~/services/AppContext';
import { Entypo } from '@expo/vector-icons';
import AddPlaylistModal from '~/components/AddPlaylistModal';
import UserPlaylist from '~/components/UserPlaylist';

const playlists = () => {
  const {
    currentSong,
    setCurrentSong,
    playState,
    setPlayState,
    isLoading,
    setIsLoading,
    songData,
    setSongData,
    artistNames,
    setArtistNames,
    playlistNames,
    setPlaylistNames,
    isPlayerVisible,
    setIsPlayerVisible,
  } = useAppContext();
  const [isModalVisable, setIsModalVisable] = useState(false);
  return (
    <View style={styles.container}>
      <FlatList
        contentContainerStyle={{ paddingBottom: 110, paddingTop: 10 }}
        data={playlistNames}
        renderItem={({ item }) => <UserPlaylist playlistName={item} />}
        keyExtractor={(item, index) => index.toString()}
        numColumns={2}
      />
      <TouchableOpacity style={styles.addButton} onPress={() => setIsModalVisable(!isModalVisable)}>
        <Entypo name="plus" size={24} color="black" />
      </TouchableOpacity>
      <AddPlaylistModal
        playlistNames={playlistNames}
        setPlaylistNames={setPlaylistNames}
        isModalVisable={isModalVisable}
        setIsModalVisable={setIsModalVisable}
      />
    </View>
  );
};

export default playlists;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#080808',
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 110,
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#101010',
  },
});
