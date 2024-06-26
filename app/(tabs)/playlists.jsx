import { StyleSheet, View, FlatList, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { useAppContext } from '~/services/AppContext';
import { Entypo } from '@expo/vector-icons';
import AddPlaylistModal from '~/components/AddPlaylistModal';
import UserPlaylist from '~/components/UserPlaylist';
import { LinearGradient } from 'expo-linear-gradient';

const playlists = () => {
  const { playlistNames, setPlaylistNames } = useAppContext();
  const [isModalVisable, setIsModalVisable] = useState(false);

  const renderItem = ({ item }) => <UserPlaylist playlistName={item} />;

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#000000', '#111111', '#000000']} style={styles.gradient}>
        <FlatList
          data={playlistNames}
          renderItem={renderItem}
          keyExtractor={(index) => index.toString()}
          initialNumToRender={6}
          maxToRenderPerBatch={6}
          windowSize={6}
          contentContainerStyle={{ paddingBottom: 110, paddingTop: 10 }}
          numColumns={2}
        />
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => setIsModalVisable(!isModalVisable)}>
          <Entypo name="plus" size={24} color="black" />
        </TouchableOpacity>
        <AddPlaylistModal
          playlistNames={playlistNames}
          setPlaylistNames={setPlaylistNames}
          isModalVisable={isModalVisable}
          setIsModalVisable={setIsModalVisable}
        />
      </LinearGradient>
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
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    padding: 10,
  },
  addButton: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 80,
    right: 10,
    width: 50,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#101010',
  },
});
