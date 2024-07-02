import { configureStore } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import alertReducer from './reducers/alertReducer';
import sessionReducer from './reducers/sessionReducer';
import authReducer from './reducers/authReducer';
import userReducer from './reducers/userReducer';
import rootSaga from './sagas/rootSaga';

const sagaMiddleware = createSagaMiddleware();

const store = configureStore({
  reducer: {
    alerts: alertReducer,
    sessions: sessionReducer,
    auth: authReducer,
    user: userReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});

sagaMiddleware.run(rootSaga);

export default store;