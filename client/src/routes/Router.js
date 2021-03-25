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
import FindPassword from "./normalRoute/FindPassword";
import PostList from "./normalRoute/PostList";
import PostDetail from "./normalRoute/PostDetail";

import Fade from "react-reveal/Fade";

function Router() {
  const [theme, themeToggler, mountedComponent] = useDarkMode();

  const themeMode = theme === "light" ? lightTheme : darkTheme;

  let HideHeader =
    window.location.pathname === "/register" ? null : window.location
        .pathname === "/findpassword" ? null : (
      <Header theme={theme} />
    );

  if (!mountedComponent) return <div />;

  // 이거 Link가 안먹히는게 ThemeProvider 때문에 그런가? 저걸 App.js로 옮기면 되려나...
  return (
    <ThemeProvider theme={themeMode}>
      <GlobalStyles />
      {HideHeader}
      <Fade right>
        <Toggle theme={theme} toggleTheme={themeToggler} />
      </Fade>
      <Container>
        <Switch>
          <Route path="/" exact render={() => <Main theme={theme} />} />
          <Route path="/register" exact component={Resister} />
          <Route path="/contact" exact component={Contact} />
          <Route path="/findpassword" exact component={FindPassword} />
          <Route
            path="/postlist"
            exact
            render={() => <PostList theme={theme} />}
          />
          <Route path="/post/:id" exact component={PostDetail} />
        </Switch>
      </Container>
      <Footer theme={theme} />
    </ThemeProvider>
  );
}

export default Router;
