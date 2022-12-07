import React, { useState, useContext } from "react"
import styled from "styled-components"
import TaskHeader from "./TaskHeader"
import TaskList from "./TaskList"
import NewTaskModal from "../UI/NewTaskModal"
import TaskListContext from "../../context/taskList-context"

const TaskListCard = styled.div`
  position: relative;
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
  const [collapseAll, setCollapseAll] = useState(false)

  const context = useContext(TaskListContext)

  const onDropHandler = event => {
    
    event.preventDefault()
    setModalIsVisible(true)
    console.log(props.type)
  }

  const onDragOverHandler = event => {
    event.preventDefault()
  }

  const closeModalHandler = () => {
    setModalIsVisible(false)
  }

  const onClickHandler = () => {
    // setCollapseAll(true)
    // console.log('click parent')
  }

  return (
    <>
      <TaskListCard onDrop={onDropHandler} onDragOver={onDragOverHandler} onClick={onClickHandler}>
        <TaskHeader title={props.title}/>
        <TaskList type={props.type} collapseAll={collapseAll} />
      </TaskListCard> 
      {modalIsVisible && <NewTaskModal closeModal={closeModalHandler} type={props.type} collapse={closeModalHandler}/>}
    </>
  )
}

export default TasksCard
