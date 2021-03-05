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
  NavLink,
} from "reactstrap";
import { CLEAR_ERROR_REQUEST, LOGIN_REQUEST } from "../../redux/types";

function LoginModal() {
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
    console.log(user);

    dispatch({
      type: LOGIN_REQUEST,
      payload: user,
    });
  };

  return (
    <div>
      <NavLink
        onClick={handleToggle}
        href="#"
        className="text-decoration-none text-dark"
      >
        Login
      </NavLink>
      <Modal isOpen={modal} toggle={handleToggle} className="text-dark">
        <ModalHeader toggle={handleToggle}> Login</ModalHeader>
        <ModalBody>
          {localMsg ? <Alert color="danger">{localMsg}</Alert> : null}
          <Form onSubmit={onSubmit}>
            <FormGroup>
              <Label for="email">이메일</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
              />
              <Label for="password">패스워드</Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChange}
              />
              <Button color="dark" style={{ marginTop: "2rem" }} block>
                LOGIN
              </Button>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

export default LoginModal;
