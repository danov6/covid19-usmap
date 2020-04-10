import { GET_CITIES } from '../actions/cities';

const INITIAL_STATE = {
  cities: [],
  selectedCity: {}
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_CITIES:
      return { ...state, cities: action.payload.data.covid19Stats };
    // case 'SET_CITY':
    //   return action.data;
    // case 'REMOVE_CITY':
    //   return {};
    default:
      return state;
  }
};
