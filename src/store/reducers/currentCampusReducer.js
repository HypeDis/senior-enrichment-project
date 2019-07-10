import axios from 'axios';
import { setLoading, setCampusError } from './../index';

// action constants
const GOT_CURRENT_CAMPUS = 'GOT_CURRENT_CAMPUS';
const RESET_CURRENT_CAMPUS = 'RESET_CURRENT_CAMPUS';

// action creators
export const gotCurrentCampus = campus => {
  const action = { type: GOT_CURRENT_CAMPUS, campus };
  return action;
};

export const resetCurrentCampus = () => {
  const action = { type: RESET_CURRENT_CAMPUS };
  return action;
};

// thunk creators
export const getCurrentCampusFromDb = campusId => {
  return dispatch => {
    return axios
      .get(`/api/campuses/${campusId}`)
      .then(response => {
        const campus = response.data;
        dispatch(setLoading(false));
        if (campus.error) {
          return Promise.reject(campus);
        }
        dispatch(gotCurrentCampus(campus));
      })
      .catch(e => {
        //write error handler later
        dispatch(setCampusError(e));
      });
  };
};

// reducer
const initialState = {
  name: '',
  address: '',
  description: '',
  // imageUrl: '/img/defaultCampus.jpg',
  students: [],
};

const currentCampusReducer = (state = initialState, action) => {
  switch (action.type) {
    case GOT_CURRENT_CAMPUS:
      return action.campus;
    case RESET_CURRENT_CAMPUS:
      return { ...initialState };
    default:
      return state;
  }
};

export default currentCampusReducer;
