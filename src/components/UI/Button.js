import styled from 'styled-components';
import { SaveIcon, DiscardIcon } from '../../assets/imgs';

const Btn = styled.button`
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 4px 16px;
  width: 140px;
  height: 30px;
  border-radius: 8px;
  background: ${(props) => (props.model === 'discard' ? '#e7d6d6' : '#dadee9')};

  &:hover {
    cursor: pointer;
  }
`;

const Button = (props) => {
  let buttonIcon;
  let model;

  if (props.discard) {
    buttonIcon = DiscardIcon;
    model = 'discard';
  } else if (props.save) {
    buttonIcon = SaveIcon;
    model = 'save';
  }

  return (
    <Btn
      type={props.type}
      onClick={props.onClick}
      model={model}
    >
      <img
        src={buttonIcon}
        alt={`${props.type} button`}
      />
      <h3 data-task={props.task}>{props.children}</h3>
    </Btn>
  );
};

export default Button;
