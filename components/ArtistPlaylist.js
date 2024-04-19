import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import ArtistPlaylistModal from '~/components/ArtistPlaylistModal';
import { useAppContext } from '~/services/AppContext';
const ArtistPlaylist = ({ playlistName }) => {
  const { currentPlaylist } = useAppContext();
  const [isModalVisable, setIsModalVisable] = useState(false);

  return (
    <>
      <TouchableOpacity style={styles.container} onPress={() => setIsModalVisable(true)}>
        <Text style={{ color: currentPlaylist?.name === playlistName ? '#FFA500' : '#FFFFFF' }}>
          {playlistName?.toUpperCase()}
        </Text>
      </TouchableOpacity>
      <ArtistPlaylistModal
        isModalVisable={isModalVisable}
        setIsModalVisable={setIsModalVisable}
        playlistName={playlistName}
      />
    </>
  );
};

export default ArtistPlaylist;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'black',
    width: 170,
    padding: 8,
    margin: 6,
    aspectRatio: 1,
    borderRadius: 15,
    elevation: 8,
    borderColor: '#111111',
    borderWidth: 2,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
