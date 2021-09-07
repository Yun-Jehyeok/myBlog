import { Row } from 'reactstrap';
import styled from 'styled-components';

export const CategoryBox = styled(Row)`
  width: 96%;
  margin-left: 2%;
  background-color: ${(props) =>
    props.theme === 'dark' ? 'white' : '#212529'};
  color: ${(props) => (props.theme === 'dark' ? '#212529' : 'white')};
  border-left: 4px solid gray;
  border-right: 4px solid gray;
`;
