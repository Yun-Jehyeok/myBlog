import styled from 'styled-components';

export const LoginLink = styled.a`
  font-size: 1.3rem;
  transition: all 0.5s linear;
  padding: 0;
`;

export const Register = styled.div`
  font-size: 0.8rem;
`;

export const TextLine = styled.div`
  display: flex;
  width: 95%;
  flex-basis: 100%;
  align-items: center;
  color: gray;
  margin-left: 2.5%;

  ::before,
  ::after {
    content: '';
    flex-grow: 1;
    background: #a6a6a6;
    height: 1px;
    font-size: 0;
    line-height: 0;
    margin: 0 16px;
  }
`;

export const EmailLogin = styled.div`
  width: 95%;
  margin-left: 2.5%;
`;
