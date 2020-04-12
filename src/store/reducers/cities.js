import { GET_CITIES, SET_SELECTED_CITY, REMOVE_SELECTED_CITY } from '../actions/cities';

const INITIAL_STATE = {
  cities: [],
  selectedCity: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CITIES:
      return { ...state, cities: action.payload.data.covid19Stats };
    case SET_SELECTED_CITY:
      return { ...state, selectedCity: action.payload };
    case REMOVE_SELECTED_CITY:
      return { ...state, selectedCity: {} };
    default:
      return state;
  }
};
