import React, { useEffect, useState } from "react";
import Fade from "react-reveal/Fade";

function MainHeader({ theme }) {
  const style = {
    logo: { fontSize: "2.3rem", transition: "all 0.50s linear" },
  };
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
          <a
            href="/"
            className={`${
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
