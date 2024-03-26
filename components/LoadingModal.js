import { StyleSheet, Text, View } from "react-native";
import React from "react";
import Modal from "react-native-modal";
import { useAppContext } from "~/services/AppContext";
import { BarIndicator } from "react-native-indicators";

const LoadingModal = () => {
  const { isLoading } = useAppContext();

  return (
    <Modal
      style={styles.loadingContainer}
      isVisible={isLoading}
      animationIn="fadeIn"
      animationOut="fadeOut"
      animationInTiming={400}
      animationOutTiming={300}
      coverScreen={true}
      hasBackdrop={true}
      backdropOpacity={1}
      backdropColor="#090909"
      useNativeDriver={true}
    >
      <BarIndicator color="white" />
      {/* <Text style={{ color: "white", position: "absolute", top: "55%" }}>
        Loading...
      </Text> */}
    </Modal>
  );
};

export default LoadingModal;

const styles = StyleSheet.create({
  loadingContainer: {
    margin: 0,
    zIndex: 10,
    alignSelf: "center",
    alignItems: "center",
    justifyContent: "center",
  },
});
