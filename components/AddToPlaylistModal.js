import { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ImageBackground,
  Keyboard,
  FlatList,
} from 'react-native';
import Modal from 'react-native-modal';
import { useAppContext } from '~/services/AppContext';
import { Storage } from 'expo-storage';
import { AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { Feather } from '@expo/vector-icons';
import playlists from '~/app/(tabs)/playlists';

const AddToPlaylistModal = ({
  isAddToPlaylistVisable,
  setIsAddToPlaylistVisable,
  currentSong,
  setCurrentSong,
  playlistNames,
  songData,
  setSongData,
}) => {
  const [inPlaylist, setInPlaylist] = useState([]);

  useEffect(() => {
    console.log(currentSong.playListNames);
    setInPlaylist([...currentSong.playListNames]);
  }, [currentSong]);

  const handlePress = (item) => {
    setInPlaylist((prevInPlaylist) => {
      if (prevInPlaylist.includes(item)) {
        // If the item is already in the playlist, remove it
        return prevInPlaylist.filter((playlistItem) => playlistItem !== item);
      } else {
        // If the item is not in the playlist, add it
        return [...prevInPlaylist, item];
      }
    });
    console.log(inPlaylist);
  };

  const handleSave = async () => {
    const songs = [...songData];
    console.log(inPlaylist);
    const updatedSongData = songs
      .map((song) =>
        song.uri === currentSong?.uri
          ? {
              ...currentSong,
              playListNames: inPlaylist,
            }
          : song
      )
      .sort((a, b) => a.title.localeCompare(b.title));

    await Storage.setItem({
      key: 'songData',
      value: JSON.stringify(updatedSongData),
    });
    setCurrentSong({ ...currentSong, playListNames: inPlaylist });
    setSongData(updatedSongData);
    setIsAddToPlaylistVisable(false);
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={isAddToPlaylistVisable}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationInTiming={300}
      animationOutTiming={300}
      coverScreen={true}
      hasBackdrop={true}
      backdropOpacity={1}
      backdropColor="#080808"
      useNativeDriver={true}
      onRequestClose={() => setIsAddToPlaylistVisable(false)}>
      <FlatList
        data={playlistNames}
        renderItem={({ item }) => (
          <TouchableOpacity style={[styles.itemContainer]} onPress={() => handlePress(item)}>
            <Text style={[styles.title]}>{item.toUpperCase()}</Text>
            {inPlaylist.includes(item) && (
              <View style={styles.itemIcon}>
                <Feather name="check" size={20} color="black" />
              </View>
            )}
          </TouchableOpacity>
        )}
        keyExtractor={(index) => index.toString()}
        contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}
      />
      <TouchableOpacity style={styles.backButton} onPress={() => setIsAddToPlaylistVisable(false)}>
        <AntDesign name="left" size={20} color="white" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text>SAVE</Text>
      </TouchableOpacity>
    </Modal>
  );
};

export default AddToPlaylistModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // marginBottom: 0,
    // marginHorizontal: 0,
    margin: 0,
  },
  gradient: {
    width: '100%',
    height: '100%',
    position: 'absolute',
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemContainer: {
    backgroundColor: 'black',
    width: 350,
    margin: 5,
    height: 60,
    borderRadius: 10,
    borderColor: '#111111',
    borderWidth: 1,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: 'white',
  },
  itemIcon: {
    position: 'absolute',
    borderRadius: 20,
    right: 15,
    backgroundColor: 'white',
    padding: 2,
  },
  backButton: {
    position: 'absolute',
    top: 0,
    left: 0,
    padding: 20,
  },
  saveButton: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 10,
    position: 'absolute',
    bottom: 30,
    padding: 10,
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
