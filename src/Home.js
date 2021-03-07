import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import { Text, View } from "react-native";

import { searchByCoordinates } from "./redux/Actions";
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
          props.searchByCoordinates({ lat, lng });
        });
      })
      .catch(() => {});
  };

  return (
    <View>
      <Loader loading={props.isloading} />
      <Text>{JSON.stringify(props.forecast)}</Text>
      <Text>{props.iserror}</Text>
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    isloading: state.weather.loading,
    iserror: state.weather.error,
    current: state.weather.current,
    forecast: state.weather.forecast,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchByCoordinates: (data) => searchByCoordinates(data, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
