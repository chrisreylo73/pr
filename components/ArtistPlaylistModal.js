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
import Footer from "~/components/Footer";
import { AntDesign } from "@expo/vector-icons";

const ArtistPlaylistModal = ({
  isModalVisable,
  setIsModalVisable,
  playlistName,
}) => {
  const {
    currentSong,
    setCurrentSong,
    songData,
    artistNames,
    setArtistNames,
    isPlayerVisible,
    setIsPlayerVisible,
  } = useAppContext();

  const onClose = () => {
    Keyboard.dismiss();
    setTimeout(() => {}, 5000);
    setIsModalVisable(false);
  };

  return (
    <Modal
      style={styles.modal}
      isVisible={isModalVisable}
      animationIn="fadeInUp"
      animationOut="fadeOutDown"
      animationInTiming={400}
      animationOutTiming={300}
      coverScreen={true}
      hasBackdrop={true}
      backdropOpacity={1}
      backdropColor="#090909"
      useNativeDriver={true}
      onRequestClose={onClose}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setIsModalVisable(false)}
        >
          <AntDesign name="left" size={20} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{playlistName.toUpperCase()}</Text>
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 340, paddingTop: 30 }}
        data={songData.filter((song) => song.artist === playlistName)}
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
      <Footer />
    </Modal>
  );
};

export default ArtistPlaylistModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    margin: 0,
  },
  header: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 70,
    backgroundColor: "black",
    elevation: 10,
    borderBottomWidth: 2,
    borderColor: "#101010",
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    marginBottom: 5,
    alignSelf: "center",
    letterSpacing: 2,
    color: "white",
  },
  backButton: {
    position: "absolute",
    top: 0,
    left: 0,
    padding: 20,
  },
});
