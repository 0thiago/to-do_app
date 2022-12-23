import React, { useState, useEffect, useContext } from 'react';

import TaskListContext from '../../store/taskList-context';
import Item from './Items/Item';
import styled from 'styled-components';

const Ul = styled.ul`
  margin: 15px 0;
  list-style: none;
`;

const TaskList = (props) => {
  const ctx = useContext(TaskListContext);

  const [todoList, setTodoList] = useState([]);
  const [inProgressList, setInProgressList] = useState([]);
  const [doneList, setDoneList] = useState([]);

  useEffect(() => {
    const todoList = ctx.taskList.filter((task) => task.status === 'todo');
    setTodoList(todoList);

    const inProgressList = ctx.taskList.filter(
      (task) => task.status === 'inProgress'
    );
    setInProgressList(inProgressList);

    const doneList = ctx.taskList.filter((task) => task.status === 'done');
    setDoneList(doneList);
  }, [ctx.taskList]);

  return (
    <Ul>
      {props.type === 'todo' &&
        todoList.map((task, i) => {
          return (
            <Item
              key={task.id}
              index={i}
              type={props.type}
              title={task.name}
              task={{ ...task }}
            />
          );
        })}
      {props.type === 'inProgress' &&
        inProgressList.map((task, i) => {
          return (
            <Item
              key={task.id}
              index={i}
              type={props.type}
              title={task.name}
              task={{ ...task }}
            />
          );
        })}
      {props.type === 'done' &&
        doneList.map((task, i) => {
          return (
            <Item
              key={task.id}
              index={i}
              type={props.type}
              title={task.name}
              task={{ ...task }}
            />
          );
        })}
    </Ul>
  );
};

export default TaskList;
