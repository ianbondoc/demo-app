import React from "react";
import { UserService } from "./services";
import { RenderForAuthenticated } from "./components/RenderForAuthenticated";
import { RenderForAnonymous } from "./components/RenderForAnonymous";

function App() {
  return (
    <div>
      <h1>
        Hello {UserService.isAuthenticated() ? UserService.getName() : "guest"}
      </h1>
      <RenderForAuthenticated>
        <ul>
          <li>username: {UserService.getUsername()}</li>
          <li>given name: {UserService.getGivenName()}</li>
          <li>surname: {UserService.getSurname()}</li>
          <li>email: {UserService.getEmail()}</li>
        </ul>
        <button onClick={() => UserService.logout()}>Logout</button>
      </RenderForAuthenticated>
      <RenderForAnonymous>
        <button onClick={() => UserService.login()}>Login</button>
      </RenderForAnonymous>
    </div>
  );
}

export default App;
