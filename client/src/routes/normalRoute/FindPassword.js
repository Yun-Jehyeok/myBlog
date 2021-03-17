import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import Fade from "react-reveal/Fade";
import { Button, Container, Form, FormGroup, Input, Label } from "reactstrap";
import { FIND_USER_PASSWORD_REQUEST } from "../../redux/types";

// 1. 이름과 이메일 인증
// 2. 이름과 이메일이 같은 유저가 있으면 비밀번호 재설정 창으로 이동
// 3. 비밀번호 재설정
// 4. 완료
// 오... ㅈㄴ 어려운데...

function FindPassword() {
  const [findPassword, setFindPassword] = useState(false);
  const [form, setValue] = useState({
    name: "",
    email: "",
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

    const { name, email } = form;
    const findUserPassword = { name, email };

    dispatch({
      type: FIND_USER_PASSWORD_REQUEST,
      payload: findUserPassword,
    });

    setFindPassword(true);
  };

  const onClickHome = () => {
    setFindPassword(false);
  };

  return (
    <>
      {findPassword ? (
        <Container
          className="d-flex justify-content-center text-dark"
          style={style.firstContainer}
        >
          <div>회원가입에 성공하셨습니다.</div>
          <br />
          <div>
            <Link to="/" className="text-decoration-none" onClick={onClickHome}>
              HOME
            </Link>
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
              Find Password
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
                <div className="mt-4 d-flex justify-content-center">
                  <Button style={{ width: "100%" }}>FIND</Button>
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
    height: "57vh",
    marginTop: "14vh",
    border: "1px solid #212529",
    borderRadius: "5px",
    backgroundColor: "white",
    color: "black",
  },
  secondContainer: {
    width: "50%",
    height: "57vh",
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
