import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
          style={{
            marginTop: "10%",
            marginBottom: "10%",
            backgroundColor: "white",
            borderRadius: "5%",
            height: "30vh",
            lineHeight: "30vh",
            width: "50%",
            marginLeft: "",
          }}
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
        <Container className="mt-5" style={{ height: "70vh" }}>
          <Form onSubmit={onSubmit} style={{ width: "60%", marginLeft: "20%" }}>
            <FormGroup>
              <Label for="name">NAME</Label>
              <Input
                type="name"
                name="name"
                id="name"
                placeholder="Name"
                onChange={onChange}
              />
              <Label for="email">EMAIL</Label>
              <Input
                type="email"
                name="email"
                id="email"
                placeholder="Email"
                onChange={onChange}
              />
              <Label for="password" className="mt-3">
                PASSWORD
              </Label>
              <Input
                type="password"
                name="password"
                id="password"
                placeholder="Password"
                onChange={onChange}
              />
              <Button className="mt-3">RESISTER</Button>
            </FormGroup>
          </Form>
        </Container>
      )}
    </>
  );
}

export default Register;
