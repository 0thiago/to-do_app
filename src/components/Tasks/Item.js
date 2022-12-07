import React from "react"
import styled from "styled-components"
import Indicator from "../Layout/Indicator"

const Div = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 8px 16px 8px 12px;
`

const Span = styled.span`
  &:hover {
    cursor: pointer;
  }
`

const Title = styled.p`
  padding-bottom: 5px;

  &:hover {
    cursor: pointer;
  }
`
const onClickHandler = () => {
  console.log('oioi')
}

const Item = (props) => {
  return (
    <>
  
        
        <Title onClick={props.onClick}>{props.title}</Title>
   
    </>
  )
}

export default Item
