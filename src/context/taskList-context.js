import React from "react"

const TaskListContext = React.createContext({
   
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

  newTaskList: [],
})

export default TaskListContext
