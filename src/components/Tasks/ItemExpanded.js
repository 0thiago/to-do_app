import React, { useRef, useState } from "react"
import Button from "../UI/Button"
import Indicator from "../Layout/Indicator"
import styled from "styled-components"

const ItemExpandedContainer = styled.div`
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
`

const CloseButton = styled.button`
  background-color: #d64b4b;
  color: white;
  border: none;
  padding: 1.5px 6px;
  border-radius: 5px;
  font-size: 10px;
  font-weight: bold;
  margin-left: 300px;

  &:hover {
    cursor: pointer;
  }
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

const Input = styled.input`
  border: none;
  resize: none;
  background: #f2f2f2;
  font-size: 16px;
  color: #00000095;
  margin-left: 28px;

  &:hover {
    cursor: text;
  }

  &:focus {
    color: black;
    text-indent: 5px;
  }
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
  margin-bottom: 5px;
`

const ItemExpanded = (props) => {
  const [titleValue, setTitleValue] = useState(props.title)
  const [descriptionValue, setDescriptionValue] = useState(props.description)

  const titleRef = useRef()
  const descriptionRef = useRef()

  const onChangeTitleHandler = () => {
    const titleInput = titleRef.current.value
    setTitleValue(titleInput)
  }

  const onChangeDescriptionHandler = () => {
    const descriptionInput = descriptionRef.current.value
    setDescriptionValue(descriptionInput)
  }

  const onDiscardHandler = (button) => {
    props.onDiscard({
      taskName: props.title,
      button: button,
    })
  }

  const onSaveHandler = (button) => {
    button.preventDefault()
    props.onSave({
      taskId: props.id,
      taskName: titleValue,
      taskDescription: descriptionValue,
      taskStatus: props.type,
      button: button,
    })
  }

  return (
    <ItemExpandedContainer>
      <CloseButton onClick={props.collapse}>X</CloseButton>
      {props.input === false ? (
        <Title>
          {" "}
          <Indicator type={props.type} />
          <H3>{props.title}</H3>
        </Title>
      ) : (
        <Input
          ref={titleRef}
          onChange={onChangeTitleHandler}
          name="taskTitle"
          id="taskTitle"
          value={titleValue}
          type="text"
          placeholder={`${props.title || "Insert here the task name"}`}
        />
      )}
      <Content>
        <Hr />
        <Textarea
          ref={descriptionRef}
          onChange={onChangeDescriptionHandler}
          name="taskDescription"
          id="taskDescription"
          value={descriptionValue}
          cols="30"
          rows="10"
          placeholder={`${props.description || "Insert here your description"}`}
        ></Textarea>
        <BtnContainer>
          <Button onClick={onDiscardHandler} discard>
            Discard
          </Button>
          <Button onClick={onSaveHandler} save>
            Save task
          </Button>
        </BtnContainer>
      </Content>
    </ItemExpandedContainer>
  )
}

export default ItemExpanded
