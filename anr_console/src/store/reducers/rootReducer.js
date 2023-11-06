// rootReducer.js
import { combineReducers } from 'redux';
import usersReducer from './usersSlice';
import organizationsReducer from './organizationsSlice';
import servicesReducer from './servicesSlice';

const rootReducer = combineReducers({
  users: usersReducer,
  organizations: organizationsReducer,
  services: servicesReducer,
});

export default rootReducer;
