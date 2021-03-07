import * as actionTypes from './ActionTypes';
import {create} from 'apisauce';
const api = create({
  baseURL: 'https://api.openweathermap.org/data/2.5/',
});
const appid = 'da9d6e14bf1eddc0eb773a327de2661c';

export const setLoading = async (data, dispatch) => {
  if (data) {
    dispatch({
      type: actionTypes.LOADING,
    });
  } else {
    dispatch({
      type: actionTypes.NOLOADING,
    });
  }
};
export const setError = async (data, dispatch) => {
  dispatch({
    type: actionTypes.SETERROR,
    value: data,
  });
};
export const searchByCoordinates = async (data, dispatch) => {
  const {lat, lng} = data;
  // `onecall?lat=${lat}&lon=${lng}&exclude=minutely&units=metric&appid=${config.appid}`,
  console.log(
    `forecast?lat=${26.702518}&lon=${77.893394}&units=metric&appid=${appid}`,
  );
  setLoading(true, dispatch);
  current(lat, lng, (current) => {
    api
      .get(
        `onecall?lat=${lat}&lon=${lng}&units=metric&exclude=minutely,alerts,hourly&appid=${appid}`,
      )
      .then(async (data) => {
        if (data.problem) {
          setLoading(false, dispatch);
          setError(data.problem, dispatch);
        } else {
          setLoading(false, dispatch);
          console.log(data.data.current);
          let forecast = [];
          data.data.daily.map((element, index) => {
            if (index > 0 && index < 6) {
              console.log(element);
              forecast.push(element);
            }
          });
          console.log(forecast);

          dispatch({
            type: actionTypes.WEATHER,
            value: {current: data.data.current, forecast: forecast},
          });
        }
      });
  });
};
export const current = async (lat, lng, callback) => {
  api
    .get(
      `forecast?lat=${26.702518}&lon=${77.893394}&unit=metric&appid=${appid}`,
    )
    .then((data) => {
      callback(data);
    });
};
