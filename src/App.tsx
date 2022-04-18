import React, { useState } from "react";
import { HttpService, UserService } from "./services";
import { RenderForAuthenticated } from "./components/RenderForAuthenticated";
import { RenderForAnonymous } from "./components/RenderForAnonymous";

interface Message {
  content: string;
}

export function App() {
  const [message, setMessage] = useState<string>();
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
      <button
        onClick={async () => {
          try {
            const response = await HttpService.get<Message>("/api/hello");
            setMessage(response.content);
          } catch (e) {
            if (e instanceof Error) {
              setMessage(`Error: ${e.message}`);
            } else {
              setMessage(`Unknown error: ${e}`);
            }
          }
        }}
      >
        Call Service
      </button>
      {message && <p>Server says: {message}</p>}
    </div>
  );
}
