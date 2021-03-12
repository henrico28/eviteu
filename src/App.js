import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
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
              {...props}
            />
          ))}
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
