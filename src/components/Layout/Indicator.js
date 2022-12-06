import React from "react"
import { ElipseClosed, ElipseDone, ElipseOpen } from "../../assets/imgs"
import styled from "styled-components"

const Img = styled.img`
  margin-right: 8px;
`
const Indicator = (props) => {
  let indicatorType

  if (props.type === "todo") {
    indicatorType = ElipseClosed
  } else if (props.type === "done") {
    indicatorType = ElipseDone
  } else {
    indicatorType = ElipseOpen
  }

  return <Img src={indicatorType} alt="indicator" />
}

export default Indicator
