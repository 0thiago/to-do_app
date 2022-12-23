import React from 'react';

import styled from 'styled-components';

const Txtarea = styled.textarea`
  border: none;
  resize: none;
  background: #f2f2f2;
  font-size: 16px;
  color: #00000095;

  &:hover {
    cursor: text;
  }

  &:focus {
    color: black;
    text-indent: 5px;
  }
`;

const Textarea = React.forwardRef((props, ref) => {
  return (
    <Txtarea
      ref={ref}
      {...props.textarea}
    />
  );
});

export default Textarea;
