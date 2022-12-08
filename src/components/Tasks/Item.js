import React from "react"
import styled from "styled-components"

const Title = styled.p`
  padding-bottom: 5px;

  &:hover {
    cursor: pointer;
  }
`

const Item = (props) => {
  return (
      <Title onClick={props.onClick}>{props.title}</Title>
  )
}

export default Item
