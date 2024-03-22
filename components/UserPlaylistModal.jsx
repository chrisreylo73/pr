import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  ViewToken,
  Keyboard,
} from "react-native";
import Modal from "react-native-modal";
import Song from "~/components/Song";
import { useAppContext } from "~/services/AppContext";

const UserPlaylistModal = ({
  isModalVisable,
  setIsModalVisable,
  playlistName,
}) => {
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
  const [filteredSongData, setFilteredSongData] = useState();
  const filterSongData = () => {};
  const onClose = () => {
    Keyboard.dismiss();
    setTimeout(() => {}, 5000);
    setIsModalVisable(false);
  };
  return (
    <Modal
      style={styles.modal}
      isVisible={isModalVisable}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={300}
      animationOutTiming={300}
      coverScreen={true}
      hasBackdrop={true}
      backdropOpacity={0.95}
      backdropColor="black"
      useNativeDriver={true}
      onRequestClose={onClose}
    >
      <FlatList
        contentContainerStyle={{ paddingBottom: 340, paddingTop: 30 }}
        data={filteredSongData}
        renderItem={({ item }) => (
          <Song
            item={item}
            setCurrentSong={setCurrentSong}
            currentSong={currentSong}
            setIsPlayerVisible={setIsPlayerVisible}
            isPlayerVisible={isPlayerVisible}
          />
        )}
        keyExtractor={(item) => item.uri}
      />
    </Modal>
  );
};

export default UserPlaylistModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
