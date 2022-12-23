import React from 'react';

import styled from 'styled-components';

const Ipt = styled.input`
  border: none;
  resize: none;
  background: #f2f2f2;
  font-size: 16px;
  border: ${(props) =>
    props.valid === false ? '2px solid red' : '2px solid #00000095'};

  &:hover {
    cursor: text;
  }

  &:focus {
    color: black;
    text-indent: 5px;
  }
`;

const Span = styled.span`
  color: red;
  font-weight: bold;
`;

const Input = React.forwardRef((props, ref) => {
  return (
    <div>
      <Ipt
        ref={ref}
        valid={props.valid}
        onBlur={props.onBlur}
        onChange={props.onChange}
        {...props.input}
      />
      {!props.valid && <Span> x</Span>}
    </div>
  );
});

export default Input;
