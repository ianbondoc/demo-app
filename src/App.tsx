import React from "react";
import { UserService } from "./services/UserService";

function App() {
  return (
    <div>
      <h1>
        Hello {UserService.isLoggedIn() ? UserService.getUsername() : "guest"}
      </h1>
      {UserService.isLoggedIn() ? (
        <button onClick={() => UserService.logout()}>Logout</button>
      ) : (
        <button onClick={() => UserService.login()}>Login</button>
      )}
    </div>
  );
}

export default App;
