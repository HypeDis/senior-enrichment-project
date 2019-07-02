import { combineReducers } from 'redux';

import campuses from './campusReducers';
import students from './studentReducers';

const rootReducer = combineReducers({
  campuses,
  students,
});

export default rootReducer;
