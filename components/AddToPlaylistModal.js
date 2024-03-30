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
} from 'react-native';
import Modal from 'react-native-modal';
import { useAppContext } from '~/services/AppContext';
import { Storage } from 'expo-storage';
import { Feather } from '@expo/vector-icons';

const AddToPlaylistModal = () => {
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
      backdropOpacity={1}
      backdropColor="#080808"
      useNativeDriver={true}
      onRequestClose={onClose}>
      <Text>AddToPlaylistModal</Text>
    </Modal>
  );
};

export default AddToPlaylistModal;

const styles = StyleSheet.create({});
