import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore } from "redux";

import App from "./components/App";
import Welcome from "./components/Welcome";
import SignUp from "./components/auth/SignUp";
import reducers from "./reducers";

ReactDOM.render(
  <Provider store={createStore(reducers, {})}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" exact component={SignUp} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
