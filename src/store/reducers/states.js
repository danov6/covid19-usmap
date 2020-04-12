import { SET_SELECTED_STATE, REMOVE_SELECTED_STATE } from '../actions/states';

const INITIAL_STATE = {
  selectedState: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_SELECTED_STATE:
      return { ...state, selectedState: action.payload };
    case REMOVE_SELECTED_STATE:
      return { ...state, selectedState: {} };
    default:
      return state;
  }
};
