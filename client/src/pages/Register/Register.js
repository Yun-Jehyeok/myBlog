import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { Button, FormGroup, Input, Label } from 'reactstrap';
import { REGISTER_REQUEST } from 'redux/types';
import { Helmet } from 'react-helmet';
import { FirstContainer, FormContainer, SecondContainer } from './style';

function Register() {
  const { isAuthenticated } = useSelector((state) => state.auth);

  const [form, setValue] = useState({
    name: '',
    email: '',
    password: '',
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
      <Helmet title="YLOG - 회원가입" />
      {isAuthenticated ? (
        <FirstContainer className="text-dark">
          <div className="d-flex justify-content-center">
            Congratulations! Register was successful.
          </div>
          <br />
          <div className="d-flex justify-content-center">
            <a href="/" className="text-decoration-none">
              HOME
            </a>
          </div>
        </FirstContainer>
      ) : (
        <Fade left>
          <SecondContainer className="mb-4">
            <div
              className="d-flex justify-content-center bold mb-3 mt-4"
              style={{ fontSize: '2rem' }}
            >
              <a href="/" className="text-decoration-none text-dark">
                <b>Y&nbsp;</b>LOG
              </a>
            </div>
            <div id="line" className="mb-4">
              REGISTER
            </div>
            <FormContainer onSubmit={onSubmit}>
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
                <div className="mt-4 d-flex justify-content-center pb-4">
                  <Button style={{ width: '100%' }}>REGISTER</Button>
                </div>
              </FormGroup>
            </FormContainer>
          </SecondContainer>
        </Fade>
      )}
    </>
  );
}

export default Register;
