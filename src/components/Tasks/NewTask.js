import React, { useState, useContext } from 'react';

import TaskListContext from '../../store/taskList-context';
import styled from 'styled-components';
import Indicator from '../Layout/Indicator';

const Div = styled.div`
  background-color: #f3f3f3;
  display: flex;
  opacity: ${(props) => (props.dragged === true ? '0' : '1')};
  align-items: center;
  justify-content: center;
  border: 4px solid #cfcfcf;
  border-radius: 12px;
  padding: 8px;
  width: 370px;
  margin: 0 auto 40px;
  box-shadow: 0 30px 30px #00000015;

  &:hover {
    cursor: pointer;
  }
`;
const NewTask = () => {
  const ctx = useContext(TaskListContext);

  const [dragged, setDragged] = useState(false);

  const onDragStartHandler = (item) => {
    ctx.closeNewTaskWindow(true);

    ctx.toggle(ctx.selectedTask);

    item.dataTransfer.setData('new-item', item.target.title);

    setTimeout(() => {
      setDragged(true);
    }, 0);
  };

  const onDragOverHandler = (item) => {
    item.stopPropagation();
  };

  const onDragLeaveHandler = (event) => {
    event.stopPropagation();
  };

  const onDragEndHandler = () => {
    setDragged(false);
    ctx.closeNewTaskWindow(false);
  };

  return (
    <Div
      draggable
      dragged={dragged}
      onDragStart={onDragStartHandler}
      onDragOver={onDragOverHandler}
      onDragLeave={onDragLeaveHandler}
      onDragEnd={onDragEndHandler}
      title='NewTask'
      id=''
    >
      <Indicator type='default' />
      <p>Start dragging this task to create a new one</p>
    </Div>
  );
};

export default NewTask;
