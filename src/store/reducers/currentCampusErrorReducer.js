const SET_CAMPUS_ERROR = 'SET_CAMPUS_ERROR';

export const setCampusError = error => {
  const action = { type: SET_CAMPUS_ERROR, error };
  return action;
};

const campusErrorReducer = (state = { error: '' }, action) => {
  switch (action.type) {
    case SET_CAMPUS_ERROR:
      return action.error;
    default:
      return state;
  }
};

export default campusErrorReducer;
