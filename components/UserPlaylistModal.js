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

const UserPlaylistModal = ({
  isModalVisable,
  setIsModalVisable,
  playlistName,
}) => {
  const {
    currentSong,
    setCurrentSong,
    songData,
    setSongData,
    artistNames,
    setArtistNames,
    playlistNames,
    setPlaylistNames,
    isPlayerVisible,
    setIsPlayerVisible,
  } = useAppContext();

  // const [filteredSongData, setFilteredSongData] = useState();

  // useEffect(() => {
  //   filterSongData();
  // }, []);

  // const filterSongData = () => {};

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
      // statusBarTranslucent={true}
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
        data={songData.filter((song) =>
          song.playListNames.includes(playlistName)
        )}
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

export default UserPlaylistModal;

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
    height: 70,
    //  position: 'absolute',
    //  zIndex: 2,
    //backgroundColor: "#0D0D0D",
    backgroundColor: "black",
    // paddingTop: 10,
    elevation: 10,
    borderBottomWidth: 2,
    // borderColor: "black",
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