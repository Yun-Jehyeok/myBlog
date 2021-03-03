import React from "react";
import { Container } from "reactstrap";
import { Route, Switch } from "react-router-dom";

import Header from "../components/Header";
import Footer from "../components/Footer";
import MainBody from "./normalRoute/MainBody";

function Router() {
  return (
    <>
      <Header />
      <Container id="main-body">
        <Switch>
          <Route path="/" exact component={MainBody} />
        </Switch>
      </Container>
      <Footer />
    </>
  );
}

export default Router;
