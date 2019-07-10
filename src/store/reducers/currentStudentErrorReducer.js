const SET_STUDENT_ERROR = 'SET_STUDENT_ERROR';

export const setStudentError = error => {
  const action = { type: SET_STUDENT_ERROR, error };
  return action;
};

const currentStudentErrorReducer = (state = { error: '' }, action) => {
  switch (action.type) {
    case SET_STUDENT_ERROR:
      return action.error;
    default:
      return state;
  }
};

export default currentStudentErrorReducer;
