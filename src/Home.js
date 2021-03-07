import React, { useEffect } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";

import Loader from "./components/Loader";
import Location from "./utils/Location";
const Home = (props) => {
  useEffect(() => {
    getForecast();
  }, [0]);

  const getForecast = () => {
    Location.checkAndRequest()
      .then(() => {
        Location.getLocation().then(({ lat, lng }) => {
          console.log(lat, lng);
        });
      })
      .catch(() => {});
  };

  return (
    <View>
      <Loader loading={true} />
    </View>
  );
};

export default Home;
