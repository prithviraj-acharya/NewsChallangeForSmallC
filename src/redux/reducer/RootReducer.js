import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';

const allReducers = combineReducers({
  AuthReducer: AuthReducer,
});

export default rootReducer = (state, action) => {
  return allReducers(state, action);
};
