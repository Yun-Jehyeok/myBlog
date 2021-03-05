import React from "react";
import { Container, Row } from "reactstrap";
import Fade from "react-reveal/Fade";

function MainBody() {
  return (
    <Fade bottom>
      <Container
        id="content"
        className="d-flex justify-content-center text-center align-items-center font-weight-bold"
        style={{
          height: "75vh",
          fontSize: "5rem",
        }}
      >
        <Row>
          I WANT TO MAKE
          <br />
          SOMETHING SPECIAL
          <br />
          AND USEFUL
        </Row>
      </Container>
    </Fade>
  );
}

export default MainBody;
