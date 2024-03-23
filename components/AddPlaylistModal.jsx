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
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import Modal from "react-native-modal";
import { Storage } from "expo-storage";

const AddPlaylistModal = ({
  isModalVisable,
  setIsModalVisable,
  setPlaylistNames,
  playlistNames,
}) => {
  const [playlistTitle, setPlaylistTitle] = useState("");

  const onChangeText = (inputText) => {
    setPlaylistTitle(inputText);
  };

  const createPlaylist = async () => {
    let allPlaylists = [...playlistNames, playlistTitle].sort();
    await Storage.setItem({
      key: "playlistNames",
      value: JSON.stringify(allPlaylists),
    });
    setPlaylistNames(allPlaylists);
    onClose();
  };
  const onClose = () => {
    Keyboard.dismiss();
    setTimeout(() => {}, 5000);
    setPlaylistTitle("");
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
      <View style={styles.addPlaylist}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={playlistTitle}
          placeholder="PLAYLIST TITLE"
          placeholderTextColor="#222222"
          caretHidden={true}
          autoCorrect={false}
          autoCapitalize="characters"
        ></TextInput>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={createPlaylist}
          >
            <Feather name="check" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
            <Feather name="x" size={30} color="white" />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default AddPlaylistModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  addPlaylist: {
    width: "98%",
    // aspectRatio: 1,
    backgroundColor: "#090909",
    borderRadius: 10,
    justifyContent: "flex-end",
    alignItems: "flex-start",
    // elevation: 8,
    borderColor: "#111111",
    borderWidth: 2,
  },
  input: {
    width: "90%",
    height: 60,
    borderBottomColor: "#222222",
    borderBottomWidth: 2,
    alignSelf: "center",
    textAlign: "center",
    fontSize: 30,
    color: "white",
  },
  cancelButton: {
    padding: 10,
  },
  createButton: {
    padding: 10,
  },
  buttonContainer: {
    padding: 8,
    flexDirection: "row",
  },
});
