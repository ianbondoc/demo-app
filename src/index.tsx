import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { App } from "./App";
import { FetchProvider, UserContextProvider } from "@chiknrice/auth-js";

ReactDOM.render(
  <React.StrictMode>
    <UserContextProvider>
      <FetchProvider
        baseUrl="http://localhost:8081" // service's base Url
      >
        <App />
      </FetchProvider>
    </UserContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
