import axios from 'axios';

// action constants
const GOT_CAMPUSES = 'GOT_CAMPUSES';
const GOT_CAMPUSES_ERROR = 'GOT_CAMPUSES_ERROR';
// action creators
export const gotCampuses = campuses => {
  const action = {
    type: GOT_CAMPUSES,
    campuses,
  };
  return action;
};

export const gotCampusesError = error => {
  const action = {
    type: GOT_CAMPUSES_ERROR,
    error,
  };
  return action;
};

// thunk creators

export const getCampusesFromDb = () => {
  return dispatch => {
    return (
      axios
        .get('/api/campuses')
        .then(response => {
          const campuses = response.data;
          dispatch(gotCampuses(campuses));
        })
        // need to make error reducer
        .catch(e => {
          console.error('getCampusFromdb Error', e);
          dispatch(gotCampusesError(e));
        })
    );
  };
};

const campusesReducer = (state = [], action) => {
  switch (action.type) {
    case GOT_CAMPUSES:
      return action.campuses;
    default:
      return state;
  }
};

export default campusesReducer;
