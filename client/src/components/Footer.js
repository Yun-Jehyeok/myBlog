import React from "react";
import { Row, Col } from "reactstrap";
import Fade from "react-reveal/Fade";

function Footer({ theme }) {
  return (
    <Fade bottom>
      <div className="text-center p-2">
        <Row style={{ width: "100%" }}>
          <Col>
            <p style={{ fontSize: "0.85rem " }}>
              &copy;
              <a
                href="http://github.com/Yun-Jehyeok"
                className={
                  theme === "dark"
                    ? "text-decoration-none text-white"
                    : "text-decoration-none text-dark"
                }
                target="_blank"
                rel="noreferrer"
                style={{ transition: "all 0.50s linear" }}
              >
                <b>Y</b>
              </a>
              , I built a blog in <b>2021</b>
            </p>
          </Col>
        </Row>
      </div>
    </Fade>
  );
}

export default Footer;
