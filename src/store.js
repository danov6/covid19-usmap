import { createStore, combineReducers } from 'redux';

import state from './reducers/state';
import city from './reducers/city';

const reducers = combineReducers({
  state,
  city
});

const store = createStore(reducers);

export default store;