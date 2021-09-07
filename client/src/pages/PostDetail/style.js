import { Container } from 'reactstrap';
import styled from 'styled-components';

export const Editor = styled.div`
  width: 100%;
  height: auto;
  min-height: 20vh;
  word-break: break-all;
`;

export const Wrap = styled(Container)`
  background-color: ${(props) =>
    props.theme === 'dark' ? '#212529' : 'white'};
  color: ${(props) => (props.theme === 'dark' ? 'white' : 'black')};
  min-height: 70vh;
  transition: all 0.5s linear;
`;
