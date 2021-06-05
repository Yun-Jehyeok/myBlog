import React from "react";
import styled from "styled-components";

const Container = styled.div`
  min-height: 50vh;
  font-size: 2vw;
  margin-top: 30%;
`;

function Contact() {
  return (
    <Container className="align-items-center">
      <div className="d-flex justify-content-center">
        Email :&nbsp;
        <a href="#" className="text-decoration-none">
          dbswpgur2@naver.com
        </a>
      </div>
      <div className="d-flex justify-content-center">
        Github :&nbsp;
        <a
          href="http://github.com/Yun-Jehyeok"
          target="_blank"
          rel="noreferrer"
          className="text-decoration-none"
        >
          http://github.com/Yun-Jehyeok
        </a>
      </div>
    </Container>
  );
}

export default Contact;
