// rootReducer.js
import { combineReducers } from 'redux';
import usersReducer from './usersSlice';
import organizationsReducer from './organizationsSlice';

const rootReducer = combineReducers({
  users: usersReducer,
  organizations: organizationsReducer,
});

export default rootReducer;
