import styled from "styled-components"

const Div = styled.div`
  text-align: center;
`

const Wrapper = (props) => {
  return (
    <Div>
      {props.children}
    </Div>
  )
}

export default Wrapper