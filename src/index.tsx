import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { Error } from "./Error";
import { UserService } from "./services";

const renderApp = () =>
  ReactDOM.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
    document.getElementById("root")
  );
const renderError = (message: string) =>
  ReactDOM.render(
    <React.StrictMode>
      <Error message={message} />
    </React.StrictMode>,
    document.getElementById("root")
  );

UserService.initKeycloak(renderApp, renderError);
