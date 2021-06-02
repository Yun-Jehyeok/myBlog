import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";
import styled from "styled-components";

const Logo = styled.a`
  font-size: 2.3rem;
  transition: all 0.5s linear;
`;

function MainHeader({ theme }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 500);
  }, []);

  return (
    <>
      <Fade when={show}>
        <div
          className="d-flex justify-content-center pt-5"
          style={{ width: "auto" }}
        >
          <Logo
            href="/"
            className={`${
              theme === "dark" ? "text-white" : "text-dark"
            } text-decoration-none`}
          >
            <b>YLOG</b>
          </Logo>
        </div>
      </Fade>
    </>
  );
}

export default MainHeader;
