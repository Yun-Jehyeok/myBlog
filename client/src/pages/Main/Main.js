import React, { useState, useEffect } from 'react';
import { Row } from 'reactstrap';
import Fade from 'react-reveal/Fade';
import { Helmet } from 'react-helmet';
import { Wrap, GoPost } from './style';

function Main({ theme }) {
  const [show, setShow] = useState(false);
  const [postShow, setPostShow] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setShow(true);
    }, 1500);
    setTimeout(() => {
      setPostShow(true);
    }, 2000);
  }, []);

  return (
    <>
      <Helmet title="YLOG" />
      <Wrap
        id="content"
        className="d-flex justify-content-center text-center align-items-center font-weight-bold"
      >
        <Fade when={show}>
          <Row>
            I WANT TO MAKE
            <br />
            SOMETHING SPECIAL
            <br />
            AND USEFUL
          </Row>
        </Fade>
      </Wrap>
      <Fade when={postShow}>
        <div className="d-flex justify-content-end">
          <GoPost
            href="/postlist"
            className={`${
              theme === 'dark' ? 'text-white' : 'text-dark'
            } text-decoration-none`}
            theme={theme}
          >
            Go to Post&nbsp;&rarr;
          </GoPost>
        </div>
      </Fade>
    </>
  );
}

export default Main;
