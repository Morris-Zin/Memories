import React from "react";
import { Container } from "@material-ui/core";
import Navbar from "./components/Navbar/Navbar";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./components/Home/Home";
import Auth from "./components/Auth/Auth";

const App = () => {
  return (
    <Container maxwidth="lg">
      <BrowserRouter>
      <Navbar />
        <Switch>
          <Route exact path="/" component={Home}/>
          <Route path="/auth" exact component={Auth}/>
        </Switch>
      </BrowserRouter>
    </Container>
  );
};

export default App;
