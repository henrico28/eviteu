import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { NotFound } from "./Containers";
import routes from "./Config/routes";
import "./App.css";

function App() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Switch>
          {routes.map((route, idx, props) => (
            <Route
              key={idx}
              path={route.path}
              component={route.component}
              exact
              {...props}
            />
          ))}
          <Route component={NotFound} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
