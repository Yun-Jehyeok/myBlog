import React from "react";
import { Container } from "reactstrap";
import { Redirect, Route, Switch } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import Main from "./normalRoute/Main";
import Resister from "./normalRoute/Register";

function Router() {
  return (
    <>
      <Header />
      <Container id="main-body">
        <Switch>
          <Route path="/" exact component={Main} />
          <Route path="/register" exact component={Resister} />
        </Switch>
      </Container>
      <Footer />
    </>
  );
}

export default Router;
