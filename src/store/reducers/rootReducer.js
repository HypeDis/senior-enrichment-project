import { combineReducers } from 'redux';

import campuses from './campusesReducer';
import students from './studentsReducer';
import currentCampus from './currentCampusReducer';
import currentStudent from './currentStudentReducer';
import isLoading from './loadingReducer';
import currentCampusError from './currentCampusErrorReducer';
import currentStudentError from './currentStudentErrorReducer';

const rootReducer = combineReducers({
  campuses,
  students,
  currentCampus,
  currentStudent,
  isLoading,
  currentCampusError,
  currentStudentError,
});

export default rootReducer;
