import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import TaskHeader from "./TaskHeader"
import TaskList from "./TaskList"
import NewTaskModal from "../UI/NewTaskModal"
import TaskListContext from "../../context/taskList-context"
import TaskListToDo from "./TaskListToDo"
import TaskListInProgress from "./TaskListInProgress"
import TaskListDone from "./TaskListDone"
import TaskAdd from "./TaskAdd"

const TaskListCard = styled.div`
  position: relative;
  background-color: #fafafa;
  text-align: left;
  padding: 20px;
  margin: 0px 20px 100px;
  border-radius: 40px;
  border: 1px solid #ffffff;
  box-shadow: 0 50px 40px #00000030;
  width: 390px;
  height: 458px;
`

const TasksCard = (props) => {
  const [modalIsVisible, setModalIsVisible] = useState(false)
  const [refreshList, setRefreshList] = useState("")
  const [taskListUpdated, setTaskListUpdated] = useState([])

  const sortByID = (a, b) => {
    if (a.id === b.id) {
      return 0
    }
    return a.id - b.id
  }

  const onDropHandler = (event) => {
    event.preventDefault()

    const dropEvent = event.dataTransfer.getData("new-item")

    if (dropEvent === "NewTask") {
      setModalIsVisible(true)
    } else {
      const currentTask = JSON.parse(event.dataTransfer.getData("drag-item"))
      console.log(currentTask)
      let taskListOld = JSON.parse(localStorage.getItem(currentTask.status))
      taskListOld = taskListOld.filter((task) => task.name !== currentTask.name)
      const taskListOldUpdated = JSON.stringify(taskListOld)
      localStorage.setItem(currentTask.status, taskListOldUpdated)
      const newStatus = props.type
      currentTask.status = newStatus
      let taskListNew = JSON.parse(localStorage.getItem(newStatus))
      currentTask.id = taskListNew.length + 1
      let taskListNewUpdated = [currentTask, ...taskListNew].sort(sortByID)
      taskListNewUpdated = JSON.stringify(taskListNewUpdated)
      localStorage.setItem(newStatus, taskListNewUpdated)

      setRefreshList((prevState) => {
        return prevState + 1
      })
    }
  }

  const onDragOverHandler = (event) => {
    event.preventDefault()
  }

  const closeModalHandler = () => {
    setModalIsVisible(false)
  }

  useEffect(() => {}, [])

  const updateList = (taskList) => {
    setTaskListUpdated(taskList)
  }

  return (
    <>
      <TaskListCard onDrop={onDropHandler} onDragOver={onDragOverHandler}>
        <TaskHeader title={props.title} />

        {props.title === "Tasks To Do" && (
          <TaskListToDo
            itemDropped={refreshList}
            title={props.title}
            type={props.type}
            taskAdd={modalIsVisible}
            closeModalHandler={closeModalHandler}
          />
        )}

        {props.title === "Tasks in Progress" && (
          <TaskListInProgress
            onIndicatorClick={updateList}
            title={props.title}
            itemDropped={refreshList}
            type={props.type}
            taskAdd={modalIsVisible}
            closeModalHandler={closeModalHandler}
          />
        )}

        {props.title === "Tasks Done" && (
          <TaskListDone
            newList={taskListUpdated}
            itemDropped={refreshList}
            title={props.title}
            type={props.type}
            taskAdd={modalIsVisible}
            closeModalHandler={closeModalHandler}
          />
        )}
      </TaskListCard>
    </>
  )
}

export default TasksCard
