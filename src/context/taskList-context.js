import React from "react"

const TaskListContext = React.createContext({
  taskList: [
    {
      name: "This is the task one1",
      status: "todo",
      id: 1,
    },
    {
      name: "This is the task one2",
      status: "todo",
      id: 2,
    },
    {
      name: "This is the task one3",
      status: "todo",
      id: 3,
    },
    {
      name: "This is the task two",
      status: "inProgress",
      id: 4,
    },
    {
      name: "This is the task two1",
      status: "inProgress",
      id: 5,
    },
    {
      name: "This is the task two2",
      status: "inProgress",
      id: 6,
    },
    {
      name: "This is the task three",
      status: "done",
      id: 7,
    },
    {
      name: "This is the task three1",
      status: "done",
      id: 8,
    },
    {
      name: "This is the task three2",
      status: "done",
      id: 9,
    },
  ],
  
  taskTypes: [
    {
      type: 'todo',
      title: 'Tasks To Do'
    },
    {
      type: 'inProgress',
      title: 'Tasks in Progress'
    },
    {
      type: 'done',
      title: 'Tasks Done'
    },
  ],
})

export default TaskListContext
