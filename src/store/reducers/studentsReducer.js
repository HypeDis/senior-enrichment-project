import axios from 'axios';

// action constants
const GOT_STUDENTS = 'GOT_STUDENTS';
const GOT_STUDENTS_ERROR = 'GOT_STUDENTS_ERROR';
const RESET_CURRENT_STUDENT = 'RESET_CURRENT_STUDENT';

// action creators
export const gotStudents = students => {
  const action = { type: GOT_STUDENTS, students };
  return action;
};

export const gotStudentsError = error => {
  const action = { type: GOT_STUDENTS_ERROR, error };
  return action;
};

export const resetCurrentStudent = () => {
  const action = { type: RESET_CURRENT_STUDENT };
  return action;
};
// thunk creators
export const getStudentsFromDb = () => {
  return dispatch => {
    axios
      .get('/api/students')
      .then(response => {
        dispatch(gotStudents(response.data));
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
    case RESET_CURRENT_STUDENT:
      return initialState;
    default:
      return state;
  }
};

export default studentsReducer;
