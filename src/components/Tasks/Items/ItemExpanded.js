import React, {
  useRef,
  useState,
  useEffect,
  useContext,
  useReducer,
} from 'react';

import TaskListContext from '../../../store/taskList-context';
import Button from '../../UI/Button';
import Input from '../../UI/Input';
import Textarea from '../../UI/Textarea';
import styled from 'styled-components';
import Indicator from '../../Layout/Indicator';

const FormContainer = styled.form`
  position: static;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  padding: 20px 14px 14px 12px;
  gap: 8px;
  width: 345.33px;
  height: 181px;
  background: #f2f2f2;
  border-radius: 20px;
  z-index: 100;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 0;
  right: 10px;
  background-color: #d64b4b;
  color: white;
  border: none;
  padding: 1.5px 6px;
  border-radius: 5px;
  font-size: 10px;
  font-weight: bold;
  margin-left: 180px;

  &:hover {
    cursor: pointer;
  }
`;

const TitleContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 0.25rem;
  width: 100%;
`;

const H3 = styled.h3``;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 0px 28px;
  gap: 12px;
  width: 319.33px;
  height: 112px;

  ${(props) => props.children}
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
  margin-bottom: 5px;
`;

const reducer = (state, action) => {
  console.log(action.value);

  if (action.type === 'TYPING') {
    if (action.value.trim() > 0) {
      return {
        value: action.value,
        isValid: true,
      };
    } else {
      return {
        value: state.value,
        isValid: false,
      };
    }
  }

  if (action.type === 'BLUR') {
    console.log(action.value.trim());
    console.log(state.value);

    if (!action.value.trim() > 0) {
      return {
        value: state.value,
        isValid: true,
      };
    } else {
      return {
        value: action.value,
        isValid: true,
      };
    }
  }
};

const ItemExpanded = (props) => {
  const ctx = useContext(TaskListContext);

  const [taskName, dispatch] = useReducer(reducer, {
    value: props.task.name,
    isValid: true,
  });

  const [editTitleIsVisible, setEditTitleIsVisible] = useState(false);

  const titleRef = useRef();
  const descriptionRef = useRef();

  useEffect(() => {
    if (editTitleIsVisible) {
      titleRef.current.focus();
    }
  }, [editTitleIsVisible]);

  const onTitleChangeHandler = (event) => {
    dispatch({ type: 'TYPING', value: titleRef.current.value });
    console.log(titleRef.current.value);
  };

  const onBlurHandler = () => {
    dispatch({ type: 'BLUR', value: titleRef.current.value });

    if (!taskName.isValid) {
    }

    setEditTitleIsVisible(false);
  };

  const onSubmitHandler = (button) => {
    button.preventDefault();

    const updatedTask = {
      id: props.task.id,
      name: taskName.value,
      description: descriptionRef.current.value,
      status: props.task.status,
      creationDate: props.task.creationDate,
    };

    ctx.updateTask(updatedTask);

    props.collapse();
  };

  const onTitleClickHandler = () => {
    setEditTitleIsVisible(true);
  };

  const onDiscardHandler = (button) => {
    button.preventDefault();

    ctx.showRemoveTaskModal({
      id: props.task.id,
      name: props.task.name,
    });
  };

  return (
    <FormContainer onSubmit={onSubmitHandler}>
      <TitleContainer>
        <Indicator type={props.task.status} />
        {!editTitleIsVisible ? (
          <H3 onClick={onTitleClickHandler}>{`${
            taskName.isValid ? taskName.value : props.task.name
          }`}</H3>
        ) : (
          <Input
            onChange={onTitleChangeHandler}
            ref={titleRef}
            onBlur={onBlurHandler}
            valid={taskName.isValid}
            value={taskName.value}
            input={{
              type: 'text',
              placeholder: taskName.value,
            }}
          />
        )}
        <CloseButton onClick={props.collapse}>X</CloseButton>
      </TitleContainer>
      <Content>
        <Hr />
        <Textarea
          ref={descriptionRef}
          textarea={{
            name: 'taskDescription',
            cols: '30',
            rows: '10',
            placeholder: `${
              props.task.description || 'Insert the description here'
            }`,
          }}
        />
        <BtnContainer>
          <Button
            onClick={onDiscardHandler}
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

export default ItemExpanded;