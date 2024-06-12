// taskReducer.js
import {
    FETCH_TASKS_SUCCESS, FETCH_TASKS_FAILURE,
    ADD_TASK_SUCCESS, ADD_TASK_FAILURE,
    UPDATE_TASK_SUCCESS, UPDATE_TASK_FAILURE,
    REMOVE_TASK_SUCCESS, REMOVE_TASK_FAILURE
} from '../actions/types/taskTypes';

const initialState = {
    tasks: [],
    error: null
};

const taskReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_TASKS_SUCCESS:
            return { ...state, tasks: action.payload, error: null };
        case FETCH_TASKS_FAILURE:
            return { ...state, error: action.payload };

        case ADD_TASK_SUCCESS:
            return { ...state, tasks: [...state.tasks, action.payload], error: null };
        case ADD_TASK_FAILURE:
            return { ...state, error: action.payload };

        case UPDATE_TASK_SUCCESS:
            return {
                ...state,
                tasks: state.tasks.map(task => task.id === action.payload.id ? action.payload : task),
                error: null
            };
        case UPDATE_TASK_FAILURE:
            return { ...state, error: action.payload };

        case REMOVE_TASK_SUCCESS:
            return { ...state, tasks: state.tasks.filter(task => task.id !== action.payload), error: null };
        case REMOVE_TASK_FAILURE:
            return { ...state, error: action.payload };

        default:
            return state;
    }
};

export default taskReducer;
