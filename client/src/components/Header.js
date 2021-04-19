import React, { useCallback, useState, useEffect } from "react";
import { Button, Col, Row, Form } from "reactstrap";
import Fade from "react-reveal/Fade";
import LoginModal from "./auth/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST } from "../redux/types";
import Dropdown from "react-bootstrap/Dropdown";
import { CgProfile } from "react-icons/cg";

import { POST_WRITE_REQUEST } from "../redux/types";
import { Link } from "react-router-dom";

import SearchInput from "./search/SearchInput";

function Header({ theme }) {
  const style = {
    logo: {
      fontSize: "1.5rem",
      transition: "all 0.50s linear",
      marginLeft: "6%",
    },
    container: { marginRight: "6%" },
    dropdownToggle: {
      backgroundColor: `${theme === "dark" ? "#212529" : "white"}`,
      color: `${theme === "dark" ? "#687078" : "#212529"}`,
      border: "0",
      fontSize: "1.3rem",
      paddingTop: "0",
      transition: "all 0.50s linear",
    },
    dropdownItem: {
      padding: "0",
    },
    logoutButton: { backgroundColor: "white", color: "#212529" },
    contactButton: { fontSize: "1.3rem", transition: "all 0.50s linear" },
  };

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
        <Row
          className="pb-3 mb-3"
          style={{
            borderBottom: `1px solid ${theme === "dark" ? "white" : "black"}`,
          }}
        >
          <Col xs="3" sm="3">
            <a
              href="/"
              className={`d-flex justify-content-between pt-3 ${
                theme === "dark" ? "text-white" : "text-dark"
              } text-decoration-none`}
              style={style.logo}
            >
              <b>Y&nbsp;LOG</b>
            </a>
          </Col>
          <Col xs="0" sm="2"></Col>
          <Col xs="9" sm="7">
            <div
              className="d-flex justify-content-end pt-3"
              style={style.container}
            >
              <span>
                {userRole === "Master" ? (
                  <Form>
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
                <SearchInput isOpen={false} />
              </span>
              <span className="mr-5">
                {isAuthenticated ? (
                  <Dropdown>
                    <Dropdown.Toggle
                      id="dropdown-basic"
                      style={style.dropdownToggle}
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
                className={`text-decoration-none text-secondary`}
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

export default Header;
