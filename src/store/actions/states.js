export const SET_SELECTED_STATE = 'SET_SELECTED_STATE';
export const REMOVE_SELECTED_STATE = 'REMOVE_SELECTED_STATE';

export const setSelectedState = data => async dispatch => {  
  return dispatch({
    type: SET_SELECTED_STATE,
    payload: data
  });
}
export const removeSelectedState = () => async dispatch => {
  return dispatch({
    type: REMOVE_SELECTED_STATE
  });
}