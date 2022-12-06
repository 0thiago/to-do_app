import React, { useContext } from "react"
import TasksToDo from "./TasksToDo"
import styled from "styled-components"
import TaskListContext from "../../context/taskList-context"

const Div = styled.div`
  display: flex;
  align-items: top;
  justify-content: center;
`
const Tasks = props => {
  const context = useContext(TaskListContext)

  return (
    <Div>
      <TasksToDo title={context.taskTypes.title} type={context.taskTypes.type}/>
    </Div>
  )
}

export default Tasks