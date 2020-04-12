import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

export const GET_CITIES = 'GET_CITIES';
export const SET_SELECTED_CITY = 'SET_SELECTED_CITY';
export const REMOVE_SELECTED_CITY = 'REMOVE_SELECTED_CITY';

export const getCities = () => async dispatch => {
  const { data } = await axios.get('/api/cities');  
  return dispatch({
    type: GET_CITIES,
    payload: data
  });
}
export const setSelectedCity = (data) => async dispatch => {  
  return dispatch({
    type: SET_SELECTED_CITY,
    payload: data
  });
}
export const removeSelectedCity = () => async dispatch => {
  return dispatch({
    type: REMOVE_SELECTED_CITY,
  });
}