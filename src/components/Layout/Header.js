import logo from '../../assets/imgs/black-logo.png';
import styled from 'styled-components';

const Div = styled.div`
  text-align: center;
  padding: 55px 0;
`;

const Header = () => {
  return (
    <Div>
      <img
        src={logo}
        alt='logo'
      />
      <h1>Room of Toughts</h1>
      <p>Don't think, throw in the room</p>
    </Div>
  );
};

export default Header;
