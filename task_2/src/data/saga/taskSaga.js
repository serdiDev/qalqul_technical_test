// sagas.js
import { call, put, takeLatest } from 'redux-saga/effects';
import {
    FETCH_TASKS_REQUEST, ADD_TASK_REQUEST, UPDATE_TASK_REQUEST, REMOVE_TASK_REQUEST, REMOVE_TASK_SUCCESS
} from '../actions/types/taskTypes';
import {
    fetchTasksSuccess, fetchTasksFailure,
    addTaskSuccess, addTaskFailure,
    updateTaskSuccess, updateTaskFailure,
    removeTaskSuccess, removeTaskFailure
} from '../actions/taskActions';

// Simulating API calls with dummy functions
const api = {
    fetchTasks: () => fetch('/api/tasks').then(response => response.json()),
    addTask: (task) => fetch('/api/tasks', { method: 'POST', body: JSON.stringify(task) }).then(response => response.json()),
    updateTask: (task) => fetch(`/api/tasks/${task.id}`, { method: 'PUT', body: JSON.stringify(task) }).then(response => response.json()),
    removeTask: (taskId) => fetch(`/api/tasks/${taskId}`, { method: 'DELETE' }).then(() => taskId)
};

function* fetchTasks() {
    try {
        const tasks = yield call(api.fetchTasks);
        yield put(fetchTasksSuccess(tasks));
    } catch (error) {
        yield put(fetchTasksFailure(error.toString()));
    }
}

function* addTask(action) {
    try {
        const task = yield call(api.addTask, action.payload);
        yield put(addTaskSuccess(task));
    } catch (error) {
        yield put(addTaskFailure(error.toString()));
    }
}

function* updateTask(action) {
    try {
        const task = yield call(api.updateTask, action.payload);
        yield put(updateTaskSuccess(task));
    } catch (error) {
        yield put(updateTaskFailure(error.toString()));
    }
}

function* removeTask(action) {
    try {
        const taskId = yield call(api.removeTask, action.payload);
        yield put(removeTaskSuccess(taskId));
    } catch (error) {
        yield put(removeTaskFailure(error.toString()));
    }
}

function* taskSaga() {
    yield takeLatest(FETCH_TASKS_REQUEST, fetchTasks);
    yield takeLatest(ADD_TASK_REQUEST, addTask);
    yield takeLatest(UPDATE_TASK_REQUEST, updateTask);
    yield takeLatest(REMOVE_TASK_REQUEST, removeTask);
}

export default taskSaga;
