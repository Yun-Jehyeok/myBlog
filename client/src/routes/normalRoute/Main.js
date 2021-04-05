import React from "react";
import { Container, Row } from "reactstrap";
import Fade from "react-reveal/Fade";
import { Helmet } from "react-helmet";

import { Link } from "react-router-dom";

function Main({ theme }) {
  return (
    <>
      <Helmet title="YLOG" />
      <Container
        id="content"
        className="d-flex justify-content-center text-center align-items-center font-weight-bold"
        style={style.container}
      >
        <Fade left>
          <Row>
            I WANT TO MAKE
            <br />
            SOMETHING SPECIAL
            <br />
            AND USEFUL
          </Row>
        </Fade>
      </Container>
      <Fade right>
        <a
          href="/postlist"
          className={
            theme === "dark"
              ? "d-flex justify-content-end text-white text-decoration-none"
              : "d-flex justify-content-end text-dark text-decoration-none"
          }
          style={
            (theme === "dark" ? style.darkGoPost : style.lightGoPost,
            { width: "auto", transition: "all 0.50s linear" })
          }
        >
          Go to Post&nbsp;&rarr;
        </a>
      </Fade>
    </>
  );
}

const style = {
  container: {
    marginTop: "5vh",
    height: "65vh",
  },
  darkGoPost: {
    backgroundColor: "#212529",
  },
  lightGoPost: {
    backgroundColor: "white",
    color: "#212529",
  },
};

export default Main;
