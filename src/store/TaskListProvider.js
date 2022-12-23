import React, { useEffect, useReducer, useState } from 'react';

import TaskListContext from './taskList-context';

let storedList = JSON.parse(localStorage.getItem('taskList'));
if (storedList === null) {
  storedList = [];
};

const initialState = {
  taskList: storedList,
  taskRemovedSuccessfully: false,
};

const actions = {
  ADD: 'ADD_TASK',
  REMOVE: 'REMOVE_TASK',
  UPDATE: 'UPDATE_TASK',
  DROP: 'DROP_TASK',
  STATUS_UPDATE: 'TASK_STATUS_UPDATE',
};

const sortByCreationDate = (a, b) => {
  const itemA = Date.parse(a.creationDate);
  const itemB = Date.parse(b.creationDate);

  if (itemA === itemB) {
    return 0;
  }
  return itemA - itemB;
};

const taskListManager = (taskListState, action) => {
  switch (action.type) {
    default:
      return initialState.taskList;

    case actions.ADD: {
      let updatedList = [action.task, ...taskListState.taskList].sort(
        sortByCreationDate
      );

      return { taskList: updatedList };
    }
    case actions.DROP: {
      let updatedTask = action.task.draggedTask;
      let newStatus;
      if (action.task.newStatus === 'Tasks To Do') {
        newStatus = 'todo';
      } else if (action.task.newStatus === 'Tasks in Progress') {
        newStatus = 'inProgress';
      } else {
        newStatus = 'done';
      }

      updatedTask.status = newStatus;

      let updatedList = taskListState.taskList.filter(
        (task) => task.id !== updatedTask.id
      );

      updatedList = [updatedTask, ...updatedList].sort(sortByCreationDate);

      return { taskList: updatedList };
    }
    case actions.UPDATE: {
      let updatedList = taskListState.taskList.filter(
        (task) => task.id !== action.task.id
      );
      let updatedTask = action.task;

      updatedList = [updatedTask, ...updatedList].sort(sortByCreationDate);

      return { taskList: updatedList };
    }
    case actions.REMOVE: {
      let updatedList = taskListState.taskList.filter(
        (task) => task.id !== action.task.id
      );

      return { taskList: updatedList, taskRemovedSuccessfully: true };
    }
    case actions.STATUS_UPDATE: {
      let updatedTask = action.task;
      let updatedList = taskListState.taskList.filter(
        (task) => task.id !== action.task.id
      );

      if (updatedTask.status === 'todo') {
        updatedTask.status = 'inProgress';
      } else {
        updatedTask.status = 'done';
      }

      updatedList = [updatedTask, ...updatedList].sort(sortByCreationDate);

      return { taskList: updatedList };
    }
  }
};

const TaskListProvider = (props) => {
  const [taskListState, dispatch] = useReducer(taskListManager, initialState);

  const [selectedTask, setSelectedTask] = useState(null);
  const [closeNewTask, setCloseNewTask] = useState(false);

  useEffect(()=>{
    let listToStore = JSON.stringify(taskListState.taskList); 
    localStorage.setItem('taskList', listToStore);

  }, [taskListState.taskList]);

  useEffect(() => {
    if (taskListState.taskRemovedSuccessfully === true) {
      props.onShowTaskRemovedSuccessfully();
    }
    taskListState.taskRemovedSuccessfully = false;
  }, [props, taskListState, taskListState.taskRemovedSuccessfully]);

  const addNewTaskHandler = (task) => {
    dispatch({ type: actions.ADD, task: task });
  };

  const dropTaskHandler = (task) => {
    dispatch({ type: actions.DROP, task: task });
  };

  const updateTaskHandler = (task) => {
    dispatch({ type: actions.UPDATE, task: task });
  };

  const updateTaskStatusHandler = (task) => {
    if (task.status === 'done') {
      props.onShowRemoveTaskModal(task);
    } else {
      dispatch({ type: actions.STATUS_UPDATE, task: task });
    }
  };

  const removeTaskHandler = (task) => {
    dispatch({ type: actions.REMOVE, task: task });
  };

  const closeNewTaskHandler = (state) => {
    setCloseNewTask(state);
  };

  const toggleHandler = (id) => {
    if (selectedTask === id) {
      return setSelectedTask(null);
    }
    setSelectedTask(id);
    setCloseNewTask(true);
  };

  const sortByCreationDate = (a, b) => {
    const itemA = Date.parse(a.creationDate);
    const itemB = Date.parse(b.creationDate);

    if (itemA === itemB) {
      return 0;
    }
    return itemA - itemB;
  };

  const showRemoveTaskModalHandler = (task) => {
    props.onShowRemoveTaskModal(task);
  };

  const hideRemoveTaskModalHandler = () => {
    props.onHideRemoveTaskModal();
  };

  const hideTaskRemovedModalHandler = () => {
    props.onHideTaskRemovedModal();
  };

  const taskListContext = {
    taskList: taskListState.taskList,

    taskTypes: [
      {
        type: 'todo',
        title: 'Tasks To Do',
      },
      {
        type: 'inProgress',
        title: 'Tasks in Progress',
      },
      {
        type: 'done',
        title: 'Tasks Done',
      },
    ],

    closeNewTaskWindow: closeNewTaskHandler,

    closeNewTask: closeNewTask,

    hideTaskRemovedModal: hideTaskRemovedModalHandler,

    showRemoveTaskModal: showRemoveTaskModalHandler,

    hideRemoveTaskModal: hideRemoveTaskModalHandler,

    toggle: toggleHandler,

    selectedTask: selectedTask,

    sortList: sortByCreationDate,

    addTask: addNewTaskHandler,

    removeTask: removeTaskHandler,

    updateTask: updateTaskHandler,

    updateTaskStatus: updateTaskStatusHandler,

    dropTask: dropTaskHandler,
  };

  return (
    <TaskListContext.Provider value={taskListContext}>
      {props.children}
    </TaskListContext.Provider>
  );
};

export default TaskListProvider;
