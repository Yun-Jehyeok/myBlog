import React from "react";

function Contact() {
  return (
    <div
      className="align-items-center"
      style={{ minHeight: "50vh", fontSize: "3.5vw", marginTop: "20%" }}
    >
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
    </div>
  );
}

export default Contact;
