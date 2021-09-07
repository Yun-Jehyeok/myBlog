import styled from 'styled-components';
import { Container } from 'reactstrap';

export const Wrap = styled(Container)`
  margin-top: 5vh;
  height: 65vh;
`;

export const GoPost = styled.a`
  width: auto;
  background-color: ${(props) =>
    props.theme === 'dark' ? '#212529' : 'white'};
  color: ${(props) => (props.theme === 'dark' ? 'white' : '#212529')};
`;
