import React, { useState, useEffect } from "react"
import styled from "styled-components"
import Item from "./Item"
import ItemExpanded from "./ItemExpanded"
import TaskAdd from "./TaskAdd"
import Indicator from "../Layout/Indicator"

const Ul = styled.ul`
  margin: 15px 0;
  list-style: none;
`

const Div = styled.div`
  width: fit-content;
  display: ${(props) => (props.visible === true ? "block" : "none")};
`

const DivItem = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 16px 8px 12px;
`

const Span = styled.span`
  &:hover {
    cursor: pointer;
  }
`

const TaskList = (props) => {
  const [selected, setSelected] = useState(null)
  const [taskList, setTaskList] = useState(() => {
    let storedItems = JSON.parse(localStorage.getItem("inProgress"))

    if (storedItems === null) {
      return []
    } else {
      storedItems.filter((task) => task.status === "inProgress")
      return storedItems
    }
  })

  useEffect(() => {
    let storedItems = JSON.parse(localStorage.getItem("inProgress"))

    if (storedItems === null) {
      return []
    } else {
      setTaskList(storedItems)
    }
  }, [props.itemDropped])

  const toggle = (i) => {
    if (selected === i) {
      return setSelected(null)
    }

    setSelected(i)
  }

  useEffect(() => {
    const stringifiedTasks = JSON.stringify(taskList)
    localStorage.setItem("inProgress", stringifiedTasks)
    console.log("localStorage Updated")
  }, [taskList])

  const discardHandler = (item) => {
    item.button.preventDefault()

    setTaskList((prevState) =>
      prevState.filter((task) => task.name !== item.taskName)
    )

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

    if (taskList.some((task) => task.id === item.taskId)) {
      setTaskList((prevState) =>
        prevState.filter((task) => task.id !== item.taskId)
      )

      setTaskList((prevState) => {
        return [
          {
            name: item.taskName,
            description: item.taskDescription,
            status: item.taskStatus,
            id: item.taskId,
          },
          ...prevState,
        ].sort(sortByID)
      })
    } else {
      setTaskList((prevState) => {
        return [
          {
            name: item.taskName,
            description: item.taskDescription,
            status: item.taskStatus,
            id: taskList.length + 1,
          },
          ...prevState,
        ].sort(sortByID)
      })
    }

    setSelected(null)
  }

  const collapseItem = () => {
    setSelected(null)
  }

  const onDragStartHandler = (item) => {
    console.log(item.target.id)
    const currentTask = JSON.stringify(item.target.id)
    console.log(currentTask)

    item.dataTransfer.setData("drag-item", item.target.id)
  }

  const onDragOverHandler = (item) => {
    console.log(item.target)
  }

  const onDragEndHandler = (item) => {
    item.target.style.display = "block"

    let storedItems = JSON.parse(localStorage.getItem("inProgress"))

    if (storedItems === null) {
      return []
    } else {
      setTaskList(storedItems)
    }
  }

  const onDragLeaveHandler = (item) => {
    item.stopPropagation()
    let storedItems = JSON.parse(localStorage.getItem("inProgress"))

    if (storedItems === null) {
      return []
    } else {
      setTaskList(storedItems)
    }
  }

  return (
    <Ul>
      {props.taskAdd && (
        <TaskAdd
          type={props.type}
          onDiscard={discardHandler}
          onSave={saveHandler}
          collapse={props.closeModalHandler}
        />
      )}
      {taskList.map((task, i) => {
        return (
          <li key={`${task.status}li${i}`}>
            <Div
              keyID={`${task.status}i${i}`}
              visible={selected === i ? false : true}
              draggable
              dataItem="item-1"
              title={props.title}
              id={`${JSON.stringify({
                name: task.name,
                id: task.id,
                status: task.status,
                description: task.description,
              })}`}
              TaskID={task.id}
              status={task.status}
              name={task.name}
              description={task.description}
              onDragStart={(item) => onDragStartHandler(item)}
              onDragOver={onDragOverHandler}
              onDragEnd={onDragEndHandler}
              onDragLeave={onDragLeaveHandler}
            >
              <DivItem>
                <Span>
                  <Indicator type={props.type} onClick={props.onClickIcon} />
                </Span>
                <Item
                  onClick={() => toggle(i)}
                  title={task.name}
                  type={props.type}
                />
              </DivItem>
            </Div>
            <Div visible={selected === i ? true : false}>
              <ItemExpanded
                key={Math.random().toString()}
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
