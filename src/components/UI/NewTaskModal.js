import ReactDOM from "react-dom" //to use createPortal
import styled from "styled-components"
import ItemExpanded from "../Tasks/ItemExpanded"


const BackdropDiv = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  z-index: 10;
  background: rgba(0, 0, 0, 0.75);
`

const Backdrop = (props) => {
  return <BackdropDiv onClick={props.closeModal}></BackdropDiv>
}

const ModalOverlay = (props) => {
  return (
    <ItemExpanded />
  )
}

const ErrorModal = (props) => {

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.isVisible} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay 
          closeModal={props.isVisible} 
          title={props.error.title}
          message={props.error.message}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  )
}

export default ErrorModal
