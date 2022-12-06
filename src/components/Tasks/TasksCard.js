import React, { useState } from "react"
import styled from "styled-components"
import TaskHeader from "./TaskHeader"
import TaskList from "./TaskList"
import NewTaskModal from "../UI/NewTaskModal"

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
  const [modalIsVisible, setModalIsVisible] = useState(false)

  const onDropHandler = () => {
    setModalIsVisible(true)
  }

  const closeModalHandler = () => {
    setModalIsVisible(false)
  }

  return (
    <>
      <TaskListCard onDrop={onDropHandler}>
        <TaskHeader title={props.title}/>
        <TaskList type={props.type}/>
      </TaskListCard>
      {modalIsVisible && <NewTaskModal closeModal={closeModalHandler}/>}
    </>
  )
}

export default TasksCard
