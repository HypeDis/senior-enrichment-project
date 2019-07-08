import { combineReducers } from 'redux';

import campuses from './campusesReducer';
import students from './studentsReducer';
import currentCampus from './currentCampusReducer';
import currentStudent from './currentStudentReducer';
import isLoading from './loadingReducer';

const rootReducer = combineReducers({
  campuses,
  students,
  currentCampus,
  currentStudent,
  isLoading,
});

export default rootReducer;
