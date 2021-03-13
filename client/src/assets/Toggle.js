import React from "react";
import { func, string } from "prop-types";
import styled from "styled-components";

const Button = styled.button`
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-left: 0;
  color: ${({ theme }) => theme.text};
  border-radius: 0 30px 30px 0;
  cursor: pointer;
  font-size: 0.8rem;
  padding: 0.6rem;
  overflow: hidden;
  margin: 0 auto;
  width: 5rem;
  height: 3rem;

  div {
    height: auto;
    width: auto;
    transition: all 0.5s linear;
  }
`;

const Toggle = ({ theme, toggleTheme }) => {
  return (
    <Button onClick={toggleTheme}>
      <b>
        {theme === "light" ? (
          <div
            style={
              theme === "light"
                ? { transform: "translateY(0)" }
                : { transform: "translateY(100px)" }
            }
          >
            Dark
          </div>
        ) : (
          <div
            style={
              theme === "light"
                ? { transform: "translateY(100px)" }
                : { transform: "translateY(0)" }
            }
          >
            Light
          </div>
        )}
      </b>
    </Button>
  );
};

Toggle.propTypes = {
  theme: string.isRequired,
  toggletheme: func.isRequired,
};

export default Toggle;
