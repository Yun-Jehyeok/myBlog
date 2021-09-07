import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
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
} from 'reactstrap';
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from 'redux/types';
import Google from '../auth/Google';
import { EmailLogin, LoginLink, Register, TextLine } from './style';

function LoginModal() {
  const [modal, setModal] = useState(false);
  const [localMsg, setLocalMsg] = useState('');
  const [form, setValues] = useState({
    email: '',
    password: '',
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
        <ModalHeader toggle={handleToggle} style={{ fontSize: '2rem' }}>
          <b>Y&nbsp;</b>LOG
        </ModalHeader>
        <ModalBody>
          {localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <TextLine className="mb-3">소셜 계정으로 로그인</TextLine>
              <Google />
              <TextLine className="mt-2 mb-2">이메일로 로그인</TextLine>
              <EmailLogin style={{ marginTop: '2rem' }}>
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
                <Button color="dark" style={{ marginTop: '2rem' }} block>
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
