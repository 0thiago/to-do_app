import React, { useState, useContext, useEffect } from 'react';

import TaskHeader from './TaskHeader';
import TaskListContext from '../../store/taskList-context';
import TaskAdd from './TaskAdd';

import styled from 'styled-components';
import TaskList from './TaskList';

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
`;

const TasksCard = (props) => {
  const ctx = useContext(TaskListContext);
  const [newTaskCardIsVisible, setNewTaskCardIsVisible] = useState(false);

  useEffect(() => {
    if (ctx.closeNewTask === true) {
      setNewTaskCardIsVisible(false);
    }
  }, [ctx.closeNewTask]);

  const onDragOverHandler = (e) => {
    e.preventDefault();
  };

  const onDropHandler = (event) => {
    event.preventDefault();

    const dropEvent = event.dataTransfer.getData('new-item');

    if (dropEvent === 'NewTask') {
      setNewTaskCardIsVisible(true);
    } else {
      const draggedTask = JSON.parse(event.dataTransfer.getData('drag-task'));

      ctx.dropTask({ draggedTask: draggedTask, newStatus: props.title });
    }
  };

  const collapseHandler = () => {
    setNewTaskCardIsVisible(false);
  };

  return (
    <TaskListCard
      onDrop={onDropHandler}
      onDragOver={onDragOverHandler}
    >
      <TaskHeader title={props.title} />
      {newTaskCardIsVisible && (
        <TaskAdd
          collapse={collapseHandler}
          type={props.type}
        />
      )}
      <TaskList type={props.type} />
    </TaskListCard>
  );
};

export default TasksCard;