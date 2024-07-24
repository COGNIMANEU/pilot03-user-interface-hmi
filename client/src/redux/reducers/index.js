import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import sessionReducer from './sessionReducer';
import authReducer from './authReducer';
import userReducer from './userReducer';

const rootReducer = combineReducers({
  alerts: alertReducer,
  sessions: sessionReducer,
  auth: authReducer,
  user: userReducer,
});

export default rootReducer;