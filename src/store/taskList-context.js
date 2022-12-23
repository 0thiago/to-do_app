import React from 'react';

const TaskListContext = React.createContext({
  taskList: [],

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

  hideTaskRemovedModal: (task) => {},

  showRemoveTaskModal: (id) => {},

  hideRemoveTaskModal: () => {},

  toggle: (id) => {},

  selectedTask: null,

  closeNewTaskWindow: () => {},

  closeNewTask: false,

  sortByCreationDate: (a, b) => {},

  addTask: (task) => {},

  removeTask: (id) => {},

  updateTask: (task) => {},

  updateTaskStatus: (task) => {},

  dropTask: (task) => {},
});

export default TaskListContext;
