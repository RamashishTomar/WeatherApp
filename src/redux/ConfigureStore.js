import {createStore, applyMiddleware} from 'redux';
import logger from 'redux-logger';
import reducers from './Reducer';

const configureStore = () => {
  return createStore(reducers, applyMiddleware(logger));
};
export default configureStore;
