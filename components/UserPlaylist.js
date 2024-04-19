import { useState, useEffect } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import UserPlaylistModal from '~/components/UserPlaylistModal';
import UserPlaylistActionsModal from '~/components/UserPlaylistActionsModal';
import { useAppContext } from '~/services/AppContext';

const UserPlaylist = ({ playlistName }) => {
  const { currentPlaylist } = useAppContext();
  const [isUserPlaylistModalVisable, setIsUserPlaylistModalVisable] = useState(false);
  const [isUserPlaylistActionsModalVisable, setIsUserPlaylistActionsModalVisable] = useState(false);
  return (
    <>
      <TouchableOpacity
        style={styles.container}
        onPress={() => setIsUserPlaylistModalVisable(true)}
        onLongPress={() => setIsUserPlaylistActionsModalVisable(true)}>
        <Text style={{ color: currentPlaylist?.name === playlistName ? '#FFA500' : '#FFFFFF' }}>
          {playlistName?.toUpperCase()}
        </Text>
      </TouchableOpacity>
      <UserPlaylistModal
        isModalVisable={isUserPlaylistModalVisable}
        setIsModalVisable={setIsUserPlaylistModalVisable}
        playlistName={playlistName}
      />
      <UserPlaylistActionsModal
        isModalVisable={isUserPlaylistActionsModalVisable}
        setIsModalVisable={setIsUserPlaylistActionsModalVisable}
        playlistName={playlistName}
      />
    </>
  );
};

export default UserPlaylist;

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
  title: {
    color: 'white',
  },
});
