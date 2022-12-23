import React from 'react';
import { ElipseClosed, ElipseDone, ElipseOpen } from '../../assets/imgs';
import styled from 'styled-components';

const Img = styled.img`
  margin-right: 8px;
  height: fit-content;
`;
const Indicator = (props) => {
  let indicatorType;

  if (props.type === 'todo') {
    indicatorType = ElipseClosed;
  } else if (props.type === 'done') {
    indicatorType = ElipseDone;
  } else {
    indicatorType = ElipseOpen;
  }

  return (
    <Img
      onClick={props.onClick}
      src={indicatorType}
      alt='indicator'
      data-task={props.task}
    />
  );
};

export default Indicator;
