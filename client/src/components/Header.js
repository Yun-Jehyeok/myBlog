import React, { useCallback } from "react";
import { Button, Col, Row } from "reactstrap";
import Fade from "react-reveal/Fade";
import LoginModal from "./auth/LoginModal";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST } from "../redux/types";
import Dropdown from "react-bootstrap/Dropdown";

function Header() {
  const { isAuthenticated, user, userRole } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, [dispatch]);

  return (
    <>
      <Fade top>
        <Row>
          <Col xs="6" sm="4"></Col>
          <Col xs="6" sm="4">
            <a
              href="/"
              className="d-flex justify-content-center pt-4 text-white text-decoration-none"
              style={{ fontSize: "2.3rem" }}
            >
              <b>YLOG</b>
            </a>
          </Col>
          <Col xs="6" sm="4">
            <div
              className="d-flex justify-content-center"
              style={{
                marginRight: "5rem",
                paddingTop: "2.7rem",
              }}
            >
              <span className="mr-5">
                {isAuthenticated ? (
                  <Dropdown>
                    <Dropdown.Toggle variant="primary" id="dropdown-basic">
                      User
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                      <Dropdown.Item>
                        <Button onClick={onLogout} block>
                          LOGOUT
                        </Button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <LoginModal />
                )}
              </span>
              <span style={{ fontSize: "1.2rem" }}>CONTACT</span>
            </div>
          </Col>
        </Row>
      </Fade>
    </>
  );
}

export default Header;
