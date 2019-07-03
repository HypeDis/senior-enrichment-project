import axios from 'axios';

// action constants
const GOT_CURRENT_STUDENT = 'GOT_CURRENT_STUDENT';

// action creators
export const gotCurrentStudent = student => {
  const action = { type: GOT_CURRENT_STUDENT, student };
  return action;
};

// thunk creators
export const getCurrentStudentFromDb = studentId => {
  return dispatch => {
    return axios
      .get(`/api/students/${studentId}`)
      .then(response => {
        const student = response.data;
        dispatch(gotCurrentStudent(student));
      })
      .catch(e => {
        //write error handler later
        console.error('getCurrentStudent error', e);
      });
  };
};

// reducer
const initialState = {
  firstName: '',
  lastName: '',
  email: '',
  gpa: 0,
  imageUrl: '',
  campus: {},
};
const currentStudentReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CURRENT_STUDENT:
      return action.student;
    default:
      return state;
  }
};

export default currentStudentReducer;
