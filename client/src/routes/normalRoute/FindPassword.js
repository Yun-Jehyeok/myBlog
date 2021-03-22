import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import {
  Button,
  Container,
  Form,
  FormGroup,
  Input,
  Label,
  Alert,
} from "reactstrap";
import { CHANGE_USER_PASSWORD_REQUEST } from "../../redux/types";

function FindPassword() {
  const { isPasswordChange, errorMsg } = useSelector((state) => state.auth);
  const [localMsg, setLocalMsg] = useState("");
  const [form, setValue] = useState({
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  useEffect(() => {
    try {
      setLocalMsg(errorMsg);
    } catch (e) {
      console.log(e);
    }
  }, [errorMsg]);

  const onChange = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { email, password } = form;
    const newData = { email, password };

    dispatch({
      type: CHANGE_USER_PASSWORD_REQUEST,
      payload: newData,
    });
  };

  return (
    <>
      {isPasswordChange ? (
        <Container className="text-dark" style={style.firstContainer}>
          <div className="d-flex justify-content-center">
            You've successfly changed your password
          </div>
          <div className="d-flex justify-content-center">
            <a href="/" className="text-decoration-none">
              GO HOME
            </a>
          </div>
        </Container>
      ) : (
        <Fade left>
          <Container className="mb-4" style={style.secondContainer}>
            <div
              className="d-flex justify-content-center bold mb-3 mt-4"
              style={{ fontSize: "2rem" }}
            >
              <a href="/" className="text-decoration-none text-dark">
                <b>Y&nbsp;</b>LOG
              </a>
            </div>
            {localMsg ? (
              <Alert color="danger" style={{ width: "90%", marginLeft: "5%" }}>
                {localMsg}
              </Alert>
            ) : null}
            <div id="line" className="mb-4">
              Change Password
            </div>
            <Form onSubmit={onSubmit} style={style.form}>
              <FormGroup>
                <Label for="email">EMAIL</Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={onChange}
                />
                <Label for="email" className="mt-4">
                  NEW PASSWORD
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="New Password"
                  onChange={onChange}
                />
                <div className="mt-4 d-flex justify-content-center pb-4">
                  <Button style={{ width: "100%" }}>CHANGE PASSWORD</Button>
                </div>
              </FormGroup>
            </Form>
          </Container>
        </Fade>
      )}
    </>
  );
}

const style = {
  firstContainer: {
    width: "50%",
    height: "63vh",
    marginTop: "14vh",
    border: "1px solid #212529",
    borderRadius: "5px",
    backgroundColor: "white",
    color: "black",
  },
  secondContainer: {
    width: "50%",
    marginTop: "14vh",
    border: "1px solid #212529",
    borderRadius: "5px",
    backgroundColor: "white",
    color: "black",
  },
  form: {
    width: "90%",
    marginLeft: "5%",
  },
};

export default FindPassword;
