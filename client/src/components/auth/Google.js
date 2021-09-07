import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { GOOGLE_LOGIN_REQUEST } from 'redux/types';

function Google() {
  const googleLoginBtn = useRef(null);

  const dispatch = useDispatch();

  useEffect(() => {
    googleSDK();
  }, []);

  const googleSDK = () => {
    window.googleSDKLoaded = () => {
      window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
          client_id:
            '1003341886974-ctjgav6f0durl0fu56ooo6h8cld7ro6j.apps.googleusercontent.com',
          scope: 'profile email',
        });

        auth2.attachClickHandler(
          googleLoginBtn.current,
          {},
          (googleUser) => {
            const profile = googleUser.getBasicProfile();

            dispatch({
              type: GOOGLE_LOGIN_REQUEST,
              payload: profile,
            });
          },
          (error) => {
            alert(JSON.stringify(error, undefined, 2));
          },
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
    js.src = 'https://apis.google.com/js/platform.js?onload=googleSDKLoaded';
    fjs.parentNode.insertBefore(js, fjs);
  })(document, 'script', 'google-jssdk');

  return (
    <div
      ref={googleLoginBtn}
      className="d-flex justify-content-center mb-5 p-1"
      style={style.loginButton}
    >
      <span className="buttonText">Google 계정으로 로그인 하기</span>
    </div>
  );
}

const style = {
  loginButton: {
    width: '90%',
    marginLeft: '5%',
    backgroundColor: '#4285F4',
    color: 'white',
    cursor: 'pointer',
  },
};

export default Google;
