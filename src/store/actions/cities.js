import axios from 'axios';
axios.defaults.baseURL = 'http://localhost:5000';

export const GET_CITIES = 'GET_CITIES';

export const getCities = () => async dispatch => {
  const { data } = await axios.get('/api/cities');

  // aggregate data here
  
  return dispatch({
    type: GET_CITIES,
    payload: data
  })
}