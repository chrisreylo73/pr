import { useState, useEffect, useCallback, memo } from 'react';
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
import { Feather } from '@expo/vector-icons';

const ColorSellectModal = ({
  isColorModalVisable,
  setIsColorModalVisable,
  backupColor,
  setBackupColor,
}) => {
  const { backupColors } = useAppContext();

  const onClose = useCallback(() => {
    setIsColorModalVisable(false);
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={[
        styles.colorItem,
        { backgroundColor: item, borderColor: backupColor === item ? 'white' : 'transparent' },
      ]}
      item={item}
    />
  );

  return (
    <Modal
      style={styles.modal}
      isVisible={isColorModalVisable}
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
      <FlatList
        data={backupColors}
        renderItem={renderItem}
        keyExtractor={(index) => index.toString()}
        initialNumToRender={6}
        maxToRenderPerBatch={6}
        windowSize={6}
        numColumns={5}
        contentContainerStyle={styles.flatListContent}
      />
    </Modal>
  );
};

export default ColorSellectModal;

const styles = StyleSheet.create({
  modal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  colorItem: {
    borderRadius: 10,
    borderWidth: 2,
    margin: 5,
    width: 50,
    height: 50,
  },
});
