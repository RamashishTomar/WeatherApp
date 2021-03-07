import React, { useEffect, useState, useRef } from "react";
import { Text, View } from "react-native";

const Home = (props) => {
  return (
    <View>
      <Loader loading={props.loading} />
    </View>
  );
};

export default Home;
