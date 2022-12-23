import React, { useState, useContext } from 'react';

import TaskListContext from '../../../store/taskList-context';
import Indicator from '../../Layout/Indicator';
import ItemExpanded from './ItemExpanded';
import styled from 'styled-components';

const Li = styled.li``;

const DivItem = styled.div`
  display: ${(props) => (props.visible === true ? 'flex' : 'none')};
  align-items: center;
  justify-content: flex-start;
  padding: 8px 16px 8px 12px;
`;

const DivItemExpanded = styled.div`
  display: ${(props) => (props.visible === true ? 'block' : 'none')};
`;

const Title = styled.p`
  opacity: ${(props) => (props.dragged === true ? '0' : '1')};

  &:hover {
    cursor: pointer;
  }
`;

const Item = (props) => {
  const [dragged, setDragged] = useState(false);

  const ctx = useContext(TaskListContext);

  const onDragStartHandler = (task) => {
    const draggedTask = JSON.stringify(props.task);
    task.dataTransfer.setData('drag-task', draggedTask);
    setDragged(true);
  };

  const onDragLeaveHandler = (event) => {
    event.stopPropagation();
  };

  const onDragEndHandler = (event) => {
    setDragged(false);
  };

  const collapseHandler = () => {
    ctx.toggle(ctx.selectedTask);
  };

  const onIndicatorClickHandler = () => {
    ctx.updateTaskStatus(props.task);
  };

  return (
    <Li>
      <DivItem visible={ctx.selectedTask === props.task.id ? false : true}>
        <Indicator
          type={props.type}
          onClick={onIndicatorClickHandler}
        />
        <Title
          dragged={dragged}
          onClick={() => ctx.toggle(props.task.id)}
          draggable
          onDragStart={onDragStartHandler}
          onDragLeave={onDragLeaveHandler}
          onDragEnd={onDragEndHandler}
        >
          {props.title}
        </Title>
      </DivItem>
      <DivItemExpanded
        visible={ctx.selectedTask === props.task.id ? true : false}
      >
        <ItemExpanded
          task={props.task}
          collapse={collapseHandler}
        />
      </DivItemExpanded>
    </Li>
  );
};

export default Item;
