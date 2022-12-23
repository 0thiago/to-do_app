import React, { useContext } from 'react';
import ReactDOM from 'react-dom';

import TaskListContext from '../../store/taskList-context';
import styled from 'styled-components';

const BackdropDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
`;

const ModalDiv = styled.div`
  background-color: #f2f2f2;
  width: 500px;
  padding: 30px;
  margin: 0 auto;
  border-radius: 8px;
  position: absolute;
  top: 40vh;
  left: calc(50vw - 250px);
  z-index: 100;
  overflow: hidden;
  border: 2px solid black;
  text-align: center;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 20px 0 0;
`;

const Button = styled.button`
  background-color: ${(props) => (props.yes ? 'lightgreen' : 'salmon')};
  padding: 5px;
  width: 15vw;
  font-size: 16px;
  font-weight: bold;
  border: none;
  border-radius: 5px;
  box-shadow: 2px 2px 2px #00000040;
  cursor: pointer;

  &:hover {
    filter: brightness(1.075);
  }

  &:active {
    box-shadow: inset 0 0 3px black;
  }
`;

const Backdrop = (props) => {
  return <BackdropDiv onClick={props.closeModal}></BackdropDiv>;
};

const ModalOverlay = (props) => {
  const ctx = useContext(TaskListContext);

  const removeTaskHandler = () => {
    ctx.removeTask(props.task);
  };

  return (
    <ModalDiv>
      <h4>
        Do you really want to remove <strong>"{props.task.name}"</strong>?
      </h4>
      <BtnContainer>
        <Button
          onClick={ctx.hideRemoveTaskModal}
          cancel
        >
          Cancel
        </Button>
        <Button
          onClick={removeTaskHandler}
          yes
        >
          Yes
        </Button>
      </BtnContainer>
    </ModalDiv>
  );
};

const portalElement = document.getElementById('overlays');

const RemoveTaskModal = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        portalElement
      )}
      {ReactDOM.createPortal(
        <ModalOverlay
          task={props.task}
        />,
        portalElement
      )}
    </>
  );
};

export default RemoveTaskModal;
