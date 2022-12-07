import styled from "styled-components"
import Indicator from "../Layout/Indicator"

const Div = styled.div`
  background-color: #F3F3F3;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 4px solid #cfcfcf;
  border-radius: 12px;
  padding: 8px;
  width: 370px;
  margin: 0 auto 40px;
  box-shadow: 0 30px 30px #00000015;

  &:hover {
    cursor: pointer;
  }
`
const NewTask = () => {

  const onDragStartHandler = item => {
    item.dataTransfer.setData("new-item", item.target.title)
    console.log(item.target.title)

  }

  const onDragOverHandler = item => {
    item.stopPropagation()
  }

  return (
    <Div draggable onDragStart={onDragStartHandler} onDragOver={onDragOverHandler} title="NewTask" id="">
      <Indicator type='default' />
      <p>Start dragging this task to create a new one</p>
    </Div>
  )
}

export default NewTask
