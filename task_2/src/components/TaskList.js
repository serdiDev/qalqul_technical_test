import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasksRequest, addTaskRequest, updateTaskRequest, removeTaskRequest } from '../data/actions/taskActions';

const TaskList = () => {
    const dispatch = useDispatch();
    const tasks = useSelector(state => state.tasks.tasks);
    const error = useSelector(state => state.tasks.error);

    useEffect(() => {
        dispatch(fetchTasksRequest());
    }, [dispatch]);

    const handleAddTask = () => {
        const task = { id: Date.now(), title: 'New Task', completed: false };
        dispatch(addTaskRequest(task));
    };

    const handleUpdateTask = (task) => {
        dispatch(updateTaskRequest({ ...task, completed: !task.completed }));
    };

    const handleRemoveTask = (taskId) => {
        dispatch(removeTaskRequest(taskId));
    };

    return (
        <div className="task-list-container">
            <div className="task-list-header">
                <h2>Task List</h2>
                <button className="add-task-button" onClick={handleAddTask}>Add Task</button>
            </div>
            {error && <p className="error-message">{error}</p>}
            <ul className="task-list">
                {tasks && tasks.length > 0 ? tasks.map(task => (
                    <li key={task.id}>
            <span
                className={task.completed ? 'completed' : ''}
                onClick={() => handleUpdateTask(task)}
            >
              {task.title}
            </span>
                        <button onClick={() => handleRemoveTask(task.id)}>Remove</button>
                    </li>
                )) : <p>No tasks available.</p>}
            </ul>
        </div>
    );
};

export default TaskList;