import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Fade from 'react-reveal/Fade';
import { Button, FormGroup, Input, Label, Alert } from 'reactstrap';
import { CHANGE_USER_PASSWORD_REQUEST } from 'redux/types';

import { Helmet } from 'react-helmet';
import { FirstContainer, FormContainer, SecondContainer } from './style';

function FindPassword() {
  const { isPasswordChange, errorMsg } = useSelector((state) => state.auth);
  const [localMsg, setLocalMsg] = useState('');
  const [form, setValue] = useState({
    email: '',
    password: '',
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
      <Helmet title="YLOG - 비밀번호 변경" />
      {isPasswordChange ? (
        <FirstContainer className="text-dark">
          <div className="d-flex justify-content-center">
            You've successfly changed your password
          </div>
          <div className="d-flex justify-content-center">
            <a href="/" className="text-decoration-none">
              GO HOME
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
            {localMsg ? (
              <Alert color="danger" style={{ width: '90%', marginLeft: '5%' }}>
                {localMsg}
              </Alert>
            ) : null}
            <div id="line" className="mb-4">
              Change Password
            </div>
            <FormContainer onSubmit={onSubmit}>
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
                  <Button style={{ width: '100%' }}>CHANGE PASSWORD</Button>
                </div>
              </FormGroup>
            </FormContainer>
          </SecondContainer>
        </Fade>
      )}
    </>
  );
}

export default FindPassword;
