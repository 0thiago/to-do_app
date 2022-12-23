import styled from 'styled-components';
import { ElipseDoneTitle, ThreeDots } from '../../assets/imgs';

const Div = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 8px 16px 8px 12px;
`;

const Img = styled.img`
  height: min-content;
`;

const ImgDots = styled.img`
  height: min-content;
  padding: 8px 16px 8px 16px;
`;

const TaskHeader = (props) => {
  return (
    <>
      <Div>
        {props.title === 'Tasks Done' && (
          <Img
            src={ElipseDoneTitle}
            alt=''
          />
        )}
        <h1>{props.title}</h1>
      </Div>
      <ImgDots
        src={ThreeDots}
        alt='3 dots'
      />
    </>
  );
};

export default TaskHeader;
