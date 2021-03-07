import React from "react";
import { SafeAreaView, Text, StyleSheet, StatusBar } from "react-native";
import { Provider } from "react-redux";

import configureStore from "./src/redux/ConfigureStore";
import Home from "./src/Home";

const store = configureStore();

const App = () => {
  return (
    <>
      <StatusBar barStyle="dark-content" />
      <Provider store={store}>
        <SafeAreaView style={{ flex: 1 }}>
          <Home />
        </SafeAreaView>
      </Provider>
    </>
  );
};

const styles = StyleSheet.create({});

export default App;
