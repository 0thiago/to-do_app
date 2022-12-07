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
  // let listFromStorage = JSON.parse(localStorage.getItem("tasks"))

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

  // useEffect(() => {
  //   // listFromStorage = taskList
  //   const stringifiedTasks = JSON.stringify(taskList)
  //   localStorage.setItem("tasks", stringifiedTasks)
  //   console.log("localStorage Updated")
  // }, [taskList])

  const discardHandler = (item) => {
    item.button.preventDefault()

    setTaskList((prevState) =>
      prevState.filter((task) => task.name !== item.taskName)
    )

    const stringifiedTasks = JSON.stringify(taskList)
    localStorage.setItem("tasks", stringifiedTasks)
    console.log("localStorage Updated")

    setSelected(null)
  }

  const sortByID = (a, b) => {
    if (a.id === b.id) {
      return 0
    }
    return a.id - b.id
  }

  const saveHandler = (item) => {
    item.button.preventDefault()

    setTaskList((prevState) => {
      if (taskList.some((task) => task.id === item.taskId)) {
        return [
          {
            name: item.taskName,
            description: item.taskDescription,
            status: item.taskStatus,
            id: taskList.length + 1,
          },
          ...prevState,
        ].sort(sortByID)
      }
    })

    //UPDATE:
    // if (taskList.some((task) => task.id === item.taskId)) {
    //   setTaskList((prevState) =>
    //     prevState.filter((task) => task.id !== item.taskId)
    //   )

    //   setTaskList((prevState) => {
    //     return [
    //       {
    //         name: item.taskName,
    //         description: item.taskDescription,
    //         status: item.taskStatus,
    //         id: item.taskId,
    //       },
    //       ...prevState,
    //     ].sort(sortByID)
    //   })

    //   const stringifiedTasks = JSON.stringify(taskList)
    //   localStorage.setItem("tasks", stringifiedTasks)
    //   console.log("localStorage Updated")
    // }

    // taskList.forEach((task) => {
    //   if (task.id === item.taskId) {
    //     console.log(taskList)
    //     setTaskList((prevState) =>
    //       prevState.filter((task) => task.id !== item.taskId)
    //     )

    //     console.log(taskList)

    //     setTaskList((prevState) => {
    //       return [
    //         {
    //           name: item.taskName,
    //           description: item.taskDescription,
    //           status: item.taskStatus,
    //           id: item.taskId,
    //         },
    //         ...prevState,
    //       ].sort(sortByID)
    //     })

    //     console.log(taskList)

    //   }
    // })

    // if (taskList.includes(item.taskId) === false) {
    //   console.log(taskList)
    //   setTaskList((prevState) => {
    //     return [
    //       {
    //         name: item.taskName,
    //         description: item.taskDescription,
    //         status: item.taskStatus,
    //         id: taskList.length + 1,
    //       },
    //       ...prevState,
    //     ].sort(sortByID)
    //   })
    // }

    // console.log(taskList)

    setSelected(null)
  }

  const collapseItem = () => {
    setSelected(null)
  }

  let filteredTasks = []

  if (props.type === "todo") {
    filteredTasks = taskList.filter((task) => task.status === "todo")
  } else if (props.type === "inProgress") {
    filteredTasks = taskList.filter((task) => task.status === "inProgress")
  } else {
    filteredTasks = taskList.filter((task) => task.status === "done")
  }

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
                id={task.id}
                type={props.type}
                title={task.name}
                description={task.description}
                onDiscard={discardHandler}
                onSave={saveHandler}
                taskList={taskList}
                collapse={collapseItem}
              />
            </Div>
          </li>
        )
      })}
    </Ul>
  )
}

export default TaskList
