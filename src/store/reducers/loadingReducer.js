const SET_LOADING_STATE = 'SET_LOADING';

export const setLoading = isLoading => {
  const action = { type: SET_LOADING_STATE, isLoading };
  return action;
};

const loadingReducer = (state = false, action) => {
  switch (action.type) {
    case SET_LOADING_STATE:
      return action.isLoading;
    default:
      return state;
  }
};

export default loadingReducer;
