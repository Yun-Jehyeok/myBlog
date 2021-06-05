import React, { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import Fade from "react-reveal/Fade";
import { Helmet } from "react-helmet";
import styled from "styled-components";

function Main({ theme }) {
  const GoPost = styled.a`
    width: auto;
    transition: all 0.5s linear;
    -webkit-transition: all 0.5s linear;
    background-color: ${theme === "dark" ? "#212529" : "white"};
    color: ${theme === "dark" ? "white" : "#212529"};
  `;

  const style = {
    container: {
      marginTop: "5vh",
      height: "65vh",
    },
  };

  const [show, setShow] = useState(false);
  const [postShow, setPostShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1500);
    setTimeout(() => {
      setPostShow(true);
    }, 2000);
  }, []);

  return (
    <>
      <Helmet title="YLOG" />
      <Container
        id="content"
        className="d-flex justify-content-center text-center align-items-center font-weight-bold"
        style={style.container}
      >
        <Fade when={show}>
          <Row>
            I WANT TO MAKE
            <br />
            SOMETHING SPECIAL
            <br />
            AND USEFUL
          </Row>
        </Fade>
      </Container>
      <Fade when={postShow}>
        <div className="d-flex justify-content-end">
          <GoPost
            href="/postlist"
            className={`${
              theme === "dark" ? "text-white" : "text-dark"
            } text-decoration-none`}
          >
            Go to Post&nbsp;&rarr;
          </GoPost>
        </div>
      </Fade>
    </>
  );
}

export default Main;
