import axios from 'axios';
import { setLoading } from './../index';

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
        dispatch(gotCurrentCampus(campus));
        dispatch(setLoading(false));
      })
      .catch(e => {
        //write error handler later
        console.error('getCurrentCampus error', e);
      });
  };
};

// reducer
const initialState = {
  name: '',
  address: '',
  description: '',
  imageUrl: 'defaultCampus.jpg',
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
