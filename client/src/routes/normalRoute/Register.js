import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Fade from "react-reveal/Fade";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { REGISTER_REQUEST } from "../../redux/types";

function Register() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [form, setValue] = useState({
    name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();

  const onChange = (e) => {
    setValue({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const onSubmit = (e) => {
    e.preventDefault();

    const { name, email, password } = form;
    const newUser = { name, email, password };

    dispatch({
      type: REGISTER_REQUEST,
      payload: newUser,
    });
  };

  return (
    <>
      {isAuthenticated ? (
        <Container
          className="d-flex justify-content-center text-dark"
          style={style.firstContainer}
        >
          <div>회원가입에 성공하셨습니다.</div>
          <br />
          <div>
            <a href="/" className="text-decoration-none">
              HOME
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
            <div id="line" className="mb-4">
              REGISTER
            </div>
            <Form onSubmit={onSubmit} style={style.form}>
              <FormGroup>
                <Label for="name">NAME</Label>
                <Input
                  type="name"
                  name="name"
                  id="name"
                  placeholder="Name"
                  onChange={onChange}
                />
                <Label for="email" className="mt-4">
                  EMAIL
                </Label>
                <Input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  onChange={onChange}
                />
                <Label for="password" className="mt-4">
                  PASSWORD
                </Label>
                <Input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Password"
                  onChange={onChange}
                />
                <div className="mt-4 d-flex justify-content-center">
                  <Button style={{ width: "100%" }}>RESISTER</Button>
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
    height: "68vh",
    marginTop: "14vh",
    border: "1px solid #212529",
    borderRadius: "5px",
    backgroundColor: "white",
    color: "black",
  },
  secondContainer: {
    width: "50%",
    height: "68vh",
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
export default Register;
