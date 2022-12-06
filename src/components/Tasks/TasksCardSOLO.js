import styled from "styled-components"
import TaskHeader from "./TaskHeader"
import TaskList from "./TaskListSOLO"

const TaskListCard = styled.div`
  background-color: #FAFAFA;
  text-align: left;
  padding: 20px;
  margin: 0px 20px 100px;
  border-radius: 40px;
  border: 1px solid #ffffff;
  box-shadow: 0 50px 40px #00000030;
  width: 390px;
  height: 458px;
`

const TasksCard = props => {

  return (
    <TaskListCard>
      <TaskHeader title={props.title}/>
      <TaskList type={props.type}/>
    </TaskListCard>
  )
}

export default TasksCard
