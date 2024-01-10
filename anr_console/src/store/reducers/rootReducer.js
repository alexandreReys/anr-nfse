// rootReducer.js
import { combineReducers } from 'redux';
import usersReducer from './usersSlice';
import organizationsReducer from './organizationsSlice';
import servicesReducer from './servicesSlice';
import customersReducer from './customersSlice';
import serviceOrdersReducer from './serviceOrdersSlice';

const rootReducer = combineReducers({
  users: usersReducer,
  organizations: organizationsReducer,
  services: servicesReducer,
  customers: customersReducer,
  serviceOrders: serviceOrdersReducer,
});

export default rootReducer;
