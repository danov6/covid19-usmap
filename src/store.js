import { createStore, combineReducers } from 'redux';

import state from './reducers/state';
import city from './reducers/city';
import loading from './reducers/loading';

const reducers = combineReducers({
  state,
  city,
  loading
});

const store = createStore(reducers);

export default store;