import axios from 'axios';
import { setLoading, setStudentError } from './../index';
// action constants
const GOT_CURRENT_STUDENT = 'GOT_CURRENT_STUDENT';
const RESET_CURRENT_STUDENT = 'RESET_CURRENT_STUDENT';

// action creators
export const gotCurrentStudent = student => {
  const action = { type: GOT_CURRENT_STUDENT, student };
  return action;
};

export const resetCurrentStudent = () => {
  const action = { type: RESET_CURRENT_STUDENT };
  return action;
};

// thunk creators
export const getCurrentStudentFromDb = studentId => {
  return dispatch => {
    return axios
      .get(`/api/students/${studentId}`)
      .then(response => {
        dispatch(setLoading(false));
        const student = response.data;
        if (student.error) {
          return Promise.reject(student);
        }
        dispatch(gotCurrentStudent(student));
      })
      .catch(e => {
        //write error handler later
        console.error('getCurrentStudent error', e);
        dispatch(setStudentError(e));
      });
  };
};

// reducer
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  gpa: '',
  campus: {},
};
const currentStudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CURRENT_STUDENT:
      return action.student;
    case RESET_CURRENT_STUDENT:
      return { ...initialState, campus: {} };
    default:
      return state;
  }
};

export default currentStudentReducer;
