import React from "react";
import { Button, Container, Row } from "reactstrap";
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
        <Fade right>
          <Button
            style={{ float: "right", backgroundColor: "#212529", border: "0" }}
          >
            Go to Post&nbsp;&rarr;
          </Button>
        </Fade>
      </Fade>
    </>
  );
}

const style = {
  container: {
    marginTop: "5vh",
    height: "65vh",
  },
};

export default MainBody;
