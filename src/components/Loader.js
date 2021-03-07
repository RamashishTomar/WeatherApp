import React from "react";
import {
  ActivityIndicator,
  StyleSheet,
  View,
  Dimensions,
  Modal,
} from "react-native";
import LottieView from "lottie-react-native";

const { height, width } = Dimensions.get("window");

export default Loader = (props) => {
  return props.loading ? (
    <Modal transparent={true} visible={props.loading}>
      <View style={styles.loader}>
        <LottieView
          source={require("../utils/226_splashy_loader.json")}
          autoPlay
          loop
        />
      </View>
    </Modal>
  ) : null;
};

const styles = StyleSheet.create({
  loader: {
    backgroundColor: "rgba(245,245,245,0.7)",
    height,
    width,
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignSelf: "center",
    justifyContent: "center",
  },
});
