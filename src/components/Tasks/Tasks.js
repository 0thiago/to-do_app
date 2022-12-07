import React, { useContext } from "react"
import TasksCard from "./TasksCard"
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
      {
        context.taskTypes.map((task, index) => {
          return <TasksCard 
            key={index}
            type={task.type}
            title={task.title}
          />
        })
      }
    </Div>
  )
}

export default Tasks