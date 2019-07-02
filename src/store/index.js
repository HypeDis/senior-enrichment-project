import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers/rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);

export * from './reducers/studentReducers';
export * from './reducers/campusReducers';
export default store;
