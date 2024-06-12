import { createStore, applyMiddleware, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import taskReducer from './reducers/taskReducer';
import taskSaga from './saga/taskSaga';

const rootReducer = combineReducers({
    tasks: taskReducer
});

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
    rootReducer,
    applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(taskSaga);

export default store;
