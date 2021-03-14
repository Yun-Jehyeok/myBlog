import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

function Google() {
  const googleLoginBtn = useRef(null);
  const [token, setToken] = useState("");

  useEffect(() => {
    googleSDK();
  }, []);

  // token을 보내는거 만들어야됨

  const googleSDK = () => {
    window.googleSDKLoaded = () => {
      console.log(window.gapi);
      window.gapi.load("auth2", () => {
        const auth2 = window.gapi.auth2.init({
          client_id:
            "1003341886974-ctjgav6f0durl0fu56ooo6h8cld7ro6j.apps.googleusercontent.com",
          scope: "profile email",
        });

        auth2.attachClickHandler(
          googleLoginBtn.current,
          {},
          (googleUser) => {
            const profile = googleUser.getBasicProfile();

            setToken(googleUser.getAuthResponse().id_token);
          },
          (error) => {
            alert(JSON.stringify(error, undefined, 2));
          }
        );
      });
    };
  };

  (function (d, s, id) {
    let js;
    const fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
      return;
    }

    js = d.createElement(s);
    js.id = id;
    js.src = "https://apis.google.com/js/platform.js?onload=googleSDKLoaded";
    fjs.parentNode.insertBefore(js, fjs);
  })(document, "script", "google-jssdk");

  return (
    <div
      ref={googleLoginBtn}
      className="d-flex justify-content-center mb-5 p-1"
      style={style.loginButton}
    >
      <span className="icon"></span>
      <span className="buttonText">Google 계정으로 로그인 하기</span>
    </div>
  );
}

const style = {
  loginButton: {
    width: "90%",
    marginLeft: "5%",
    backgroundColor: "#4285F4",
    color: "white",
    cursor: "pointer",
  },
};

export default Google;
