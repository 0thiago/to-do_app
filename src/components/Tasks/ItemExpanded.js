import React from "react"
import Button from "../UI/Button"
import Indicator from "../Layout/Indicator"
import styled from "styled-components"

const ItemExpandedContainer = styled.div`
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
`
const Title = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  height: 27px;
`

const H3 = styled.h3`
  width: 179px;
`

const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0px 0px 0px 28px;
  gap: 12px;
  width: 319.33px;
  height: 112px;

  ${(props) => props.children}
`
const Hr = styled.hr`
  width: 57px;
  border: 0.5px solid #00000045;
`

const Textarea = styled.textarea`
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
`

const BtnContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 8px;
`

const ItemExpanded = (props) => {

  const onDiscardHandler = (button) => {
    props.onDiscard({
      taskName: props.title,
      button: button,
    })
  }

  const saveHandler = (e) => {
    e.preventDefault()
  }

  return (
    <ItemExpandedContainer>
      <Title>
        <Indicator type={props.type} />
        <H3>{props.title}</H3>
      </Title>
      <Content>
        <Hr />
        <Textarea
          name="taskDescription"
          id="taskDescription"
          cols="30"
          rows="10"
          placeholder="Description"
        ></Textarea>
        <BtnContainer>
          <Button onClick={onDiscardHandler} discard>
            Discard
          </Button>
          <Button onClick={saveHandler} save>
            Save task
          </Button>
        </BtnContainer>
      </Content>
    </ItemExpandedContainer>
  )
}

export default ItemExpanded
