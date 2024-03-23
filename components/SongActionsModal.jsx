import { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
  TextInput,
  Alert,
  Dimensions,
  PanResponder,
  Animated,
  ImageBackground,
  Keyboard,
} from "react-native";
import Modal from "react-native-modal";
import { useAppContext } from "~/services/AppContext";
import Footer from "~/components/Footer";
import { AntDesign } from "@expo/vector-icons";
import { Storage } from "expo-storage";
import { Hoshi } from "react-native-textinput-effects";

const SongActionsModal = ({ isModalVisable, setIsModalVisable, item }) => {
  const [songTitle, setSongTitle] = useState(item.title);
  const [artistName, setArtistName] = useState(item.artist);
  const [albumName, setAlbumName] = useState(item.album);
  const onClose = () => {
    Keyboard.dismiss();
    setTimeout(() => {}, 5000);
    setIsModalVisable(false);
  };

  const onChangeText = (inputText) => {
    console.log("Something");
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
      backdropOpacity={0.95}
      backdropColor="black"
      useNativeDriver={true}
      statusBarTranslucent={true}
      onRequestClose={onClose}
    >
      <Text style={styles.inputHeader}>SONG TITLE</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={songTitle}
        caretHidden={true}
        autoCorrect={false}
        autoCapitalize="characters"
      ></TextInput>
      <Text style={styles.inputHeader}>ARTIST NAME</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={artistName}
        caretHidden={true}
        autoCorrect={false}
        autoCapitalize="characters"
      ></TextInput>
      <Text style={styles.inputHeader}>ALBUM NAME</Text>
      <TextInput
        style={styles.input}
        onChangeText={onChangeText}
        value={albumName}
        caretHidden={true}
        autoCorrect={false}
        autoCapitalize="characters"
      ></TextInput>
      <View style={styles.coverContainer}>
        <View style={{ width: "50%" }}>
          <Text style={styles.inputHeader}>BACKUP COLOR</Text>
          <TouchableOpacity
            style={[styles.backupColor, { backgroundColor: item.backupColor }]}
          ></TouchableOpacity>
        </View>
        <View style={{ width: "50%" }}>
          <Text style={styles.inputHeader}>COVER ART</Text>
          <TouchableOpacity
            style={[styles.backupColor, { overflow: "hidden" }]}
          >
            <ImageBackground
              source={{ uri: item.coverArtUri }}
              style={[styles.albumArtContainer, { backgroundColor: "black" }]}
            ></ImageBackground>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default SongActionsModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputHeader: {
    marginTop: 15,
    width: "90%",
    color: "#333333",
  },
  input: {
    width: "90%",
    height: 40,
    borderBottomColor: "#333333",
    borderBottomWidth: 2,
    // alignSelf: "center",
    textAlign: "auto",
    fontSize: 15,
    color: "white",
    paddingHorizontal: 10,
  },
  coverContainer: {
    flexDirection: "row",
    width: "90%",
    justifyContent: "space-evenly",
    marginTop: 10,
  },
  backupColor: {
    marginTop: 10,
    height: 120,
    aspectRatio: 1,
    borderColor: "#333333",
    borderWidth: 2,
    borderRadius: 20,
  },
  albumArtContainer: {
    flex: 1,
    height: "100%",
    backgroundColor: "white",
    borderColor: "black",
    borderRadius: 10,
  },
});
