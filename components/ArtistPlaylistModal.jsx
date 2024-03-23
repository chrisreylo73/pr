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

  useEffect(() => {
    filterSongData();
  }, []);

  const filterSongData = () => {
    const filtered = songData.filter((song) => song.artist === playlistName);
    setFilteredSongData(filtered);
  };

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
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => setIsModalVisable(false)}
        >
          <AntDesign name="left" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.title}>{playlistName.toUpperCase()}</Text>
      </View>
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
    //top: 30,
    alignItems: "center",

    width: "100%",
    height: 85,
    //  position: 'absolute',
    //  zIndex: 2,
    //backgroundColor: "#0D0D0D",
    backgroundColor: "black",
    paddingTop: 10,
    elevation: 10,
    borderBottomWidth: 2,
    // borderColor: "black",
    borderColor: "#101010",
    // alignItems: "center",
    // paddingBottom: 10,
  },
  title: {
    fontSize: 15,
    fontWeight: "bold",
    // marginBottom: 10,
    // color: "#CCCCCC", // Light color scheme
    alignSelf: "center",
    letterSpacing: 2,
    color: "white",
    paddingHorizontal: 20,
  },
  backButton: {
    position: "absolute",
    top: 15,
    left: 0,
    padding: 20,
  },
});
