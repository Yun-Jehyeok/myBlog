import React, { useState, useEffect } from "react";
import { Container, Row } from "reactstrap";
import Fade from "react-reveal/Fade";
import { Helmet } from "react-helmet";

import { Link } from "react-router-dom";

function Main({ theme }) {
  const style = {
    container: {
      marginTop: "5vh",
      height: "65vh",
    },
    goPost: {
      width: "auto",
      backgroundColor: `${theme === "dark" ? "#212529" : "white"}`,
      color: `${theme === "dark" ? "white" : "#212529"}`,
      transition: "all 0.50s linear",
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
        <a
          href="/postlist"
          className={`d-flex justify-content-end ${
            theme === "dark" ? "text-white" : "text-dark"
          } text-decoration-none`}
          style={style.goPost}
        >
          Go to Post&nbsp;&rarr;
        </a>
      </Fade>
    </>
  );
}

export default Main;
