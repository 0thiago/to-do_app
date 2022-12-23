import React, { useRef, useState, useEffect, useContext } from 'react';

import TaskListContext from '../../store/taskList-context';
import Button from '../UI/Button';
import Input from '../UI/Input';
import Textarea from '../UI/Textarea';
import styled from 'styled-components';

const FormContainer = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  padding: 20px 14px 14px 12px;
  gap: 8px;
  width: 345.33px;
  height: 200px;
  background: #f2f2f2;
  border-radius: 20px;
  z-index: 100;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  padding: 0px 0px 0px 28px;
  gap: 12px;
  width: 319.33px;
  height: 152px;

  ${(props) => props.children}
`;

const IptContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 10px;
`;

const Div = styled.div`
  height: 20px;
`;

const Hr = styled.hr`
  width: 57px;
  border: 0.5px solid #00000045;
`;

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
  margin-top: 20px;
`;

const TaskAdd = (props) => {
  const ctx = useContext(TaskListContext);

  const [titleValid, setTitleValid] = useState(true);

  const titleRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    titleRef.current.focus();
  }, []);

  const onBlurHandler = () => {
    if (titleRef.current.value !== '') {
      setTitleValid(true);
    }
  };

  const onSubmitHandler = (button) => {
    button.preventDefault();

    let date = new Date().toLocaleString();
    let taskId = Date.parse(date);
    let taskCreationDate = date;

    if (titleRef.current.value === '') {
      setTitleValid(false);
    } else {
      setTitleValid(true);

      const task = {
        id: taskId,
        name: titleRef.current.value,
        description: descriptionRef.current.value,
        status: props.type,
        creationDate: taskCreationDate,
      };

      ctx.addTask(task);

      props.collapse();
    }
  };

  return (
    <FormContainer onSubmit={onSubmitHandler}>
      <Content>
        <h3>New Task</h3>
        <IptContainer>
          <Input
            ref={titleRef}
            onBlur={onBlurHandler}
            valid={titleValid}
            input={{
              type: 'text',
              placeholder: 'Insert here the task title',
            }}
          />
          <Hr />
        </IptContainer>
        <Div>
          <Textarea
            ref={descriptionRef}
            textarea={{
              name: 'taskDescription',
              cols: '30',
              rows: '2',
              placeholder: 'Insert the description here',
            }}
          />
        </Div>
        <BtnContainer>
          <Button
            onClick={props.collapse}
            discard
          >
            Discard
          </Button>
          <Button save>Save task</Button>
        </BtnContainer>
      </Content>
    </FormContainer>
  );
};

export default TaskAdd;