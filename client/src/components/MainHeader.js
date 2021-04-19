import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";

function MainHeader({ theme }) {
  const style = {
    logo: { fontSize: "2.3rem", transition: "all 0.50s linear" },
  };
  const [show, setShow] = useState();

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 2000);
  }, []);

  return (
    <>
      <Fade when={show}>
        <div style={{ width: "100%" }}>
          <a
            href="/"
            className={`d-flex justify-content-center pt-5 ${
              theme === "dark" ? "text-white" : "text-dark"
            } text-decoration-none`}
            style={style.logo}
          >
            <b>YLOG</b>
          </a>
        </div>
      </Fade>
    </>
  );
}

export default MainHeader;
