import React from "react";

function Contact() {
  return (
    <div style={{ minHeight: "70vh", fontSize: "3rem" }}>
      <div className="d-flex justify-content-center align-items-center">
        Email :&nbsp;
        <a href="#" className="text-decoration-none">
          dbswpgur2@naver.com
        </a>
      </div>
      <div className="d-flex justify-content-center align-items-center">
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
