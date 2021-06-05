import React, { useCallback } from "react";
import { Button, Col, Row, Form } from "reactstrap";
import Fade from "react-reveal/Fade";
import LoginModal from "./auth/LoginModal";
import { useDispatch, useSelector } from "react-redux";
import { LOGOUT_REQUEST } from "../redux/types";
import Dropdown from "react-bootstrap/Dropdown";
import { CgProfile } from "react-icons/cg";
import styled from "styled-components";

import { POST_WRITE_REQUEST } from "../redux/types";

const Logo = styled.a`
  font-size: 1.3rem;
  transition: all 0.5s linear;
`;
const Container = styled.div`
  margin-right: 6%;
`;
const StyledButton = styled.a`
  font-size: 1.3rem;
  transition: all 0.5s linear;
`;

function Header({ theme }) {
  const style = {
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
          className="pb-3 mb-4"
          style={{
            borderBottom: `1px solid ${theme === "dark" ? "white" : "black"}`,
            transition: "all 0.50s linear",
          }}
        >
          <Col xs="3" sm="3">
            <div
              className="d-flex justify-content-between pt-3"
              style={{ marginLeft: "6%" }}
            >
              <Logo
                href="/"
                className={`${
                  theme === "dark" ? "text-white" : "text-dark"
                } text-decoration-none`}
              >
                <b>Y&nbsp;LOG</b>
              </Logo>
            </div>
          </Col>
          <Col xs="0" sm="2"></Col>
          <Col xs="9" sm="7">
            <Container className="d-flex justify-content-end pt-3">
              <span>
                {userRole === "Master" ? (
                  <Form>
                    <a
                      href="/postwrite"
                      className="btn btn-success block text-white text-decoration-none mr-5"
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
              <span className="mr-5">
                <StyledButton
                  href="/postlist"
                  className="text-decoration-none text-secondary"
                >
                  POST
                </StyledButton>
              </span>
              <StyledButton
                href="/contact"
                className={`text-decoration-none text-secondary`}
              >
                CONTACT
              </StyledButton>
            </Container>
          </Col>
        </Row>
      </Fade>
    </>
  );
}

export default Header;
