import axios from 'axios';
import { setLoading } from './loadingReducer';

// action constants
const GOT_STUDENTS = 'GOT_STUDENTS';
const GOT_STUDENTS_ERROR = 'GOT_STUDENTS_ERROR';

// action creators
export const gotStudents = students => {
  const action = { type: GOT_STUDENTS, students };
  return action;
};

export const gotStudentsError = error => {
  const action = { type: GOT_STUDENTS_ERROR, error };
  return action;
};

// thunk creators
export const getStudentsFromDb = () => {
  return dispatch => {
    axios
      .get('/api/students')
      .then(response => {
        dispatch(gotStudents(response.data));
        dispatch(setLoading(false));
      })
      .catch(e => {
        dispatch(gotStudentsError(e));
      });
  };
};

const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  gpa: 0,
  campus: {},
};
// reducer
const studentsReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_STUDENTS:
      return action.students;
    default:
      return state;
  }
};

export default studentsReducer;
