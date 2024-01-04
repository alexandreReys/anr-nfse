// rootReducer.js
import { combineReducers } from 'redux';
import usersReducer from './usersSlice';
import organizationsReducer from './organizationsSlice';
import servicesReducer from './servicesSlice';
import customersReducer from './customersSlice';

const rootReducer = combineReducers({
  users: usersReducer,
  organizations: organizationsReducer,
  services: servicesReducer,
  customers: customersReducer,
});

export default rootReducer;
