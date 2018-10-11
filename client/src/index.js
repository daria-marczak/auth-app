import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from "redux-thunk";

import App from "./components/App";
import Welcome from "./components/Welcome";
import SignUp from "./components/auth/SignUp";
import Feature from "./components/Feature";
import reducers from "./reducers";

const store = createStore(reducers, {
  auth: { authenticated: localStorage.getItem("token") }
}, applyMiddleware(reduxThunk));
// With this, every time the app starts, we start the app with redux state of auth.authenticated and verify if there is a token in the localStorage


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App>
        <Route path="/" exact component={Welcome} />
        <Route path="/signup" exact component={SignUp} />
        <Route path="/feature" exact component={Feature} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
