import { createStore, applyMiddleware } from 'redux';
import thunkMiddleware from 'redux-thunk';
import logger from 'redux-logger';

import rootReducer from './reducers/rootReducer';

const store = createStore(
  rootReducer,
  applyMiddleware(thunkMiddleware, logger)
);

export * from './reducers/studentsReducer';
export * from './reducers/campusesReducer';
export * from './reducers/currentCampusReducer';
export * from './reducers/currentStudentReducer';
export default store;
