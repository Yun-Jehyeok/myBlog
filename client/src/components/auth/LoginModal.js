import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Alert,
  Button,
  Form,
  FormGroup,
  Input,
  Modal,
  ModalBody,
  Label,
  ModalHeader,
} from "reactstrap";
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from "../../redux/types";
import Google from "./Google";
import styled from "styled-components";

const LoginLink = styled.a`
  font-size: 1.3rem;
  transition: all 0.5s linear;
  padding: 0;
`;
const Register = styled.div`
  font-size: 0.8rem;
`;
const TextLine = styled.div`
  display: flex;
  width: 95%;
  flex-basis: 100%;
  align-items: center;
  color: gray;
  margin-left: 2.5%;

  ::before,
  ::after {
    content: "";
    flex-grow: 1;
    background: #a6a6a6;
    height: 1px;
    font-size: 0;
    line-height: 0;
    margin: 0 16px;
  }
`;
const EmailLogin = styled.div`
  width: 95%;
  margin-left: 2.5%;
`;

function LoginModal() {
  const style = {
    modalHeader: { fontSize: "2rem" },
    loginButton: { marginTop: "2rem" },
  };

  const [modal, setModal] = useState(false);
  const [localMsg, setLocalMsg] = useState("");
  const [form, setValues] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const { errorMsg } = useSelector((state) => state.auth);

  useEffect(() => {
    try {
      setLocalMsg(errorMsg);
    } catch (e) {
      console.log(e);
    }
  }, [errorMsg]);

  const handleToggle = () => {
    dispatch({
      type: CLEAR_ERROR_REQUEST,
    });

    setModal(!modal);
  };

  const onChange = (e) => {
    setValues({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const { email, password } = form;
    const user = { email, password };

    dispatch({
      type: LOGIN_REQUEST,
      payload: user,
    });
  };

  return (
    <div>
      <LoginLink
        onClick={handleToggle}
        href="#"
        className={`text-decoration-none text-secondary p-0`}
      >
        LOGIN
      </LoginLink>
      <Modal
        isOpen={modal}
        toggle={handleToggle}
        className="custom-modal-style text-dark"
      >
        <ModalHeader toggle={handleToggle} style={style.modalHeader}>
          <b>Y&nbsp;</b>LOG
        </ModalHeader>
        <ModalBody>
          {localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <TextLine className="mb-3">소셜 계정으로 로그인</TextLine>
              <Google />
              <TextLine className="mt-2 mb-2">이메일로 로그인</TextLine>
              <EmailLogin style={style.emailLogin}>
                <Label for="email">Email</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={onChange}
                />
                <Label for="password" className="mt-3">
                  Password
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={onChange}
                />
                <Button color="dark" style={style.loginButton} block>
                  LOGIN
                </Button>
              </EmailLogin>
              <Register className="d-flex justify-content-center mt-3">
                <span>
                  <a href="/findpassword" className="text-decoration-none">
                    Forgot Password?
                  </a>
                </span>
              </Register>
              <Register className="d-flex justify-content-center mt-1">
                <span>Not a member?&nbsp;&nbsp;</span>
                <span>
                  <a href="/register" className="text-decoration-none">
                    REGISTER
                  </a>
                </span>
              </Register>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default LoginModal;
