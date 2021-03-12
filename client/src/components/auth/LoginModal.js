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
        className="text-decoration-none text-white p-0"
        style={style.loginLink}
      >
        LOGIN
      </NavLink>
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
              <div
                className="d-flex justify-content-end mt-3"
                style={style.register}
              >
                <span>아직 회원이 아니신가요?&nbsp;&nbsp;</span>
                <span>
                  <a href="/register" className="text-decoration-none">
                    REGISTER
                  </a>
                </span>
              </div>
            </FormGroup>
          </Form>
        </ModalBody>
      </Modal>
    </div>
  );
}

const style = {
  loginLink: { fontSize: "1.2rem" },
  modalHeader: { fontSize: "2rem" },
  loginButton: { marginTop: "2rem" },
  register: { fontSize: "0.8rem" },
};

export default LoginModal;
