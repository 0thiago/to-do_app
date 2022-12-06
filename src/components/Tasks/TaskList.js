import React, { useState, useContext, useEffect } from "react"
import styled from "styled-components"
import Item from "./Item"
import ItemExpanded from "./ItemExpanded"
import TaskListContext from "../../context/taskList-context"

const Ul = styled.ul`
  margin: 15px 0;
  list-style: none;
`

const Div = styled.div`
  display: ${(props) => (props.visible === true ? "block" : "none")};
`

const TaskList = (props) => {
  const [selected, setSelected] = useState(null)
  const [taskList, setTaskList] = useState([])

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null)
    }

    setSelected(i)
  }

  useEffect(() => {
    let storedItems = localStorage.getItem("tasks")
    try {
      storedItems = JSON.parse(storedItems)
      setTaskList(storedItems)
    } catch {
      // localStorage.removeItem("tasks")
      console.log("erro")
    }
  }, [])

  useEffect(() => {
    const stringifiedTasks = JSON.stringify(taskList)
    console.log(taskList)
    localStorage.setItem("tasks", stringifiedTasks)
  }, [taskList])

  const discardHandler = (item) => {
    item.button.preventDefault()
    setTaskList((prevState) =>
      prevState.filter((task) => task.name !== item.taskName)
    )
  }

  let filteredTasks = [];
  if (props.type === 'todo') {
      filteredTasks = taskList.filter(task => task.status === 'todo');
  } else if (props.type === 'inProgress') {
      filteredTasks = taskList.filter(task => task.status === 'inProgress');
  } else {
      filteredTasks = taskList.filter(task => task.status === 'done');
  }

  // let filteredTasks = []

  // if (props.type === "todo") {
  //   filteredTasks = taskList.filter((task) => task.status === "todo")
  // } else if (props.type === "inProgress") {
  //   filteredTasks = taskList.filter((task) => task.status === "inProgress")
  // } else {
  //   filteredTasks = taskList.filter((task) => task.status === "done")
  // }

  // let taskList = []

  // let taskListFromStorage = JSON.parse(localStorage.getItem("tasks"))

  // const discardHandler = (item) => {
  //   item.button.preventDefault()

  //   taskListFromStorage = taskListFromStorage.filter(
  //     (task) => task.name !== item.taskName
  //   )

  //   let taskListFromStorageJSON = JSON.stringify(taskListFromStorage)

  //   localStorage.setItem("tasks", taskListFromStorageJSON)
  // }

  return (
    <Ul>
      {filteredTasks.map((task, i) => {
        return (
          <li key={`${task.status}li${i}`}>
            <Div visible={selected === i ? false : true}>
              <Item
                onClick={() => toggle(i)}
                title={task.name}
                type={props.type}
              />
            </Div>
            <Div visible={selected === i ? true : false}>
              <ItemExpanded
                type={props.type}
                title={task.name}
                onDiscard={discardHandler}
                taskList={taskList}
              />
            </Div>
          </li>
        )
      })}
    </Ul>
  )
}

export default TaskList
