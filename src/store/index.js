import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import state from './reducers/state';
import cities from './reducers/cities';
import loading from './reducers/loading';

const reducers = combineReducers({
  state,
  cities,
  loading,
});

const store = createStore(
  reducers,
  composeWithDevTools(applyMiddleware(thunk))
);

export default store;
