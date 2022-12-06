import React, { useContext} from "react"

import Header from "./components/Layout/Header"
import NewTask from "./components/Tasks/NewTask"
import Tasks from "./components/Tasks/Tasks"
import Wrapper from "./components/Layout/Wrapper"
import TaskListContext from "../src/context/taskList-context"

const App = () => {
  const context = useContext(TaskListContext)

  // let tasksJSON = JSON.stringify(context.taskList)

  // localStorage.setItem('tasks', tasksJSON)

  return (
    <Wrapper>
      <Header />
      <NewTask />
      <Tasks />
    </Wrapper>
  )
}

export default App
