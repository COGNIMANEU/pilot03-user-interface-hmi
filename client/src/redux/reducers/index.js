import { combineReducers } from 'redux';
import alertReducer from './alertReducer';
import sessionReducer from './sessionReducer';

const rootReducer = combineReducers({
  alerts: alertReducer,
  sessions: sessionReducer
});

export default rootReducer;