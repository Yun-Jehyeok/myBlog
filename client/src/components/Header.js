import React, { useCallback } from "react";
import { Button, Col, Row, Form } from "reactstrap";
import Fade from "react-reveal/Fade";
import LoginModal from "./auth/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST } from "../redux/types";
import Dropdown from "react-bootstrap/Dropdown";
import { CgProfile } from "react-icons/cg";

import { POST_WRITE_REQUEST } from "../redux/types";

function Header({ theme }) {
  const { isAuthenticated, userRole } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  const onLogout = useCallback(() => {
    dispatch({
      type: LOGOUT_REQUEST,
    });
  }, [dispatch]);

  const addPostClick = () => {
    dispatch({
      type: POST_WRITE_REQUEST,
    });
  };

  return (
    <>
      <Fade top>
        <Row>
          <Col xs="0" sm="4"></Col>
          <Col xs="6" sm="4">
            <a
              href="/"
              className={
                theme === "dark"
                  ? "d-flex justify-content-center pt-4 text-white text-decoration-none"
                  : "d-flex justify-content-center pt-4 text-dark text-decoration-none"
              }
              style={style.logo}
            >
              <b>YLOG</b>
            </a>
          </Col>
          <Col xs="6" sm="4">
            <div
              className="d-flex justify-content-center"
              style={style.container}
            >
              <span>
                {userRole === "Master" ? (
                  <Form className="mr-5">
                    <a
                      href="/postwrite"
                      className="btn btn-success block text-white text-decoration-none"
                      onClick={addPostClick}
                    >
                      Add Post
                    </a>
                  </Form>
                ) : (
                  ""
                )}
              </span>
              <span className="mr-5">
                {isAuthenticated ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      style={
                        theme === "dark"
                          ? style.darkDropdownToggle
                          : style.lightDropdownToggle
                      }
                    >
                      <CgProfile />
                    </Dropdown.Toggle>
                    <Dropdown.Menu style={{ padding: "0" }}>
                      <Dropdown.Item style={style.dropdownItem}>
                        <Button
                          onClick={onLogout}
                          block
                          style={style.logoutButton}
                        >
                          LOGOUT
                        </Button>
                      </Dropdown.Item>
                    </Dropdown.Menu>
                  </Dropdown>
                ) : (
                  <LoginModal theme={theme} />
                )}
              </span>
              <a
                href="/contact"
                className={
                  theme === "dark"
                    ? "text-decoration-none text-white"
                    : "text-decoration-none text-dark"
                }
                style={style.contactButton}
              >
                CONTACT
              </a>
            </div>
          </Col>
        </Row>
      </Fade>
    </>
  );
}

const style = {
  logo: { fontSize: "2.3rem" },
  container: {
    marginRight: "5rem",
    paddingTop: "2.7rem",
  },
  darkDropdownToggle: {
    backgroundColor: "#212529",
    border: "0",
    fontSize: "1.2rem",
    paddingTop: "0",
  },
  lightDropdownToggle: {
    backgroundColor: "white",
    border: "0",
    fontSize: "1.2rem",
    paddingTop: "0",
    color: "#212529",
  },
  dropdownItem: {
    padding: "0",
  },
  logoutButton: { backgroundColor: "white", color: "#212529" },
  contactButton: { fontSize: "1.2rem" },
};

export default Header;
