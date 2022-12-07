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

const ModalDiv = styled.div`
  background-color: #f2f2f2;
  width: fit-content;
  margin: 0 auto;
  border-radius: 8px;
  position: fixed;
  top: 40vh;
  left: 38.2vw;
  z-index: 100;
  overflow: hidden;
`

const Backdrop = (props) => {
  return <BackdropDiv onClick={props.closeModal}></BackdropDiv>
}

const ModalOverlay = (props) => {
  return (
    <ModalDiv>
      <ItemExpanded type={props.type} title={props.title} description={`${props.description || ''}`} input={true} collapse={props.collapse} onDiscard={props.onDiscard} onSave={props.onSave} />
    </ModalDiv>
  )
}

const NewTaskModal = (props) => {

  return (
    <>
      {ReactDOM.createPortal(
        <Backdrop closeModal={props.closeModal} />,
        document.getElementById("backdrop-root")
      )}
      {ReactDOM.createPortal(
        <ModalOverlay 
          collapse={props.collapse}
          type={props.type}
          title={props.title}
          description={`${props.description || ''}`}
          onDiscard={props.onDiscard}
          onSave={props.onSave}
          // closeModal={props.isVisible} 
          // title={props.error.title}
          // message={props.error.message}
        />,
        document.getElementById("overlay-root")
      )}
    </>
  )
}

export default NewTaskModal
