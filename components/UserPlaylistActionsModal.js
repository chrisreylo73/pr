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
import Song from "~/components/Song";
import { useAppContext } from "~/services/AppContext";
import Footer from "~/components/Footer";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import { Storage } from "expo-storage";
const UserPlaylistActionsModal = ({
  isModalVisable,
  setIsModalVisable,
  playlistName,
}) => {
  const { playlistNames, setPlaylistNames } = useAppContext();
  const [playlistTitle, setPlaylistTitle] = useState(playlistName);

  useEffect(() => {
    setPlaylistTitle(playlistName);
  }, []);

  const onChangeText = (inputText) => {
    setPlaylistTitle(inputText);
  };
  const updatePlaylist = async () => {
    let allPlaylists = playlistNames.filter((name) => name !== playlistName);
    allPlaylists = [...allPlaylists, playlistTitle].sort();
    await Storage.setItem({
      key: "playlistNames",
      value: JSON.stringify(allPlaylists),
    });
    setPlaylistNames(allPlaylists);

    Keyboard.dismiss();
    setTimeout(() => {}, 5000);
    setIsModalVisable(false);
  };

  const deletePlaylist = async () => {
    const allPlaylists = playlistNames.filter((name) => name !== playlistName);
    await Storage.setItem({
      key: "playlistNames",
      value: JSON.stringify(allPlaylists),
    });
    setPlaylistNames(allPlaylists);
    // onClose();
    Keyboard.dismiss();
    setTimeout(() => {}, 5000);
    setIsModalVisable(false);
  };

  const onCancel = () => {
    Keyboard.dismiss();
    setTimeout(() => {}, 5000);
    setPlaylistTitle(playlistName);
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
      onRequestClose={onCancel}
    >
      <View style={styles.addPlaylist}>
        <TextInput
          style={styles.input}
          onChangeText={onChangeText}
          value={playlistTitle}
          placeholder="PLAYLIST TITLE"
          placeholderTextColor="#222222"
          caretHidden={false}
          autoCorrect={false}
          autoCapitalize="characters"
        ></TextInput>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.createButton}
            onPress={updatePlaylist}
          >
            <Feather name="check" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.cancelButton} onPress={onCancel}>
            <Feather name="x" size={30} color="white" />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={deletePlaylist}
          >
            <MaterialCommunityIcons
              name="delete-empty-outline"
              size={30}
              color="white"
            />
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default UserPlaylistActionsModal;

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
  deleteButton: {
    padding: 10,
    left: 160,
    justifyContent: "space-between",
  },
  buttonContainer: {
    padding: 8,
    width: "100%",
    flexDirection: "row",
  },
});
