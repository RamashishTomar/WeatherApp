import React, { useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";

export default ErrorView = ({ callback }) => {
  return (
    <View style={style.errView}>
      <Text style={style.errText}>Something Went Wrong at our End.</Text>
      <TouchableOpacity
        style={style.button}
        onPress={() => {
          callback();
        }}
      >
        <Text>Retry</Text>
      </TouchableOpacity>
    </View>
  );
};

const style = StyleSheet.create({
  errView: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    margin: 10,
  },
  errText: {
    textAlign: "center",
    fontSize: 25,
    fontWeight: "bold",
  },
  button: {
    borderWidth: 1,
    borderColor: "red",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
  },
});
