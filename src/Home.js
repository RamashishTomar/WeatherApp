import React, { useEffect, useState, useRef } from "react";
import { connect } from "react-redux";
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from "react-native";

import { searchByCoordinates, setError } from "./redux/Actions";
import Loader from "./components/Loader";
import Location from "./utils/Location";
import { timeConverter } from "./utils/time";
import ErrorView from "./components/ErrorView";
import { View as MotiView, AnimatePresence, useAnimationState } from "moti";
const Home = (props) => {
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    getForecast();
  }, [0]);

  const getForecast = () => {
    Location.checkAndRequest()
      .then(
        () => {
          Location.getLocation().then(({ lat, lng }) => {
            props.searchByCoordinates({ lat, lng });
          });
        },
        () => {
          props.setError("Location Permission Denied");
        }
      )
      .catch(() => {});
  };
  getToday = (unixTimestamp) => {
    var date = timeConverter(unixTimestamp);
    return `${date.day} ${date.date} ${date.month} ${date.year}`;
  };
  const empty = () => {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No forecast Data Available</Text>
        <TouchableOpacity style={style.button} onPress={getForecast}>
          <Text>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  };
  const item = ({ item, index }) => {
    var date = timeConverter(item.dt);
    var sunRise = timeConverter(item.sunrise);
    var sunSet = timeConverter(item.sunset);
    return (
      <AnimatePresence>
        <View>
          <TouchableOpacity
            style={style.card}
            onPress={() => {
              selected == index ? setSelected(null) : setSelected(index);
            }}
          >
            <View style={style.main}>
              <Text style={style.heading}>
                {date.day} {date.date} {date.month} {date.year}
              </Text>

              <View>
                <Image
                  style={{ height: 70, width: 70, resizeMode: "contain" }}
                  source={{
                    uri: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`,
                  }}
                />
                <Text style={style.otherText}>
                  {item.weather[0].description}
                </Text>
              </View>
            </View>

            {selected == index && (
              <MotiView
                from={
                  selected == index
                    ? { height: 0, scale: 0.5 }
                    : { height: 200, scale: 1 }
                }
                animate={
                  selected == index
                    ? { height: 200, scale: 1 }
                    : { height: 0, scale: 0.5 }
                }
                transition={{
                  type: "timing",
                  duration: 350,
                }}
              >
                <View style={[style.dataRow, { marginVertical: 5 }]}>
                  <Text style={style.otherText}>
                    Sun rise: {sunRise.hour}:
                    {`${sunRise.min}`.length === 1
                      ? 0 + `${sunRise.min}`
                      : sunRise.min}
                  </Text>
                  <Text style={style.otherText}>
                    Sun set: {sunSet.hour}:{sunSet.min}
                  </Text>
                </View>
                <View style={[style.dataRow, { marginVertical: 5 }]}>
                  <Text style={style.dataCol}>
                    Pressure: {item.pressure} hPa
                  </Text>
                  <Text style={style.dataCol}>
                    Precipitation probability: {item.pop}{" "}
                  </Text>
                </View>
                <View style={[style.dataRow, { marginVertical: 5 }]}>
                  <Text style={style.dataCol}>UV index: {item.uvi}</Text>
                  <Text style={style.dataCol}>
                    Wind Speed: {item.wind_speed} m/s
                  </Text>
                </View>
                <View style={style.dataRow}>
                  <Text style={style.dataCol}>{""}</Text>
                  <Text style={style.dataCol}>Morning</Text>
                  <Text style={style.dataCol}>Day</Text>
                  <Text style={style.dataCol}>Evening</Text>
                  <Text style={style.dataCol}>Night</Text>
                </View>
                <View style={style.dataRow}>
                  <Text style={style.dataCol}>Temp.</Text>
                  <Text style={style.dataCol}>{item.temp.morn} °C</Text>
                  <Text style={style.dataCol}>{item.temp.day} °C</Text>
                  <Text style={style.dataCol}>{item.temp.eve} °C</Text>
                  <Text style={style.dataCol}>{item.temp.night} °C</Text>
                </View>
                <View style={style.dataRow}>
                  <Text style={style.dataCol}>Feels Like</Text>
                  <Text style={style.dataCol}>{item.feels_like.morn} °C</Text>
                  <Text style={style.dataCol}>{item.feels_like.day} °C</Text>
                  <Text style={style.dataCol}>{item.feels_like.eve} °C</Text>
                  <Text style={style.dataCol}>{item.feels_like.night} °C</Text>
                </View>
              </MotiView>
            )}
          </TouchableOpacity>
        </View>
      </AnimatePresence>
    );
  };
  const CurrentWeather = (current) => {
    return (
      <AnimatePresence>
        {current["weather"] && (
          <MotiView
            style={style.current}
            delay={200}
            from={{ translateY: -100 }}
            animate={{ translateY: 0 }}
          >
            <View style={style.center}>
              <Text style={style.heading}>{getToday(current.dt)}</Text>
              <Image
                style={{ height: 110, width: 110, resizeMode: "contain" }}
                source={{
                  uri: `http://openweathermap.org/img/wn/${current.weather[0].icon}@2x.png`,
                }}
              />
              <Text style={style.otherText}>
                {current.weather[0].description}
              </Text>
            </View>
            <View style={[style.dataRow, { justifyContent: "space-evenly" }]}>
              <Text style={[style.dataRow, { textAlign: "center" }]}>
                Temperature
              </Text>
              <Text style={[style.dataRow, { textAlign: "center" }]}>
                Feals Like
              </Text>
              <Text style={[style.dataRow, { textAlign: "center" }]}>
                Pressure
              </Text>
              <Text style={[style.dataRow, { textAlign: "center" }]}>
                Humidity
              </Text>
            </View>
            <View style={[style.dataRow, { justifyContent: "space-evenly" }]}>
              <Text style={[style.dataRow, { textAlign: "center" }]}>
                {current.temp} °C
              </Text>
              <Text style={[style.dataRow, { textAlign: "center" }]}>
                {current.feels_like} °C
              </Text>
              <Text style={[style.dataRow, { textAlign: "center" }]}>
                {current.pressure}hPa
              </Text>
              <Text style={[style.dataRow, { textAlign: "center" }]}>
                {current.humidity}
              </Text>
            </View>
            <View style={[style.dataRow, { justifyContent: "space-evenly" }]}>
              <Text style={[style.dataRow, { textAlign: "center" }]}>
                UV Index
              </Text>
              <Text style={[style.dataRow, { textAlign: "center" }]}>
                Clouds
              </Text>
              <Text style={[style.dataRow, { textAlign: "center" }]}>
                Wind Speed
              </Text>
              <Text style={[style.dataRow, { textAlign: "center" }]}>
                Visibility
              </Text>
            </View>
            <View style={[style.dataRow, { justifyContent: "space-evenly" }]}>
              <Text style={[style.dataRow, { textAlign: "center" }]}>
                {current.uvi}
              </Text>
              <Text style={[style.dataRow, { textAlign: "center" }]}>
                Clouds:{current.clouds}%
              </Text>
              <Text style={[style.dataRow, { textAlign: "center" }]}>
                {current.wind_speed} M/S
              </Text>
              <Text style={[style.dataRow, { textAlign: "center" }]}>
                {current.visibility / 1000} KM
              </Text>
            </View>
          </MotiView>
        )}
      </AnimatePresence>
    );
  };
  return (
    <View style={style.container}>
      <Loader loading={props.loading} />
      {props.error ? (
        <ErrorView
          callback={() => {
            getForecast();
          }}
        />
      ) : (
        props.current &&
        props.current["weather"] && (
          <View style={{ flex: 1 }}>
            {CurrentWeather(props.current)}
            <View style={style.forecast}>
              <FlatList
                data={props.forecast}
                keyExtractor={(item) => item.dt.toString()}
                ListEmptyComponent={empty}
                renderItem={item}
              />
            </View>
          </View>
        )
      )}
    </View>
  );
};

const mapStateToProps = (state) => {
  return {
    loading: state.weather.loading,
    error: state.weather.error,
    current: state.weather.current,
    forecast: state.weather.forecast,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchByCoordinates: (data) => searchByCoordinates(data, dispatch),
    setError: (err) => setError(err, dispatch),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
const style = StyleSheet.create({
  container: { flex: 1 },
  current: {
    flex: 1,
    margin: 5,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 10,
  },
  center: {
    alignItems: "center",
    justifyContent: "center",
  },
  forecast: {
    flex: 2,
  },
  button: {
    borderWidth: 1,
    borderColor: "red",
    paddingVertical: 15,
    paddingHorizontal: 25,
    borderRadius: 10,
    marginTop: 20,
  },
  dataRow: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  dataCol: {
    flex: 1,
  },
  card: {
    margin: 5,
    padding: 5,
    borderColor: "gray",
    borderWidth: 0.5,
    borderRadius: 5,
    flexGrow: 1,
  },
  main: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heading: {
    color: "#381700",
    fontSize: 20,
    fontWeight: "bold",
  },
  otherText: {
    color: "#281000",
    fontSize: 20,
  },
});
