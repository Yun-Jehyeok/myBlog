import React from "react";
import {} from "reactstrap";
import Fade from "react-reveal/Fade";

function Header() {
  return (
    <>
      <Fade top>
        <div
          className="d-flex justify-content-center pt-4 font-weight-bolder"
          style={{ fontSize: "2.3rem", height: "15vh" }}
        >
          <b>YLOG</b>
        </div>
        <div
          className="d-flex justify-content-end"
          style={{
            marginTop: "-4.2rem" /* 수정 필요 이따위로 하면 안됨 */,
            marginRight: "5rem",
          }}
        >
          <span className="mr-5" style={{ fontSize: "1.2rem" }}>
            LOGIN
          </span>
          <span style={{ fontSize: "1.2rem" }}>CONTACT</span>
        </div>
      </Fade>
    </>
  );
}

export default Header;
