import React from "react";
import { Container, Row } from "reactstrap";
import Fade from "react-reveal/Fade";

function MainBody() {
  return (
    <>
      <Fade bottom>
        <Container
          id="content"
          className="d-flex justify-content-center text-center align-items-center font-weight-bold"
          style={style.container}
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
    </>
  );
}

const style = {
  container: {
    height: "75vh",
    fontSize: "7em",
  },
};

export default MainBody;
