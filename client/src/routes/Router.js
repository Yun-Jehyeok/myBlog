import React from "react";
import { Container } from "reactstrap";
import { Route, Switch } from "react-router-dom";

import { ThemeProvider } from "styled-components";
import { lightTheme, darkTheme } from "../assets/theme";
import { GlobalStyles } from "../assets/global";
import { useDarkMode } from "../assets/useDarkMode";
import Toggle from "../assets/Toggle";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "./normalRoute/Main";
import Resister from "./normalRoute/Register";
import Contact from "./normalRoute/Contact";

import Fade from "react-reveal/Fade";

function Router() {
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  let HideHeader =
    window.location.pathname === "/register" ? null : <Header theme={theme} />;

  if (!mountedComponent) return <div />;
  return (
    <ThemeProvider theme={themeMode}>
      <>
        <GlobalStyles />
        {HideHeader}
        <Container id="main-body">
          <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/register" exact component={Resister} />
            <Route path="/contact" exact component={Contact} />
          </Switch>
        </Container>
        <Fade left>
          <Toggle theme={theme} toggleTheme={themeToggler} />
        </Fade>
        <Footer theme={theme} />
      </>
    </ThemeProvider>
  );
}

export default Router;
