import { combineReducers } from 'redux';

import campuses from './campusesReducer';
import students from './studentsReducer';
import currentCampus from './currentCampusReducer';
import currentStudent from './currentStudentReducer';

const rootReducer = combineReducers({
  campuses,
  students,
  currentCampus,
  currentStudent,
});

export default rootReducer;
