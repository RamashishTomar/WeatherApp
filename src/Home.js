import React from "react";
import { connect } from "react-redux";
import { View } from "react-native";

import Loader from "./components/Loader";
const Home = (props) => {
  return (
    <View>
      <Loader loading={true} />
    </View>
  );
};

export default Home;
