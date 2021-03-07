import {combineReducers} from 'redux';
import * as actionTypes from './ActionTypes';
const initialState = {
  loading: false,
  error: '',
  current: {},
  forecast: [],
};

const weatherReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.LOADING: {
      return {
        ...state,
        loading: true,
      };
    }
    case actionTypes.NOLOADING: {
      return {
        ...state,
        loading: false,
      };
    }
    case actionTypes.SETERROR: {
      return {
        ...state,
        error: action.value,
      };
    }
    case actionTypes.RESETERR0R: {
      return {
        ...state,
        error: '',
      };
    }
    case actionTypes.WEATHER: {
      console.log(action.value);
      return {
        ...state,
        error: '',
        current: action.value.current,
        forecast: action.value.forecast,
      };
    }
    default: {
      return {
        ...state,
      };
    }
  }
};

export default combineReducers({
  weather: weatherReducer,
});
